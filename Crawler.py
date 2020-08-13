# -*- coding: utf-8 -*-
"""
Created on Tue Feb 14 14:34:08 2017

@author: Gilad
"""

from bs4 import BeautifulSoup
import json
import urllib
from time import sleep


def parse(url):
    page = urllib.urlopen(url)
    bs = BeautifulSoup(page, 'lxml')
    movies = bs.find_all('div', attrs={'class':'lister-item-content'})
    parsed = {}
    for movie in movies:
        title = movie.find('a').get_text()
        synopsis = movie.find_all('p')[1]
        link = synopsis.find('a')
        genre = movie.find('span', attrs={'class':'genre'})
        if genre:
            genre = genre.get_text().strip()
        else:
            genre = ''
        
        # Only take movies without a "for full summary" link in them
        # including some synopsis.
        # We want only movies with some short synopsis for them and not a
        # long summary.
        if not link and synopsis:
            data = {}
            data['synopsis'] = synopsis.get_text().strip()
            data['genre'] = genre.split(', ')
            parsed[title] = data
    return parsed
    
f = open('dump.json', 'w')
to_write = {}
try:
    for i in range(1950,2018):
    
        print("Year is: " + str(i))
        year_data = {}
        for j in range(1,101):
            year_data.update(parse('http://www.imdb.com/search/title?release_date=' 
                                   + str(i) + '&page=' + str(j) + '&ref_=adv_nxt'))
        to_write[i] = year_data
except:
    print("Error!")
    
json.dump(to_write, f, indent=4)
f.close()