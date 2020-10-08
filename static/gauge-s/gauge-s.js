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

// Create function to build new plots
// function buildGauge(sampleCounty) {
    d3.json("/api/v1.0/Florida_data").then((data) => {
        console.log(data)
        // Assign variables for accessing data
        // let state_score = data['ccvi score'].filter(d => d.county === sampleCounty)[0];
        // let samples = data.samples.filter(s => s.id.toString() === sampleCounty)[0];

        // // Grab values to build the plots
        // let sampleValues = samples.sample_values;
        // let otuIDs = samples.otu_ids;
        // let otuLabels = samples.otu_labels;

        // // Console log grabbed values for checking
        // console.log(`Sample ID: ${sampleCounty}`);
        // console.log(metadata);
        // console.log(samples);
        // console.log(sampleValues);
        // console.log(otuIDs);
        // console.log(otuLabels);

        // Plot gauge chart
    //     let gaugeData = [
    //         {
    //           domain: { x: [0, 1], y: [0, 1] },
    //           value: metadata.wfreq,
    //           title: { text: "<b>Belly Button Wash Frequency</b><br>" +
    //                             "Wash per Week" },
    //           type: "indicator",
    //           mode: "gauge+number",
    //           gauge: {
    //             axis: { range: [null, 9] },
    //             bar: { color: "yellow"},
    //             steps: [
    //               { range: [0, 1], color: "rgba(81, 134, 28, .2)" },
    //               { range: [1, 2], color: "rgba(81, 134, 28, .3)" },
    //               { range: [2, 3], color: "rgba(81, 134, 28, .4)" },
    //               { range: [3, 4], color: "rgba(81, 134, 28, .5)" },
    //               { range: [4, 5], color: "rgba(81, 134, 28, .6)" },
    //               { range: [5, 6], color: "rgba(81, 134, 28, .7)" },
    //               { range: [6, 7], color: "rgba(81, 134, 28, .8)" },
    //               { range: [7, 8], color: "rgba(81, 134, 28, .9)" },
    //               { range: [8, 9], color: "rgba(81, 134, 28, 1)" }
    //             ],
    //           }
    //         }
    //       ];
          
    //       let gaugeLayout = { width: 500, height: 400, margin: { t: 0, b: 0 } };
    //       Plotly.newPlot('gauge-chart-state', gaugeData, gaugeLayout);
    // })
// }

// Create function to handle sample change
// function optionChanged(sampleCounty) {
//    buildPlots(sampleCounty);
// }

// // Load init()
// init();
