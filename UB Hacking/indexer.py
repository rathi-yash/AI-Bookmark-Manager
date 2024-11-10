from document import createDoc
from LDA import generate_cluster_summary
import numpy as np
from sklearn.cluster import DBSCAN
from sentence_transformers import SentenceTransformer, util
from sklearn.manifold import TSNE

existing_documents = [
    'Document 1: Link - https://example.com/doc1, Metadata - Example Metadata 1, Summary - This is a summary of document 1.',
    'Document 2: Link - https://example.com/doc2, Metadata - Example Metadata 2, Summary - This is a summary of document 2.',
    'Document 3: Link - https://example.com/doc3, Metadata - Example Metadata 3, Summary - This is a summary of document 3.',
]

doc_obj = [
    {'title': 'Document 1', 'description': 'abstract page paper Document 1', 'domain': 'arxiv.org', 'summary': 'skip main gratefully acknowledge support author navigation instrumentation ultraviole...r contact accessibility operational status', 'url': 'abc.com'},
    {'title': 'Document 2', 'description': 'abstract page paper Document 2', 'domain': 'arxiv.org', 'summary': 'skip main gratefully acknowledge support author navigation instrumentation ultraviole...r contact accessibility operational status', 'url': 'abc.com'},
    {'title': 'Document 3', 'description': 'abstract page paper Document 3', 'domain': 'arxiv.org', 'summary': 'skip main gratefully acknowledge support author navigation instrumentation ultraviole...r contact accessibility operational status', 'url': 'abc.com'}
]

def dynamic_clustering(embeddings, eps=0.3, min_samples=1):
    embeddings_normalized = embeddings / np.linalg.norm(embeddings, axis=1, keepdims=True)
    dbscan = DBSCAN(eps=eps, min_samples=min_samples, metric='cosine')
    labels = dbscan.fit_predict(embeddings_normalized)
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
cluster_summaries = {0: 'sample'}

def addUrl(url):
    global embeddings, labels, existing_documents, doc_obj, tsne
    new_doc_str, new_doc = createDoc(url)
    existing_documents.append(new_doc_str)
    doc_obj.append(new_doc)
    new_embedding, assigned_cluster = process_new_document(new_doc_str, embeddings, labels, model)
    print(f"New document assigned to cluster: {assigned_cluster}")

    # Update clustering with the new document
    embeddings = np.vstack([embeddings, new_embedding])
    labels = update_clustering(embeddings, labels)
    print(f"Updated cluster labels: {labels}")
    assigned_cluster = labels[-1]

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

    url = "https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2"
    url = "https://www.linkedin.com/posts/marcelobarrosinternational_international-students-keep-your-chin-up-activity-7260737361259511809-1DmE?utm_source=share&utm_medium=member_desktop"
    url = "https://arxiv.org/abs/2411.04164"
    out = addUrl(url)
    print(out)
    getClusters()