#!/usr/bin/python3

# statvar_scraper: Utility to generate city/town -> FIPS and FIPS -> city/town json files

import json
import pandas as pd


def generate_data():

    # Read map fips -> state abbreviation
    with open('source_data/fips-to-state-abbreviation.json') as f:
        fips_to_state_abbrv = json.load(f)

    # Read census.gov excel file
    df = pd.read_excel('source_data/all-geocodes-v2018.xlsx', header=4, index_col=0, names = ['SL', 'State', 'County', 'CS', 'Place', 'CCC', 'Name'], dtype=str)

    # Cities
    city_to_fips = {}
    fips_to_city = {}
    # Counties
    county_to_fips = {}
    fips_to_county = {}
    # States to counties and cities
    state_to_cities = {}
    state_to_counties = {}
    for i, row in df.iterrows():
        state_fips = row['State']
        if state_fips != '00' and state_fips != '72':  # 00 -> US; 72 -> Puerto Rico
            place_name = row['Name']
            state_abbr = fips_to_state_abbrv[state_fips]
            if is_city_name(place_name):
                fips = state_fips + row['Place']
                # Cities
                city = extract_city(place_name)
                city_plus_state_abbr_short = city + ',' + state_abbr
                city_plus_state_abbr = city + ', ' + state_abbr
                city_to_fips[city_plus_state_abbr_short.lower()] = fips
                fips_to_city[fips] = city_plus_state_abbr
                # State to cities
                if state_abbr not in state_to_cities:
                    state_to_cities[state_abbr] = []
                state_to_cities[state_abbr].append(city_plus_state_abbr)
            elif is_county_name(place_name):
                fips = state_fips + row['County']
                # Counties
                county = extract_county(place_name)
                county_plus_state_abbr_short = county + ',' + state_abbr
                county_plus_state_abbr = county + ', ' + state_abbr
                county_to_fips[county_plus_state_abbr_short.lower()] = fips
                fips_to_county[fips] = county_plus_state_abbr
                # State to counties
                if state_abbr not in state_to_counties:
                    state_to_counties[state_abbr] = []
                state_to_counties[state_abbr].append(county_plus_state_abbr)

    with open('output_data/cityToFips.json', 'w', encoding='utf-8') as f:
        json.dump(city_to_fips, f, indent=2)

    with open('output_data/fipsToCity.json', 'w', encoding='utf-8') as f:
        json.dump(fips_to_city, f, indent=2)

    with open('output_data/stateToCities.json', 'w', encoding='utf-8') as f:
        json.dump(state_to_cities, f, indent=2)

    with open('output_data/countyToFips.json', 'w', encoding='utf-8') as f:
        json.dump(county_to_fips, f, indent=2)

    with open('output_data/fipsToCounty.json', 'w', encoding='utf-8') as f:
        json.dump(fips_to_county, f, indent=2)

    with open('output_data/stateToCounties.json', 'w', encoding='utf-8') as f:
        json.dump(state_to_counties, f, indent=2)


def is_city_name(place_name):
    if place_name.lower().endswith("city") or place_name.lower().endswith("town") or place_name.lower().endswith("village"):
        return True
    else:
        return False


def is_county_name(place_name):
    if place_name.lower().endswith("county"):
        return True
    else:
        return False


def extract_city(city_full_name):
    if city_full_name.endswith("city"):
        return replace_right(city_full_name, "city", "", 1).strip()
    elif city_full_name.endswith("town"):
        return replace_right(city_full_name, "town", "", 1).strip()
    elif city_full_name.endswith("village"):
        return replace_right(city_full_name, "village", "", 1).strip()
    if city_full_name.endswith("City"):
        return replace_right(city_full_name, "City", "", 1).strip()
    elif city_full_name.endswith("Town"):
        return replace_right(city_full_name, "Town", "", 1).strip()
    elif city_full_name.endswith("Village"):
        return replace_right(city_full_name, "Village", "", 1).strip()
    return city_full_name


def extract_county(county_full_name):
    if county_full_name.endswith("county"):
        return replace_right(county_full_name, "county", "", 1).strip()
    if county_full_name.endswith("County"):
        return replace_right(county_full_name, "County", "", 1).strip()
    return county_full_name


def replace_right(source, target, replacement, replacements=None):
    return replacement.join(source.rsplit(target, replacements))


def main():
    generate_data()
    print('Execution completed')


if __name__ == "__main__": main()
