// Define SVG area dimensions
var svgWidth = parseInt(d3.select('#d3-scatter').style('width'));
var svgHeight = 400;
var hHeight = parseInt(d3.select('#scatter-title-height').style('height'));
var margin = { t: 10, r: 30, b: 80, l: 100 }

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.l - margin.r;
var chartHeight = svgHeight - hHeight - margin.t - margin.b;

// Append the svg object to the body of the page
var svg = d3.select("#d3-scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .call(responsivefy)

// Append an SVG group
var chart = svg.append('g')
    .attr("transform", `translate(${margin.l} ${margin.t})`)
    .attr("width", chartWidth)
    .attr("height", chartHeight)

// Relative path for data origin 
var queryUrl = "/api/v1.0/Florida_data";



// Initial X and Y params
var chosenXAxis = 'median income (2018)';
var chosenYAxis = 'death rate';

// d3.select('#county-dropdown')
// .on("change", function () { 
//   var county = document.getElementById("county-dropdown").value
//   console.log(county);
// //   d3.json(`/api/v1.0/Florida_data/${county}`).then(data => {
// //     console.log(data)
// //   })
// //   makePlotlyChart();
// })
// var selectedCounty = d3.select('#county-dropdown').value();
// console.log(selectedCounty);

// // Function used for updating x-scale var upon click on axis label
// function xScale(data, chosenXAxis) {
//     // create scales
//     var xLinearScale = d3.scaleLinear()
//       .domain([d3.min(Object.values(data).map(d => d[chosenXAxis])) * 0.8,
//         d3.max(Object.values(data).map(d => d[chosenXAxis])) * 1.2
//       ])
//       .range([0, chartWwidth]);

//     return xLinearScale;

//   }
// console.log(Object.keys(county));

// Function that populates the scatter plot
function scatter_plot(data_origin) {

    // Perform a GET request to the query URL
    d3.json(data_origin).then(function (data) {

        console.log(data);

        // console.log(d3.min(data, d => Object.values(d).map(r => r[x])));

        // X and Y axis array extraction
        xVals = Object.values(data).map(d => d[chosenXAxis]);
        yVals = Object.values(data).map(d => d[chosenYAxis]);
        countyList = Object.values(data).map(d => d.county);

        console.log(Array.isArray(xVals));
        // console.log(xVals);

        // X and Y max/min values
        var xValMax = d3.max(xVals) * 1.10;
        var xValMin = d3.min(xVals) * 0.90;
        var yValMax = d3.max(yVals) * 1.10;
        var yValMin = d3.min(yVals) * 0.90;
        // console.log(xValMax, xValMin, yValMax, yValMin);


        // Add X axis
        xScale = d3.scaleLinear()
            .domain([xValMin, xValMax])
            .range([0, chartWidth])

        // Add Y axis
        yScale = d3.scaleLinear()
            .domain([yValMin, yValMax])
            .range([chartHeight, 0]);

        selectedCounty = document.getElementById("county-dropdown").value;
        
        // Add dots
        // chart.append('g')
        //     .selectAll("circle")
        //     .data(xVals)
        //     .enter()
        //     .append("circle")
        //     .attr("cx", function (d, i) { return xScale(d); })
        //     .attr("cy", function (d, i) { return yScale(yVals[i]); })
        //     .attr("r", 5)
        //     .classed('bubbles', true);

        // Add dots ORIGINAL
        // Dots
        // chart.append('g')
        //     .selectAll("circle")
        //     .data(xVals)
        //     .enter()
        //     .append("circle")
        //     // .attr("class", "bubbles")
        //     .attr("cx", function (d, i) { return xScale(d); })
        //     .attr("cy", function (d, i) { return yScale(yVals[i]); })
        //     .attr("r", 5)
        //     .attr("class", function(d, i) {
        //         if(countyList[i] == selectedCounty) {return "highlight"}

        //         else {return "bubbles"}
        //     });
  



        chart.html('')
        .append('g')
        .selectAll("circle")
        .data(xVals)
        .enter()
        .append("circle")
        // .attr("class", "bubbles")
        .attr("cx", function (d, i) { return xScale(d); })
        .attr("cy", function (d, i) { return yScale(yVals[i])*.95; } )
        .attr("r", 5)
        // .classed('bubbles', true);
        .attr("class", false)
        .attr("class", (d, i) => countyList[i] == selectedCounty ? "highlight" : "bubbles");
        // .style("opacity", 0.75)
        // .style("fill", function(d, i) {
        //     if(countyList[i] == selectedCounty) {return "red"}

        //     else {return "blue"}
        // })
    //     // .style("opacity", 0.75)
    // console.log(xVals);

        // Create axes
        var yAxis = d3.axisLeft(yScale);
        var xAxis = d3.axisBottom(xScale)
            .ticks(4)
            .tickFormat(d => '$' + d3.format(',')(d))

        // Set x to the bottom of the chart
        chart.append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(xAxis)
            .attr('class', 'xAxis')

        // Set y to the y axis
        chart.append("g")
            .call(yAxis)
            .attr('class', 'yAxis')

        // Linear Regression line
        var dataLinear = []
        xVals.forEach(function (v, i) {
            dataLinear.push({ 'x': v, 'y': yVals[i] })
        });

        // console.log(dataLinear);

        var linearRegression = d3.regressionLinear()
            .x(d => d.x)
            .y(d => d.y)
            .domain([xValMin+3000, xValMax-10000]);

        let res = linearRegression(dataLinear)

        let x = d3.scaleLinear().range([0, chartWidth]);
        let y = d3.scaleLinear().range([chartHeight, 0]);

        x.domain(d3.extent(dataLinear, (d) => d.x));
        y.domain(d3.extent(dataLinear, (d) => d.y));

        let line = d3.line()
            .x((d) => x(d[0]))
            .y((d) => y(d[1]));
        
        chart.append("path")
            .datum(res)
            .attr("d", line)
            .style("stroke", "steelblue")
            .style("stroke-width", "2px");

        // Y axis label
        var axisLabelX = chartWidth / 10;
        var axisLabelY = chartHeight / 2.5;
        svg.append('g')
            .attr("transform", `translate(${margin.l / 2 - 15} ${(svgHeight - margin.b) / 2})`)
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(-90)')
            .text(chosenXAxis)
            .classed('axis', true)

        // X axis label
        var axisLabelX = chartHeight / 100;
        var axisLabelY = chartWidth / 2;
        svg.append("text")
            .attr("x", (svgWidth - (svgWidth - chartWidth)) / 2 + 20)
            .attr("y", svgHeight - margin.b / 2 - 10)
            .text(chosenXAxis)
            .classed('axis', true)

    




    });
};

// })
// .catch(function(error) {
//         // console.log(error);
// });
// };

// Loads Scatter
scatter_plot(queryUrl);