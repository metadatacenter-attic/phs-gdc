#!/usr/bin/python3

# statvar_scraper: Utility to extract the hierarchy of statistical variables from the DC website

import json
import requests
from bs4 import BeautifulSoup


def get_statvars():
    url = "https://docs.datacommons.org/statistical_variables.html"
    doc = requests.get(url).text
    soup = BeautifulSoup(doc, 'html.parser')
    main_content = soup.find(id="main-doc-content")

    statvars_tree = []
    for tag in main_content.contents:
        if tag.name == 'details':
            statvars_tree.append(parse_details(tag))

    print(statvars_tree)

    with open('dc_statvars.json', 'w', encoding='utf-8') as f:
        json.dump(statvars_tree, f, indent=2)


def parse_details(details):

    node_name = details.summary.string
    node_id = node_name.lower()
    node_children = []
    if details.details:
        for tag in details.contents:
            if tag.name == 'details':
                node_children.append(parse_details(tag))
    else:
        if details.ul:
            cont = details.ul.contents
        else:
            cont = details.contents
        for tag in cont:
            if tag.name == 'li':
                node_children.append({
                    "name": tag.a.string,
                    "id": tag.a.string.lower(),
                    "children": []
                })
    return {
        "name": node_name,
        "id": node_id,
        "children": node_children
    }


def main():
    get_statvars()
    print('Execution completed')


if __name__ == "__main__": main()
