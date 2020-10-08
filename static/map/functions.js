makeLayer = (id, API_KEY) => {
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

getMax = (florida_data, variable) => d3.max(florida_data.features.map(feature => +feature.properties[variable]))
  

createArr = max => {
  var returnArr = []
  var buckets = 9;
  for (var i=0; i<buckets;i++) {
    returnArr.push(i*max/buckets)
  }
  return returnArr;
}

numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

