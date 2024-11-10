import re
import requests
from summarizer import *
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.cluster import DBSCAN
import numpy as np
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse

nltk.download('wordnet')
nltk.download('punkt')
nltk.download('words')

api_key = 'pk_25bb1d965ba367eee1d6d760ff616c7c8f2b370a'

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))


def sanitizeText(text):
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    return text

def preprocess(text):
    text = sanitizeText(text)
    tokens = word_tokenize(text.lower())
    english_words = set(nltk.corpus.words.words())
    out = [lemmatizer.lemmatize(token) for token in tokens if token not in stop_words and token in english_words]
    return " ".join(out)

def getMetadata(url):
    params = {'url': url, 'api_key': api_key}
    response = requests.get('https://jsonlink.io/api/extract', params=params)

    if response.status_code == 200:
        data = response.json()
        return {'title': data['title'], 
                'description': data['description'], 
                'domain': data['domain']
                }
    else:
        print(f'Error: {response.status_code} - {response.text}')

def scrape_metadata(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Extract domain
        domain = urlparse(url).netloc
        
        # Extract title
        title = soup.title.string if soup.title else 'No Title'
        
        # Extract meta description
        meta_description = ''
        meta_tag = soup.find('meta', attrs={'name': 'description'})
        if meta_tag:
            meta_description = meta_tag.get('content', '')
        
        return domain, title, meta_description
    except Exception as e:
        print(f"Error scraping {url}: {str(e)}")
        return None, None, None

def createDoc(url):
    # scraped_text = scrape_content(url)
    # summary = summarize_with_sumy(scraped_text)
    # document = getMetadata(url)
    document = {}
    domain, title, description = scrape_metadata(url)
    document['url'] = url
    document['domain'] = domain
    # document['summary'] = summary
    document['title'] = preprocess(title)
    document['description'] = preprocess(description)
    out = document['title'] + ' ' + document['description'] #+ ' ' + document['summary']
    return out, document

if __name__ == "__main__":
    url = "https://www.linkedin.com/posts/marcelobarrosinternational_international-students-keep-your-chin-up-activity-7260737361259511809-1DmE?utm_source=share&utm_medium=member_desktop"
    print(createDoc(url))
