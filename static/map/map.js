d3.json(" /secret/API_KEY").then((api_json) => {
  let API_KEY = api_json.API_KEY;
  let satellite = makeLayer("satellite-v9", API_KEY);
  let streets = makeLayer("streets-v11", API_KEY);
  let light = makeLayer("light-v10", API_KEY);
  let dark = makeLayer("dark-v10", API_KEY);

  let baseMaps = {
    Satellite: satellite,
    Streets: streets,
    Light: light,
    Dark: dark,
  };

  d3.json("static/map/counties.json").then((data) => {
    var counties = L.geoJson(data);

    var overlayMaps = { Counties: counties };

    var mymap = L.map("map", {
      layers: [light, counties],
    }).setView([28, -83.5], 6);

    L.control.layers(baseMaps, overlayMaps).addTo(mymap);
  });
});
