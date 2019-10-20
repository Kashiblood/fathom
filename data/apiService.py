import json
from flask import Flask

app = Flask(__name__)


@app.route('/historical/<string:year>')
def get_historical(year):
    with open('yearlyData.json') as json_file:
        data = json.load(json_file)
    return json.dumps(data[year])


@app.route('/futureHigh/<string:year>')
def get_future_high(year):
    with open('futureHighData.json') as json_file:
        data = json.load(json_file)
    return json.dumps(data[year])


@app.route('/futureLow/<string:year>')
def get_future_low(year):
    with open('futureLowData.json') as json_file:
        data = json.load(json_file)
    return json.dumps(data[year])


if __name__ == '__main__':
    app.run()
