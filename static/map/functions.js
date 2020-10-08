
const makeLayer = (id, API_KEY) => {
  return L.tileLayer ("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: id,
    accessToken: API_KEY
  })
}

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const getMax = (florida_data, variable) => d3.max(florida_data.features.map(feature => +feature.properties[variable]))
  


const getColor = (d,scale) => {
  var colors = ['#a50026','#d73027','#f46d43','#fdae61','#fee090','#e0f3f8','#abd9e9','#74add1','#4575b4','#313695'].reverse()
  for(var i=scale.length-1;i>=0;i--) {
    if (d > scale[i]) {
      return colors[i];
    }
  }
}

const createArr = max => {
  var returnArr = []
  for (var i=0; i<10;i++) {
    returnArr.push(i*max/10)
  }
  return returnArr;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

