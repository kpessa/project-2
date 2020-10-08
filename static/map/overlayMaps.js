const createOverlay = (florida_data, variable) => {
  function style(feature) {
    return {
      fillColor: getColor(feature.properties[variable],createArr(getMax(florida_data,variable))),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray:'3',
      fillOpacity: 0.7
    }
  }

  function resetHighlight(e) {
    overlay.resetStyle(e.target)
    info.update()
  }

  function onEachFeature(feature,layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
    })
  }
  
  let overlay = L.geoJson(florida_data, {
    style:style,
    onEachFeature: onEachFeature
  })

  return overlay;
};

const createCaseRateOverlay = florida_data => {
  function style(feature) {
    return {
      fillColor: getColor(feature.properties["fl_data_case rate"],createArr(getMax(florida_data,"cases"))),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray:'3',
      fillOpacity: 0.7
    }
  }

  function resetHighlight(e) {
    cases.resetStyle(e.target)
    info.update()
  }

  function onEachFeature(feature,layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
    })
  }
  
  let cases = L.geoJson(florida_data, {
    style:style,
    onEachFeature: onEachFeature
  })
}