/* ============================================================================
   MAP LOCATIONS — THIS IS THE ONLY FILE YOU EDIT TO ADD POINTS ON THE WORLD MAP
   ----------------------------------------------------------------------------
   HOW TO ADD A POINT (no coding needed):
     1. Copy one whole block from "{" to "}," (including the comma).
     2. Paste it below as a new block.
     3. Change the text and the coordinates.
     4. Save. The map updates automatically.

   HOW TO GET COORDINATES (lat / lng):
     • Go to Google Maps, right-click any place, and click the numbers at the
       top of the menu — they copy as "latitude, longitude".
     • Example: London = 51.5074, -0.1278  ->  lat: 51.5074, lng: -0.1278

   FIELD GUIDE:
     name    : the label shown on the map (city, office or landmark name)
     country : the country
     lat,lng : the coordinates (numbers — no quotation marks)
     type    : one of just two values:
                 "plant"  -> Manufacturing Plants / Offices  (dark blue marker)
                 "market" -> Distributors / Key Markets       (gold marker)
               (this sets the marker colour — see the legend on the page)
     note    : a short description shown when the point is clicked
   ============================================================================ */

const MAP_LOCATIONS = [

  {
    name: "Head Office & Plant",
    country: "United Arab Emirates",   // <-- REPLACE with your real HQ
    lat: 25.2048, lng: 55.2708,        // <-- REPLACE coordinates
    type: "plant",
    note: "Global headquarters, central trading desk and manufacturing plant."
  },

  {
    name: "Mumbai Office",
    country: "India",
    lat: 19.0760, lng: 72.8777,
    type: "plant",
    note: "Regional office serving South Asia."
  },

  {
    name: "Singapore Office",
    country: "Singapore",
    lat: 1.3521, lng: 103.8198,
    type: "plant",
    note: "Asia-Pacific hub for logistics and partner support."
  },

  {
    name: "Rotterdam Distributor",
    country: "Netherlands",
    lat: 51.9244, lng: 4.4777,
    type: "market",
    note: "European distribution partner and port access."
  },

  {
    name: "São Paulo — Key Market",
    country: "Brazil",
    lat: -23.5505, lng: -46.6333,
    type: "market",
    note: "Key export market and distributor network."
  },

];

/* Marker colours per type — only two categories.
   Change the colours if you like (do not rename the keys "plant"/"market"). */
const MAP_TYPES = {
  plant:  { color: "#002654", label: "Manufacturing Plants / Offices" },
  market: { color: "#A8772A", label: "Distributors / Key Markets" },
};

if (typeof module !== "undefined") module.exports = { MAP_LOCATIONS, MAP_TYPES };
