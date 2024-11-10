from sklearn.feature_extraction.text import TfidfVectorizer
from gensim import corpora
from gensim.models import LdaModel

from transformers import pipeline

summarizer = pipeline("summarization", model="t5-small", tokenizer="t5-small", framework="pt")

def generate_cluster_summary(docs_in_cluster, max_length=5):
    full_text = " ".join(docs_in_cluster)
    summary = summarizer(full_text, max_length=max_length, min_length=2, do_sample=False)[0]['summary_text']
    return summary

