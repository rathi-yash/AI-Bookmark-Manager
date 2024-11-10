from document import createDoc
from LDA import generate_cluster_summary
import numpy as np
from sklearn.cluster import DBSCAN
from sentence_transformers import SentenceTransformer, util
from sklearn.manifold import TSNE

existing_documents = [
    'WNY Jobs - Local jobs for Buffalo NY - Official WNYJOBS site Job posts for Greater Buffalo, NY - Search Manufacturing, Nursing & Healthcare jobs, Human services jobs, Construction jobs in Buffalo',
    'Job Search: Millions of US Jobs (HIRING NOW) Near You - 2024 Phil, your career advisor will help you find the right job opening from companies hiring in the US. Find job postings near you & 1-click apply to get hired.',
    'LinkedIn Job Search: Find US Jobs, Internships, Jobs Near Me 64 of job seekers get hired through a referral. Use LinkedIn Jobs to boost your chances of getting hired through people you know.',
    'Entertainment | CNN View entertainment news and videos for the latest movie, music, TV and celebrity headlines on CNN.com',
    'Yahoo Entertainment Yahoo Entertainment is your source for the latest TV, movies, music, and celebrity news, including interviews, trailers, photos, and first looks.',
    'Home - Research!America - A Research Advocacy Alliance Research!America is a non-profit research advocacy alliance that advocates for science, discovery, and innovation to achieve better health for all.',
    'NSF Research Experiences for Undergraduates | NSF - National Science Foundation Offering research opportunities to undergraduates in the areas of science and engineering supported by the U.S. National Science Foundation.',
]



doc_obj = [
        {
            "title": "WNY Jobs - Local jobs for Buffalo NY - Official WNYJOBS site",
            "description": "Job posts for Greater Buffalo, NY - Search Manufacturing, Nursing & Healthcare jobs, Human services jobs, Construction jobs in Buffalo",
            "url": "https://www.wnyjobs.com/",
            "domain": "www.wnyjobs.com"
        },
        {
            "title": "Job Search: Millions of US Jobs (HIRING NOW) Near You - 2024",
            "description": "Phil, your career advisor will help you find the right job opening from companies hiring in the US. Find job postings near you & 1-click apply to get hired.",
            "domain": "www.ziprecruiter.com",
            "url": "https://www.ziprecruiter.com/"
        },
        {
            "title": "LinkedIn Job Search: Find US Jobs, Internships, Jobs Near Me",
            "description": "64% of job seekers get hired through a referral. Use LinkedIn Jobs to boost your chances of getting hired through people you know.",
            "domain": "www.linkedin.com",
            "url": "https://www.linkedin.com/jobs"
        },
        {
            "title": "Entertainment | CNN",
            "description": "View entertainment news and videos for the latest movie, music, TV and celebrity headlines on CNN.com",
            "domain": "www.cnn.com",
            "url": "https://www.cnn.com/entertainment"
        },
        {
            "title": "Yahoo Entertainment",
            "description": "Yahoo Entertainment is your source for the latest TV, movies, music, and celebrity news, including interviews, trailers, photos, and first looks.",
            "domain": "www.yahoo.com",
            "url": "https://www.yahoo.com/entertainment/"
        },
        {
            "title": "Home - Research!America - A Research Advocacy Alliance",
            "description": "Research!America is a non-profit research advocacy alliance that advocates for science, discovery, and innovation to achieve better health for all.",
            "domain": "www.researchamerica.org",
            "url": "https://www.researchamerica.org/"
        },
        {
            "title": "NSF Research Experiences for Undergraduates | NSF - National Science Foundation",
            "description": "Offering research opportunities to undergraduates in the areas of science and engineering supported by the U.S. National Science Foundation.",
            "domain": "new.nsf.gov",
            "url": "https://new.nsf.gov/funding/initiatives/reu"
        }
    ]

def dynamic_clustering(embeddings, eps=0.8, min_samples=2):
    dbscan = DBSCAN(eps=eps, min_samples=min_samples, metric='cosine')
    labels = dbscan.fit_predict(embeddings)
    print(labels)
    return labels

def process_new_document(new_document, existing_embeddings, labels, model):
    new_embedding = model.encode([new_document])
    cosine_scores = util.pytorch_cos_sim(new_embedding, existing_embeddings)[0]
    
    # Find the most similar document
    most_similar_idx = cosine_scores.argmax().item()
    
    # Assign to the same cluster as the most similar document
    assigned_cluster = labels[most_similar_idx]
    
    return new_embedding, assigned_cluster

def update_clustering(updated_embeddings, labels):
    updated_labels = dynamic_clustering(updated_embeddings)
    return updated_labels

model = SentenceTransformer('all-MiniLM-L6-v2')
embeddings = model.encode(existing_documents)
labels = dynamic_clustering(embeddings)
cluster_summaries = {}

def addUrl(url):
    global embeddings, labels, existing_documents, doc_obj
    new_doc_str, new_doc = createDoc(url)
    existing_documents.append(new_doc_str)
    doc_obj.append(new_doc)
    new_embedding, assigned_cluster = process_new_document(new_doc_str, embeddings, labels, model)
    print(f"New document assigned to cluster: {assigned_cluster}")

    # Update clustering with the new document
    # embeddings = np.vstack([embeddings, new_embedding])
    # labels = update_clustering(embeddings, labels)
    # print(f"Updated cluster labels: {labels}")
    # assigned_cluster = labels[-1]
    labels = np.append(labels, assigned_cluster)

    # Print cluster information
    unique_labels = set(labels)
    print(f"Number of clusters: {len(unique_labels) - (1 if -1 in unique_labels else 0)}")
    for label in unique_labels:
        if label != -1:
            print(f"Cluster {label}: {sum(labels == label)} documents")
    
    for cluster_label in set(labels):
        if cluster_label != -1:  # Ignore noise points
            docs_in_cluster = [existing_documents[i] for i in range(len(labels)) if labels[i] == cluster_label]
            summary = generate_cluster_summary(docs_in_cluster)
            cluster_summaries[cluster_label] = summary

    print(cluster_summaries)

    return {"cluster": cluster_summaries[assigned_cluster]}

def getClusters():
    global doc_obj, cluster_summaries
    clusters = { k: [] for k in cluster_summaries.values()}
    for i, cluster_label in enumerate(labels):
        doc_url = doc_obj[i]['url']
        label = cluster_summaries[cluster_label]
        clusters[label].append(doc_url)
    return clusters

if __name__ == "__main__":

    url = "https://www.nhcc.edu/academics/library/doing-library-research/basic-steps-research-process"
    out = addUrl(url)
    print(out)
    getClusters()