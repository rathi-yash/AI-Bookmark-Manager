from sklearn.feature_extraction.text import TfidfVectorizer
from gensim import corpora
from gensim.models import LdaModel

from transformers import pipeline

summarizer = pipeline("summarization", model="t5-small", tokenizer="t5-small", framework="pt")
classifier = pipeline("zero-shot-classification")
candidate_labels = ['Job search', 'Research', 'Entertainment']

def generate_cluster_summary(docs_in_cluster, max_length=5):
    full_text = " ".join(docs_in_cluster)
    # summary = summarizer(full_text, max_length=max_length, min_length=2, do_sample=True)[0]['summary_text']

    result = classifier(full_text, candidate_labels)
    summary = result['labels'][0]
    
    return summary

