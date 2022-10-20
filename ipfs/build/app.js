import { create } from 'ipfs-http-client';
import fs from "fs";
const json = {
    data: Date.now(),
    requestID: "0x000000000000000000000000000000000000000000000000000000000000000b",
    query: {
        "prefixList": [
            { "abbreviation": "desmo", "completeURI": "https://desmo.vaimee.it/" },
            { "abbreviation": "qudt", "completeURI": "http://qudt.org/schema/qudt/" },
            { "abbreviation": "onto", "completeURI": "http://onto.org/ontologies/base/" }
        ],
        "property": {
            "identifier": "desmo:OutdoorTemperature",
            "unit": "qudt:DEG_C",
            "datatype": 1
        },
        "geoFilter": {
            "region": {
                "center": {
                    "latitude": 41.9109,
                    "longitude": 12.4818
                },
                "radius": {
                    "value": 50.0,
                    "unit": "qudt:KiloM"
                }
            },
            "altitudeRange": {
                "min": 0,
                "max": 500,
                "unit": "qudt:M"
            }
        }
    }
};
const file = "./files/request" + Date.now() + ".json";
fs.writeFileSync(file, JSON.stringify(json));
/* Create an instance of the client */
async function loadIpfs() {
    // const { create } = await import('ipfs-http-client')
    const client = await create({ url: 'http://localhost:5001' });
    const ris = await client.add(JSON.stringify(json));
    console.log("ris", ris);
}
loadIpfs();
