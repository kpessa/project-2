var mymap = L.map("map").setView([28, -83.5], 6);

d3.json("/secret/API_KEY").then((api_json) => {

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/light-v10",
      tileSize: 512,
      zoomOffset: -1,
      accessToken: api_json.API_KEY,
    }
  ).addTo(mymap);

  d3.json("static/js/map/counties.json").then((data) => {
    L.geoJson(data).addTo(mymap);
  });
});
