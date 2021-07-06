const axios = require('axios');
const fs = require("fs");

const DC_REST_URL = "https://api.datacommons.org/";

async function generateStateToCensusTracts() {
  let stateToCensusTracts = {};

  try {
    let response = await axios.post(DC_REST_URL + "node/places-in", {
      dcids: "country/USA",
      placeType: "State"
    });
    let payload = JSON.parse(response.data.payload);
    const stateIds = payload.map(x => x.place);

    let stateAbbrev = "";
    let censusTractIds = [];
    for (const stateId of stateIds) {
      response = await axios.post(DC_REST_URL + "node/property-values", {
        dcids: [stateId],
        property: "fips52AlphaCode",
      });
      payload = JSON.parse(response.data.payload);
      stateAbbrev = payload[stateId]["out"][0]["value"];

      response = await axios.post(DC_REST_URL + "node/places-in", {
        dcids: stateId,
        placeType: "CensusTract",
      });
      payload = JSON.parse(response.data.payload);
      censusTractIds = payload.map(x => x.place.substring(6));

      stateToCensusTracts[stateAbbrev] = censusTractIds;
    }

    fs.writeFile("output/stateToCensusTracts.json", JSON.stringify(stateToCensusTracts, null, 2), (err) => {
      if (err) throw err;
      console.log("State to census tracts file generation complete");
    });
  } catch(err) {
    console.error(err);
  }
}
generateStateToCensusTracts();