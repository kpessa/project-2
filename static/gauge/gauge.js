// // Initialize the page with a default plot
// function init() {
//     d3.json("/api/v1.0/Florida_data").then((data) => {
//         console.log(data);

//         // Populate dropdown menu with sample ids
//         let dropdownMenu = d3.select("select");
//         data.names.forEach(name => {
//             dropdownMenu.append("option").text(name);
//             });

//         // Make plots with default sample
//         buildPlots(data.names[0]);
//     });
// }

// var data_url = "static/data/fl_data.csv";
// var data_url = "/api/v1.0/Florida_data";
// gaugeState(data_url)

// Create function to build new plots
// function gaugeState(fl_data) {
  d3.json("/api/v1.0/Florida_data").then((data) => {
    console.log(data);

        // Initiate variables - Remove [0] after updating with functions
        let county_score = Object.values(data).map(d => d['ccvi score'])[0];
        console.log(county_score);

        // let sum = 0;

        // // Calculate sum of county scores in FL
        // for (var i = 0; i < county_score.length; i++) {
        //     let score = county_score[i];
        //     sum += score;
        // }
        // console.log(sum);

        // // Calculate average score to make gauge chart
        // let avg = sum / county_score.length;
        // console.log(avg);


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
          Plotly.newPlot('gauge-chart-county', gaugeData, gaugeLayout);
  });


// };



// Create function to handle sample change
// function optionChanged(sampleCounty) {
//    buildPlots(sampleCounty);
// }

// // Load init()
// init();
