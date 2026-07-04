/* ============================================================================
   GLOBAL-REACH.JS  —  draws the world map and plots the points.
   You do NOT need to edit this file. Edit map-locations.js to manage points.
   Uses Leaflet (free, open source) loaded from a CDN in global-reach.html.
   ============================================================================ */
(function () {
  const mapEl = document.getElementById("map");
  if (!mapEl || typeof L === "undefined") return;

  const map = L.map("map", {
    center: [20, 30], zoom: 2, minZoom: 2, scrollWheelZoom: false, worldCopyJump: true
  });

  // Muted, professional map tiles (free CARTO basemap)
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; OpenStreetMap &copy; CARTO', subdomains: "abcd", maxZoom: 19
  }).addTo(map);

  function pin(color) {
    return L.divIcon({
      className: "",
      html: `<div style="width:16px;height:16px;border-radius:50%;background:${color};
             border:2px solid #fff;box-shadow:0 0 0 2px ${color}55,0 4px 8px rgba(0,0,0,.3)"></div>`,
      iconSize: [16, 16], iconAnchor: [8, 8], popupAnchor: [0, -10]
    });
  }

  const bounds = [];
  (typeof MAP_LOCATIONS !== "undefined" ? MAP_LOCATIONS : []).forEach(loc => {
    const t = (typeof MAP_TYPES !== "undefined" && MAP_TYPES[loc.type]) || { color: "#14202E", label: "" };
    L.marker([loc.lat, loc.lng], { icon: pin(t.color) }).addTo(map)
      .bindPopup(
        `<strong>${loc.name}</strong><br>
         <span style="color:#6B7686;font-size:.85em">${loc.country} · ${t.label}</span>
         ${loc.note ? `<br><br>${loc.note}` : ""}`
      );
    bounds.push([loc.lat, loc.lng]);
  });

  if (bounds.length > 1) map.fitBounds(bounds, { padding: [50, 50], maxZoom: 5 });

  // Enable scroll-zoom only after the user clicks the map (prevents page-scroll hijack)
  map.on("click", () => map.scrollWheelZoom.enable());

  // Build the legend dynamically from MAP_TYPES
  const legend = document.getElementById("map-legend");
  if (legend && typeof MAP_TYPES !== "undefined") {
    legend.innerHTML = Object.values(MAP_TYPES)
      .map(t => `<span><i style="background:${t.color}"></i>${t.label}</span>`).join("");
  }
})();
