import requests as req
from bs4 import BeautifulSoup as bs
from pymongo import MongoClient

client = MongoClient('mongodb://db_user:db_pass1@ds227481.mlab.com:27481/db_interdisciplinary', retryWrites=False)
db = client['db_interdisciplinary']
collection = db['gas_emissions']

url = 'https://en.wikipedia.org/wiki/List_of_countries_by_greenhouse_gas_emissions'
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

    countryName = tdList[0].text.replace('\xa0', '').split('(')[0].rstrip()
    countryEmissions = tdList[1].text.rstrip()
    countryPercentage = tdList[2].text.rstrip()

    tempCountry = {
        'country': countryName,
        'emissions': int(float(countryEmissions)),
        'percentage': countryPercentage
    }
    countriesDB.append(tempCountry)

collection.insert_many(countriesDB)
print(countriesDB)
