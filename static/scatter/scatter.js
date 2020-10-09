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

var chart = svg.append('g')
    .attr("transform", `translate(${margin.l} ${margin.t})`)
    .attr("width", chartWidth)
    .attr("height", chartHeight)

// Relative path for data origin 
var queryUrl = "/api/v1.0/Florida_data";

// Loads Scatter
scatter_plot(queryUrl)

// Function that populates the scatter plot
function scatter_plot(data_origin) {

    // Perform a GET request to the query URL
    d3.json(data_origin).then(function(data) {

        var x = 'median income (2018)';
        var y = 'death rate';

        // X and Y axis array extraction
        var xVals = Object.values(data).map(d => d[x]);
        var yVals = Object.values(data).map(d => d[y]);

        console.log(Array.isArray(xVals));
        console.log(xVals);

        // X and Y max/min values
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
            .attr("cx", function(d,i) { return xScale(d); })
            .attr("cy", function(d,i) { return yScale(yVals[i]); })
            .attr("r", 5)
            .classed('bubbles', true);

        // Add Text
        var text = chart.selectAll("text")
            .data(data)
            .enter()
            .append("text");

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

        // Y axis label
        var axisLabelX = chartWidth / 10;
        var axisLabelY = chartHeight / 2.5;

        svg.append('g')
            .attr("transform", `translate(${margin.l / 2 - 15} ${(svgHeight - margin.b) / 2})`)
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(-90)')
            .text(y)
            .classed('axis', true)

        // X axis label
        var axisLabelX = chartHeight / 100;
        var axisLabelY = chartWidth / 2;

        svg.append("text")
            .attr("x", (svgWidth - (svgWidth - chartWidth)) / 2 + 20)
            .attr("y", svgHeight - margin.b / 2 - 10)
            .text(x)
            .classed('axis', true)

// highlighting a circle
// potentially need to work on the regression line if

    });
};

// })
// .catch(function(error) {
//         // console.log(error);
// });
// };
