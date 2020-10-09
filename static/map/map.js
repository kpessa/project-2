var API_KEY = document.getElementById("key").innerText;

var mymap;
(mymap == null) ? mymap = L.map("map").setView([28, -83.5], 7): console.log("running a second time");


var satellite = makeLayer("satellite-v9", API_KEY);
var streets = makeLayer("streets-v11", API_KEY);
var light = makeLayer("light-v10", API_KEY);
var dark = makeLayer("dark-v10", API_KEY);

var baseMaps = {
  Satellite: satellite,
  Streets: streets,
  Light: light,
  Dark: dark,
};

light.addTo(mymap);

d3.json("static/map/florida_data.geojson").then((florida_data) => {
  
  var cases = createOverlay(florida_data, "fl_data_cases");
  var case_rate = createOverlay(florida_data, "fl_data_case rate")
  var median_income = createOverlay(florida_data, "fl_data_median income 2018")
  var population = createOverlay(florida_data, "fl_data_population")
  var deaths = createOverlay(florida_data,"fl_data_deaths")
  var death_rate = createOverlay(florida_data, "fl_data_death rate")
  var uninsured_perc = createOverlay(florida_data, "fl_data_uninsured percent")
  var poor_health = createOverlay(florida_data, "fl_data_fair or poor health percent")

  var overlayMaps = { 
    "Uninsured %": uninsured_perc,
    "Fair or Poor Health %": poor_health,
    "Median Income": median_income,
    "Population": population,
    '<img src="static/images/cases.png"><span> Cases</span>': cases,
    '<img src="static/images/cases.png"><span> Case Rate</span>': case_rate,
    '<img src="static/images/deaths.png"><span> Deaths</span>': deaths,
    '<img src="static/images/deaths.png"><span> Death Rate</span>': death_rate
  };

  case_rate.addTo(mymap);

  L.control.layers(baseMaps, overlayMaps).addTo(mymap);
  info.addTo(mymap)
  
});

