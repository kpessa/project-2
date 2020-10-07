d3.json("/secret/API_KEY").then((api_json) => {
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

  d3.json("static/map/counties.json").then((county_json) => {
    let counties = L.geoJson(county_json)
    var overlayMaps = { Counties: counties };

        var mymap = L.map("map", {
          layers: [light, counties],
        }).setView([28, -83.5], 6);

        L.control.layers(baseMaps, overlayMaps).addTo(mymap);
    
    // d3.json("/api/v1.0/Florida_data").then((fl_data) => {
    //   d3.csv("static/map/fips.csv").then((fips) => {
    //   });
    // });
        // , {
        //   onEachFeature: (feature, layer) => {
        //     // go through each record in county_data and try to connect geoJSON with county
        //     let fipsRecord;
        //     // fips.forEach(fip=> {
        //     //   let stateQ = +feature.properties.STATE === +fip.state_code
        //     //   let countyQ = feature.properties.NAME == fip.name
              
        //     //   console.log(`${feature.properties.NAME} == ${fip.name}`)

        //     //   if(stateQ && countyQ) {
        //     //     fipsRecord = fip.fip
        //     //   }
        //     // })

        //     layer.bindPopup(`<h1 class="small">${feature.properties.NAME}</h1><hr>
        //     <p>FIPS: ${fipsRecord}</p>
        //     `);
        //   }
        // });
    

        

    
  });
});
