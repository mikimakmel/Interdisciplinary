import requests as req
from bs4 import BeautifulSoup as bs
from pymongo import MongoClient

client = MongoClient('mongodb://db_user:db_pass1@ds227481.mlab.com:27481/db_interdisciplinary', retryWrites=False)
db = client['db_interdisciplinary']
collection = db['life_expectancy']

url = 'https://en.wikipedia.org/wiki/List_of_countries_by_life_expectancy'
htmlContent = req.get(url)
soup = bs(htmlContent.text, 'html.parser')
tbl = soup.find('table', attrs={'class': 'wikitable sortable'}).tbody
trList = []
countriesDB = []

for tr in tbl.find_all('tr'):
    trList.append(tr)

trList = trList[2:]

for tr in trList:
    tdList = tr.find_all('td')
    countryRank = tdList[0].text.rstrip()
    countryName = tdList[1].text.replace('\xa0', '').rstrip()
    countryAge = tdList[2].text.rstrip()

    if countryRank == '—':
        continue

    tempCountry = {
        'country': countryName,
        'rank': int(countryRank),
        'age': float(countryAge)
    }
    countriesDB.append(tempCountry)

collection.insert_many(countriesDB)
print(countriesDB)
