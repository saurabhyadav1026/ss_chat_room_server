
from flask import Flask,jsonify
from flask_cors import CORS




app=Flask(__name__)

CORS(app)


@app.route('/sbh/bot')

def res():
    return jsonify({"sbh":"yess bro you did it"})


if __name__ == '__main__':
    app.run(debug=True)  # No need for port number