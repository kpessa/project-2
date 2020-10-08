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


  d3.json("static/map/florida_data.geojson").then((florida_data) => {

    function style(feature) {
      return {
        fillColor: getColor(feature.properties.fl_data_cases,createArr(10000)),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray:'3',
        fillOpacity: 0.7
      }
    }

    function highlightFeature(e) {
      var layer = e.target;

      layer.setStyle({
        weight:5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
      })

      if(!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }

      info.update(layer.feature.properties)
    }

    function resetHighlight(e) {
      counties.resetStyle(e.target)
      info.update()
    }

    function zoomToFeature(e) {
      mymap.fitBounds(e.target.getBounds())
    }

    function onEachFeature(feature,layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
      })
    }

    var info = L.control();

    info.onAdd = function(map) {
      this._div = L.DomUtil.create('div','info');
      this.update();
      return this._div;
    }

    info.update = function (props) {
      this._div.innerHTML =  props ? `<strong><h4>${props.NAMELSAD10}</h4><strong><hr>
      <table>
        <tr>
          <td class="label">Population</td>
          <td>${numberWithCommas((+props["fl_data_population"]).toFixed(0))}</td>
        </tr>
        <tr>
          <td class="label">Cases</td>
          <td>${numberWithCommas(props["fl_data_cases"])}</td>
        </tr>
      </table>` : 'Hover over a county..'
    }
    

    let counties = L.geoJson(florida_data,{
      style:style,
      onEachFeature: onEachFeature
    })

    var overlayMaps = { Counties: counties };

        var mymap = L.map("map", {
          layers: [light, counties],
        }).setView([28, -83.5], 6);

        L.control.layers(baseMaps, overlayMaps).addTo(mymap);
        info.addTo(mymap)
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
