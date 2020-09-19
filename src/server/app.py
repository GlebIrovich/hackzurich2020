from flask import Flask
import os

app = Flask(__name__, static_folder='../../build', static_url_path='/')


@app.route('/api/v1')
def hello_world():
    return 'Hello, World!'

@app.route("/")
def index():
    return app.send_static_file('index.html')

if __name__ == '__main__':
  port = int(os.environ.get('PORT', 5000))
  app.run(debug=True, host='0.0.0.0', port = port)