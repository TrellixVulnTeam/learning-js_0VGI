from flask import Flask, render_template, request, jsonify
from datetime import datetime
from scrape import WebsiteParser
from pprint import pprint

app = Flask(__name__)

w = WebsiteParser(
    base_url="https://sv.wikipedia.org",
    url_path="/wiki/Lista_%C3%B6ver_namnsdagar_i_Sverige_i_datumordning"
)

soup = w.get_soup()

@app.route("/names")
def names():
    """
        Function API for serving data to JS
    """
    names = w.get_names_per_month(soup)

    now = datetime.now()
    this_month = now.month
    this_day = now.day

    todays_names = names[this_month][this_day]
    todays_name_urls = names[this_month][this_day]["name_urls"]
    todays_name_trivia = w.get_name_trivia(urls=todays_name_urls)
    
    if request.method == "GET":
        message = {**{"trivia": todays_name_trivia}, **todays_names}
        return jsonify(message)  # serialize and use JSON headers

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/about")
def about():
    return render_template("about.html")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")