import requests
from bs4 import BeautifulSoup

def scrape_content(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Extract the main content (adjust selectors as needed)
    content = soup.find('body').get_text(strip=True)
    return content

from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words
import nltk

def summarize_with_sumy(text, language="english", sentences_count=5):
    parser = PlaintextParser.from_string(text, Tokenizer(language))
    stemmer = Stemmer(language)
    summarizer = LsaSummarizer(stemmer)
    summarizer.stop_words = get_stop_words(language)
    
    summary = summarizer(parser.document, sentences_count)
    return ' '.join([str(sentence) for sentence in summary])


if __name__ == '__main__':
    # Example usage
    url = "https://www.linkedin.com/posts/marcelobarrosinternational_international-students-keep-your-chin-up-activity-7260737361259511809-1DmE?utm_source=share&utm_medium=member_desktop"
    scraped_text = scrape_content(url)

    # Summarize the scraped content
    summary = summarize_with_sumy(scraped_text)
    print(summary)