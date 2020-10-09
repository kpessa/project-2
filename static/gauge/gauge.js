
const makePlotlyChart = () => {

  var county = document.getElementById("county-dropdown").value;
  console.log(county)

  d3.select("#gauge-title").text(`${county} vulnerability score`)

    d3.json(`/api/v1.0/Florida_data/${county}`).then((data) => {
        
          // Initiate variables - Remove [0] after updating with functions
          let county_score = Object.values(data).map(d => d['ccvi score'])[0];
          
          // Plot gauge chart
          let gaugeData = [
              {
                domain: { x: [0, 1], y: [0, 1] },
                value: county_score,
              //   title: { text: "Average CCVI Score Florida" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                  axis: { range: [null, 1] },
                  bar: { color: "dimgray"},
                  steps: [
                    { range: [0, 0.2], color: "rgba(246, 228, 115, 0.8)" },
                    { range: [0.2, 0.4], color: "rgba(238, 165, 83, .8)" },
                    { range: [0.4, 0.6], color: "rgba(232, 106, 27, .8)" },
                    { range: [0.6, 0.8], color: "rgba(232, 27, 27, .6)" },
                    { range: [0.8, 1], color: "rgba(232, 27, 27, 1)" }
                  ],
                }
              }
            ];

            let gaugeLayout = { width: 500, height: 400, margin: { t: 0, b: 0 } };
            Plotly.newPlot('gauge-plot', gaugeData, gaugeLayout);
    }).catch(err => console.log(err));

  }

  makePlotlyChart();

