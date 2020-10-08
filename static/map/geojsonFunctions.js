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
      <td class="label">Uninsured</td>
      <td>${(+props["fl_data_uninsured percent"]).toFixed(0)}%</td>
    </tr>
    <tr>
      <td class="label">Fair or Poor Health</td>
      <td>${(+props["fl_data_fair or poor health percent"]).toFixed(0)}%</td>
    </tr>
  </table>
  <hr>
  <table>
    <tr>
      <td class="label">Median Income</td>
      <td>$${numberWithCommas((+props["fl_data_median income 2018"]).toFixed(0))}</td>
    </tr>
    <tr>
      <td class="label">Population</td>
      <td>${numberWithCommas((+props["fl_data_population"]).toFixed(0))}</td>
    </tr>
  </table>
  <hr>
  <table>
    <tr>
      <td class="label">Cases</td>
      <td>${numberWithCommas(props["fl_data_cases"])}</td>
    </tr>
    <tr>
      <td class="label">Case Rate*</td>
      <td>${(+props["fl_data_case rate"]).toFixed(2)}</td>
    </tr>
    <tr>
      <td class="label">Deaths</td>
      <td>${numberWithCommas(props["fl_data_deaths"])}</td>
    </tr>
    <tr>
      <td class="label">Death Rate*</td>
      <td>${(+props["fl_data_death rate"]).toFixed(4)}</td>
    </tr>
  </table>
  <hr>
  <p class="asterick">* per 100,000 population</p>
  ` : 'Hover over a county..'
}