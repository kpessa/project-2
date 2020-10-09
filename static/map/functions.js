var makeLayer = (id, API_KEY) => {
  return L.tileLayer ("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: id,
    accessToken: API_KEY
  })
}

// const capitalize = (s) => {
//   if (typeof s !== 'string') return ''
//   return s.charAt(0).toUpperCase() + s.slice(1)
// }

var getMax = (florida_data, variable) => d3.max(florida_data.features.map(feature => +feature.properties[variable]))
  

var createArr = max => {
  var returnArr = []
  var buckets = 9;
  for (var i=0; i<buckets;i++) {
    returnArr.push(i*max/buckets)
  }
  return returnArr;
}

var numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var getColor = (d,scale) => {
  var colors = ['#a50026','#d73027','#f46d43','#fdae61','#fee090','#e0f3f8','#abd9e9','#74add1','#4575b4','#313695'].reverse()
  for(var i=scale.length-1;i>=0;i--) {
    if (d > scale[i]) {
      return colors[i];
    }
  }
}

var highlightFeature = e => {
  var layer = e.target;

  layer.setStyle({
    weight:5,
    color: 'black',
    dashArray: '',
    fillOpacity: 0.7
  })

  if(!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  info.update(layer.feature.properties)
}

var zoomToFeature = e => {
  let county = e.target.feature.properties.NAME10
  document.getElementById("county-dropdown").value = county
  makePlotlyChart();
  mymap.fitBounds(e.target.getBounds())
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
      <td class="label"><img src="static/images/cases.png"> Case Rate*</td>
      <td class="datum">${(+props["fl_data_case rate"]).toFixed(2)}</td>
    </tr>
    <tr>
      <td class="label"><img src="static/images/deaths.png"> Death Rate*</td>
      <td class="datum">${(+props["fl_data_death rate"]).toFixed(4)}</td>
    </tr>
    <tr><td colspan="2"><p class="asterick">* per 100,000 population</p></td></tr>
    <tr><td colspan="2"><hr></td></tr>
    <tr>
      <td class="label"><img src="static/images/uninsured.png"> Uninsured</td>
      <td class="datum">${(+props["fl_data_uninsured percent"]).toFixed(0)}%</td>
    </tr>
    <tr>
      <td class="label"><img src="static/images/poorhealth.png"> Fair or Poor Health</td>
      <td class="datum">${(+props["fl_data_fair or poor health percent"]).toFixed(0)}%</td>
    </tr>
  <tr><td colspan="2"><hr></td></tr>
    <tr>
      <td class="label"><img src="static/images/cash.png"> Median Income</td>
      <td class="datum">$${numberWithCommas((+props["fl_data_median income 2018"]).toFixed(0))}</td>
    </tr>
    <tr>
      <td class="label"><img src="static/images/people.png"> Population</td>
      <td class="datum">${+props["fl_data_population"]>0 ? numberWithCommas((+props["fl_data_population"]).toFixed(0)) : "missing data"}</td>
    </tr>
    <tr><td colspan="2"><hr></td></tr>
    <tr>
      <td class="label"><img src="static/images/cases.png"> Cases</td>
      <td class="datum">${numberWithCommas(props["fl_data_cases"])}</td>
    </tr>
    
    <tr>
      <td class="label"><img src="static/images/deaths.png"> Deaths</td>
      <td class="datum">${numberWithCommas(props["fl_data_deaths"])}</td>
    </tr>
    
  </table>
  <hr>
  
  ` : 'Hover over a county..'
}