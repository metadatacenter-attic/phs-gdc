#!/usr/bin/python3

# statvar_scraper: Utility to extract the hierarchy of statistical variables from the DC website

import json
import requests
from bs4 import BeautifulSoup


def get_statvars():
    # TODO: the statistical variables page is checked-in here:
    #  "https://raw.githubusercontent.com/datacommonsorg/website/master/static/data/hierarchy_statsvar.json".
    #  Maybe read the hierarchy from this file in the future
    url = "https://docs.datacommons.org/statistical_variables.html"
    doc = requests.get(url).text
    soup = BeautifulSoup(doc, 'html.parser')
    main_content = soup.find(id="main-doc-content")

    # Generate tree
    statvars_tree = []
    for tag in main_content.contents:
        if tag.name == 'details':
            statvars_tree.append(parse_details_as_tree(tag))

    # Generate tree (custom, made to work with react-virtualized-tree)
    statvars_tree_custom = []
    for tag in main_content.contents:
        if tag.name == 'details':
            statvars_tree_custom.append(parse_details_as_tree_custom(tag))

    with open('dc_statvars_tree_custom.json', 'w', encoding='utf-8') as f:
        json.dump(statvars_tree_custom, f, indent=2)

    # Generate tree (based on https://dowjones.github.io/react-dropdown-tree-select)
    statvars_tree_select = []
    for tag in main_content.contents:
        if tag.name == 'details':
            statvars_tree_select.append(parse_details_as_tree_select(tag))

    with open('dc_statvars_tree_select.json', 'w', encoding='utf-8') as f:
        json.dump(statvars_tree_select, f, indent=2)

    # Generate list
    statvars_list = []
    for tag in main_content.contents:
        if tag.name == 'details':
            parse_details_as_list(tag, statvars_list, None)

    with open('dc_statvars_list.json', 'w', encoding='utf-8') as f:
        json.dump(statvars_list, f, indent=2)


def parse_details_as_tree(details):
    node_name = details.summary.string
    node_id = node_name.lower()
    node_children = []
    if details.details:
        for tag in details.contents:
            if tag.name == 'details':
                node_children.append(parse_details_as_tree(tag))
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


# Tree designed to work with https://dowjones.github.io/react-dropdown-tree-select
def parse_details_as_tree_custom(details):
    node_name = details.summary.string
    node_id = node_name.lower()
    state = {"expanded": False}
    node_children = []
    if details.details:
        for tag in details.contents:
            if tag.name == 'details':
                node_children.append(parse_details_as_tree_custom(tag))
    else:
        if details.ul:
            cont = details.ul.contents
        else:
            cont = details.contents
        for tag in cont:
            if tag.name == 'li':
                node_children.append({
                    "id": tag.a.string.lower(),
                    "name": tag.a.string,
                    "state": state,
                    "children": []
                })
    return {
        "id": node_id,
        "name": node_name,
        "state": state,
        "children": node_children
    }


# Tree designed to work with https://js.devexpress.com/Demos/WidgetsGallery/Demo/TreeView/VirtualMode/React/Light/
def parse_details_as_tree_select(details):
    node_name = details.summary.string
    node_id = node_name.lower()
    node_children = []
    if details.details:
        for tag in details.contents:
            if tag.name == 'details':
                node_children.append(parse_details_as_tree_select(tag))
    else:
        if details.ul:
            cont = details.ul.contents
        else:
            cont = details.contents
        for tag in cont:
            if tag.name == 'li':
                node_children.append({
                    "value": tag.a.string.lower(),
                    "label": tag.a.string,
                    "nodeType": "variable"
                })
    return {
        "value": node_id,
        "label": node_name,
        "nodeType": "group",
        "children": node_children
    }

def parse_details_as_list(details, statvar_list, parent_category):
    category_name = details.summary.string
    if details.details:
        for tag in details.contents:
            if tag.name == 'details':
                parse_details_as_list(tag, statvar_list, category_name)
    else:
        if details.ul:
            cont = details.ul.contents
        else:
            cont = details.contents
        for tag in cont:
            if tag.name == 'li':
                statvar_list.append({
                    "name": tag.a.string,
                    "label": tag.a.string,
                    "category": category_name if parent_category is None else (parent_category + ' - ' + category_name)
                })


def main():
    get_statvars()
    print('Execution completed')


if __name__ == "__main__": main()
