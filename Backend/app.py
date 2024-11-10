'''
run 'python3 app.py' to start the server on 9999 port
'''

from indexer import addUrl, getClusters
import json
from flask import Flask, request, Response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/add', methods=['POST'])
def post():
    data = request.json
    resp = addUrl(data['url'])
    response = Response(json.dumps(resp, indent=4), mimetype='application/json')
    return response

@app.route('/getClusters', methods=['GET'])
def get():
    resp = getClusters()
    print(resp)
    response = Response(json.dumps(resp, indent=4), mimetype='application/json')
    return response


if __name__ == '__main__':
      app.run(host='0.0.0.0', port=9999)