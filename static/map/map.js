
// d3.json("/secret/API_KEY").then((api_json) => {
//   let API_KEY = api_json.API_KEY;
//   let satellite = makeLayer("satellite-v9", API_KEY);
//   let streets = makeLayer("streets-v11", API_KEY);
//   let light = makeLayer("light-v10", API_KEY);
//   let dark = makeLayer("dark-v10", API_KEY);

//   let baseMaps = {
//     Satellite: satellite,
//     Streets: streets,
//     Light: light,
//     Dark: dark,
//   };


//   d3.json("static/map/florida_data.geojson").then((florida_data) => {
    
//     let cases = createOverlay(florida_data, "fl_data_cases");
//     let case_rate = createOverlay(florida_data, "fl_data_case rate")
//     let median_income = createOverlay(florida_data, "fl_data_median income 2018")
//     let population = createOverlay(florida_data, "fl_data_population")
//     let deaths = createOverlay(florida_data,"fl_data_deaths")
//     let death_rate = createOverlay(florida_data, "fl_data_death rate")
//     let uninsured_perc = createOverlay(florida_data, "fl_data_uninsured percent")
//     let poor_health = createOverlay(florida_data, "fl_data_fair or poor health percent")


//     var overlayMaps = { 
//       "Uninsured %": uninsured_perc,
//       "Fair or Poor Health %": poor_health,
//       "Median Income": median_income,
//       "Population": population,
//       "Cases": cases,
//       "Case Rate": case_rate,
//       "Deaths": deaths,
//       "Death Rate": death_rate
      
//     };

//         var mymap = L.map("map", {
//           layers: [light, case_rate],
//         }).setView([28, -83.5], 7);

//         L.control.layers(baseMaps, overlayMaps).addTo(mymap);
//         info.addTo(mymap)
    
//   });
// });
