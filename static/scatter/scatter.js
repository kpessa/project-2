// Define SVG area dimensions

var svgWidth = parseInt(d3.select('#d3-scatter').style('width'));
var svgHeight = 400;
var hHeight = parseInt(d3.select('#scatter-title-height').style('height'));

// console.log(svgWidth, svgHeight);
// svgWidth - (svgWidth/3.9);

var margin = { t: 10, r: 30, b: 80, l: 100 }
// svgWidth/100;
// var pad = svgWidth/5;
// var labelArea = svgWidth/5;

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.l - margin.r;
// svgWidth - (margin * 20);
// 370 
var chartHeight = svgHeight - hHeight - margin.t - margin.b;
// 300
// svgHeight - (margin * 5);

// append the svg object to the body of the page
var svg = d3.select("#d3-scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .call(responsivefy)

var chart = svg.append('g')
    .attr("transform", `translate(${margin.l} ${margin.t})`)
    .attr("width", chartWidth)
    .attr("height", chartHeight)

// Relative path for data origin 
var queryUrl = "/api/v1.0/Florida_data";

//  CSV Testing
// var queryUrl = "static/data/fl_data.csv";

// Loads Scatter
scatter_plot(queryUrl)

// Function that populates the scatter plot
function scatter_plot(data_origin) {

    // Perform a GET request to the query URL
    d3.json(data_origin).then(function(data) {
        // console.log('here i am');
        // d3.csv(data_origin).then(function(data) {
        // console.log(data);

        var x = 'median income (2018)';
        var y = 'death rate';

        // X and Y Axis Max/Min Values
        var xVals = Object.values(data).map(d => d[x]);
        var yVals = Object.values(data).map(d => d[y]);

        // (d,i)

        // console.log(typeof(yVals));
        console.log(Array.isArray(xVals));
        console.log(xVals);
        // var test = Object.values(yVals);
        // console.log(test);


        // Min and Max x and y axis values
        // var xValMax = Math.max.apply(Math, Object.values(xVals))* 1.10;
        // var xValMin = Math.min.apply(Math, Object.values(xVals))* 0.90;
        // var yValMax = Math.max.apply(Math, Object.values(yVals))* 1.10;
        // var yValMin = Math.min.apply(Math, Object.values(yVals))* 0.90;
        

        var xValMax = d3.max(xVals) * 1.10;
        var xValMin = d3.min(xVals) * 0.90;
        var yValMax = d3.max(yVals) * 1.10;
        var yValMin = d3.min(yVals) * 0.90;
        console.log(xValMax, xValMin, yValMax, yValMin);


        // Add X axis
        var xScale = d3.scaleLinear()
            .domain([xValMin, xValMax])
            .range([0, chartWidth])

        // Add Y axis
        var yScale = d3.scaleLinear()
            .domain([yValMin, yValMax])
            .range([chartHeight, 0]);

        // Add dots
        chart.append('g')
            .selectAll("circle")
            .data(xVals)
            .enter()
            .append("circle")
            // .attr("cx", d => xScale(Object.values(d).map(r => r[x])))
            // .attr("cy", d => yScale(Object.values(d).map(r => r[y])))
            // .attr("cx", function(d) { return xScale(Object.values(data).map(d => d[x])); })
            // .attr("cy", function(d) { return yScale(Object.values(data).map(d => d[y])); })
            // .attr("cx", function(d) { return xScale(d["death rate"]); })
            .attr("cx", function(d,i) { return xScale(d); })
            .attr("cy", function(d,i) { return yScale(yVals[i]); })

            // .attr("cx", function (d) { return xScale(Object.values(d[x])); })
            // .attr("cy", function (d) { return yScale(Object.values(d[y])); })
            .attr("r", 5)
            .classed('bubbles', true);
        // .attr("class", "stateCircle");

        // console.log(svg.selectAll("text"));

        // Add Text
        var text = chart.selectAll("text")
            .data(data)
            .enter()
            .append("text");


        // var textLabels = text
        //                 .attr("x", function (d) { return  xScale(d[x]); } )
        //                 .attr("y", function (d) { return yScale(d[y] -.3); } )
        //                 .text(function (d) { return (d.abbr); } )
        //                 .attr("class", "stateText")
        //                 .attr("font-size", "10px");

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
        // Testing calc
        // group margin and label area translation - shift down by chart height vs svg height


        // set y to the y axis
        chart.append("g")
            .call(yAxis)
            .attr('class', 'yAxis')
        // Testing calc
        // .attr('transform', `translate(${margin + labelArea}, 0)`);

        // Y axis label
        var axisLabelX = chartWidth / 10;
        var axisLabelY = chartHeight / 2.5;

        svg.append('g')
            .attr("transform", `translate(${margin.l / 2 - 15} ${(svgHeight - margin.b) / 2})`)
            .append('text')
            // .attr("dy", "1em")
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(-90)')
            .text(y)
            .classed('axis', true)


        // .style('font-weight', 'bold');

        // X axis label
        var axisLabelX = chartHeight / 100;
        var axisLabelY = chartWidth / 2;

        svg.append("text")
            // .attr("text-anchor", "end")
            .attr("x", (svgWidth - (svgWidth - chartWidth)) / 2 + 20)
            .attr("y", svgHeight - margin.b / 2 - 10)
            .text(x)
            .classed('axis', true)
        // .style('font-weight', 'bold');


    });
};

// })
// .catch(function(error) {
//         // console.log(error);
// });
// };
