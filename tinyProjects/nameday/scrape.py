import requests
from bs4 import BeautifulSoup as bs4
import re

class WebsiteParser(object):
    def __init__(self, base_url, url_path):
        self.base_url = base_url
        self.url_path = url_path
        self.headers = {
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
        }


    def get_soup(self, url=None):
        if not url:
            url = self.base_url + self.url_path

        self.page = requests.get(
                url=url, 
                headers=self.headers
            )
        soup = bs4(self.page.content, 'html.parser')
        return soup

    def get_names_per_month(self, soup):
        year = dict()
        tables = soup.find_all("table", {"class": "sortable wikitable"})
        for table in tables:
            month = tables.index(table) +1 # 1-12
            year[month] = dict()
            # print(index)
            rows = table.find_all("tr")
            for row in rows:
                collumns = row.find_all("td")
                try:
                    date = collumns[0].find("a").contents[0]
                    names = [x.contents[0] for x in collumns[1].find_all("a")]
                    date_url = collumns[0].find("a").attrs["href"]
                    name_urls = ["%s%s" % (self.base_url, x.attrs["href"]) for x in collumns[1].find_all("a")]
                    year[month][int(date.split(" ")[0])] = {
                        "date": date,
                        "date_url": "%s%s" % (self.base_url, date_url),
                        "names": names,
                        "name_urls": name_urls,
                    }
                except IndexError:
                    pass
        return year

    def get_name_trivia(self, urls):
        """
            Return the first three <p> elements
        """
        all_trivia = list()
        for url in urls:
            p_elements = list()
            soup = self.get_soup(url=url)

            container_div = soup.find("div", {"class": "mw-parser-output"})
            contents = container_div.find_all("p")

            for row in contents:
                p_elements.append(
                    row.get_text()
                )
            trivia = '\n'.join(p_elements[0:2])
            all_trivia.append(re.sub(r'\[[\w\s\döäå]+\]', "", trivia))
        return all_trivia


if __name__ == "__main__":

    from pprint import pprint
    from datetime import datetime


    w = WebsiteParser(
        base_url="https://sv.wikipedia.org",
        url_path="/wiki/Lista_%C3%B6ver_namnsdagar_i_Sverige_i_datumordning"
    )

    soup = w.get_soup()

    names = w.get_names_per_month(soup)
    
    now = datetime.now()
    this_month = now.month
    this_day = now.day

    todays_name = names[this_month][this_day]["names"]
    todays_name_url = names[this_month][this_day]["name_urls"]

    trivia = w.get_name_trivia(urls=todays_name_url)
    print(len(trivia))
    # pprint(names)