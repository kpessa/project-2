const getColor = (d,scale) => {
  var colors = ['#a50026','#d73027','#f46d43','#fdae61','#fee090','#e0f3f8','#abd9e9','#74add1','#4575b4','#313695'].reverse()
  for(var i=scale.length-1;i>=0;i--) {
    if (d > scale[i]) {
      return colors[i];
    }
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

function zoomToFeature(e) {
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
      <td class="label">Case Rate*</td>
      <td>${(+props["fl_data_case rate"]).toFixed(2)}</td>
    </tr>
    <tr>
      <td class="label">Death Rate*</td>
      <td>${(+props["fl_data_death rate"]).toFixed(4)}</td>
    </tr>
    <tr><td colspan="2"><p class="asterick">* per 100,000 population</p></td></tr>
    <tr><td colspan="2"><hr></td></tr>
    <tr>
      <td class="label">Uninsured</td>
      <td>${(+props["fl_data_uninsured percent"]).toFixed(0)}%</td>
    </tr>
    <tr>
      <td class="label">Fair or Poor Health</td>
      <td>${(+props["fl_data_fair or poor health percent"]).toFixed(0)}%</td>
    </tr>
  <tr><td colspan="2"><hr></td></tr>
    <tr>
      <td class="label">Median Income</td>
      <td>$${numberWithCommas((+props["fl_data_median income 2018"]).toFixed(0))}</td>
    </tr>
    <tr>
      <td class="label">Population</td>
      <td>${+props["fl_data_population"]>0 ? numberWithCommas((+props["fl_data_population"]).toFixed(0)) : "missing data"}</td>
    </tr>
    <tr><td colspan="2"><hr></td></tr>
    <tr>
      <td class="label">Cases</td>
      <td>${numberWithCommas(props["fl_data_cases"])}</td>
    </tr>
    
    <tr>
      <td class="label">Deaths</td>
      <td>${numberWithCommas(props["fl_data_deaths"])}</td>
    </tr>
    
  </table>
  <hr>
  
  ` : 'Hover over a county..'
}