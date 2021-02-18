#!/usr/bin/python3

# zipcodes_by_state.py: Utility to generate a JSON file with all zip codes by state

import json


def generate_zipcodes_by_state():
    output = {}
    with open('original_data/allZipCodes.json') as f:
        zips = json.load(f)
        for zip_obj in zips:
            state_abbreviation = zip_obj['state']
            if not state_abbreviation in output:
                output[state_abbreviation] = []

            zip_str = str(zip_obj['zip_code']).zfill(5) # fill out to 5 chars
            output[state_abbreviation].append(zip_str)

    with open('transformed_data/zipCodesByState.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=4)


def main():
    generate_zipcodes_by_state()
    print('Execution completed')


if __name__ == "__main__": main()