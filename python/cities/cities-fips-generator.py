#!/usr/bin/python3

# statvar_scraper: Utility to generate city/town -> FIPS and FIPS -> city/town json files

import json
import pandas as pd


def function1():

    # Read map fips -> state abbreviation
    with open('source_data/fips-to-state-abbreviation.json') as f:
        fips_to_state_abbrv = json.load(f)

    # Read census.gov excel file
    df = pd.read_excel('source_data/all-geocodes-v2018.xlsx', header=4, index_col=0, names = ['SL', 'State', 'County', 'CS', 'Place', 'CCC', 'Name'], dtype=str)

    city_to_fips = {}
    fips_to_city = {}
    for i, row in df.iterrows():
        place_name = row['Name']
        if is_city_name(place_name):
            city = extract_city(place_name)
            state_fips = row['State']
            state_abbr = fips_to_state_abbrv[state_fips]
            city_plus_state_abbr = city + ', ' + state_abbr
            fips = state_fips + row['Place']
            city_to_fips[city_plus_state_abbr.lower()] = fips
            fips_to_city[fips] = city_plus_state_abbr

    with open('output_data/cityToFips.json', 'w', encoding='utf-8') as f:
        json.dump(city_to_fips, f, indent=2)

    with open('output_data/fipsToCity.json', 'w', encoding='utf-8') as f:
        json.dump(fips_to_city, f, indent=2)


def is_city_name(place_name):
    if place_name.lower().endswith("city") or place_name.lower().endswith("town") or place_name.lower().endswith("village"):
        return True
    else:
        return False


def extract_city(city_full_name):
    if city_full_name.lower().endswith("city"):
        return replace_right(city_full_name, "city", "", 1).strip()
    elif city_full_name.lower().endswith("town"):
        return replace_right(city_full_name, "town", "", 1).strip()
    elif city_full_name.lower().endswith("village"):
        return replace_right(city_full_name, "village", "", 1).strip()
    return city_full_name


def replace_right(source, target, replacement, replacements=None):
    return replacement.join(source.rsplit(target, replacements))


def main():
    function1()
    print('Execution completed')


if __name__ == "__main__": main()
