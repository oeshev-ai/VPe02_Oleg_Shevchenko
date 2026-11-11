from flask import Flask, jsonify

app = Flask(__name__)


@app.get("/")
def index():
    return jsonify(
        message="Flask app is running",
        endpoints=["/", "/info", "/calc/<a>/<b>"],
    )


@app.get("/info")
def info():
    return jsonify(
        app="flask-docker-demo",
        version="1.0.0",
        status="ok",
    )


@app.get("/calc/<int:a>/<int:b>")
def calc(a: int, b: int):
    return jsonify(
        a=a,
        b=b,
        sum=a + b,
        difference=a - b,
        product=a * b,
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
