// Define SVG area dimensions
var svgWidth = parseInt(d3.select('#d3-scatter').style('width'));
var svgHeight = 400;
var hHeight = parseInt(d3.select('#scatter-title-height').style('height'));
var margin = { t: 10, r: 30, b: 80, l: 120 }

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.l - margin.r;
var chartHeight = svgHeight - hHeight - margin.t - margin.b;

// Relative path for data origin 
var queryUrl = "/api/v1.0/Florida_data";

// Initial X and Y params
var chosenXAxis = 'population';
var chosenYAxis = 'death rate';

// Tooltips
// Step 1: Append tooltip div
var toolTip = d3.select('#d3-scatter')
    .append("div")
    .style("display", "none")
    // .html("<h1>hello</h1>")
    .attr("class", "tooltip");
    // .classed("tooltip", true);

// Function that populates the scatter plot
function scatter_plot(data_origin, chosenXAxis, chosenYAxis) {

    d3.select("#d3-scatter").select('svg').remove()

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


    // Perform a GET request to the query URL
    d3.json(data_origin).then(function (data) {

        // X and Y axis array extraction
        xVals = Object.values(data).map(d => d[chosenXAxis]);
        yVals = Object.values(data).map(d => d[chosenYAxis]);
        countyList = Object.values(data).map(d => d.county);

        // X and Y max/min values
        var xValMax = d3.max(xVals) * 1.10;
        var xValMin = d3.min(xVals) * 0.90;
        var yValMax = d3.max(yVals) * 1.10;
        var yValMin = d3.min(yVals) * 0.90;

        // Add X axis
        xScale = d3.scaleLinear()
            .domain([xValMin, xValMax])
            .range([0, chartWidth])

        // Add Y axis
        yScale = d3.scaleLinear()
            .domain([yValMin, yValMax])
            .range([chartHeight, 0]);

        // Pull county information from dropdown
        selectedCounty = document.getElementById("county-dropdown").value;


        // Add dots
        circlesGroup = chart.html('')
            .append('g')
            .selectAll("circle")
            .data(xVals)
            .enter()
            .append("circle")
            .attr('x-data-value', (d,i) =>d) 
            .attr('y-data-value', (d,i) => yVals[i]) 
            .attr("cx", (d, i) => xScale(d))
            .attr("cy", (d, i) => { 
                // console.log(yVals[i])
                return yScale(yVals[i]) * .95 
        } )
            .attr("r", 5)  
            .attr("class", false)
            .attr("class", (d, i) => countyList[i] == selectedCounty ? "highlight" : "bubbles")

        circlesGroup.on("mouseover", function () {
            toolTip.style("display", "block");
            toolTip.html(`<table>
                        <tr>
                        <td class="scatterLabel">${chosenXAxis}</td>
                        <td class="scatterDatum"> ${d3.select(this).attr('x-data-value')}</td>
                        </tr>
                        <tr>
                        <td class="scatterLabel">${chosenYAxis}</td>
                        <td class="scatterDatum">${d3.select(this).attr('y-data-value')}</td>
                        </tr>
                        </table>
                        <hr>`)
                // .style("left", d3.event.pageX + "px")
                // .style("top", d3.event.pageY + "px");
            // cx+3
        });

        circlesGroup.on("mouseout", function () {
                toolTip.style("display", "none");
            });


        // Create axes
        var yAxis = d3.axisLeft(yScale);
        if (chosenXAxis == "median income (2018)") {
            var xAxis = d3.axisBottom(xScale)
                .ticks(4)
                .tickFormat(d => '$' + d3.format(',')(d))
        } else {
            var xAxis = d3.axisBottom(xScale)
                .ticks(5)
        }


        // Set X to the bottom of the chart
        chart.append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(xAxis)
            .attr('class', 'xAxis')

        // Set Y to the Y axis
        chart.append("g")
            .call(yAxis)
            .attr('class', 'yAxis')

        // Linear regression
        var dataLinear = []
        xVals.forEach(function (v, i) {
            dataLinear.push({ 'x': v, 'y': yVals[i] })
        });

        var linearRegression = d3.regressionLinear()
            .x(d => d.x)
            .y(d => d.y)
            .domain([xValMin + 3000, xValMax - 10000]);



        chart.append('g')
            .attr('transform', `translate(${chartWidth - 150} 50)`)
            .append('text')
            .attr('x', 0)
            .attr('y', 0)
            .classed('legend', true)
            .text(`r = ${(linearRegression(dataLinear).a < 0) ? -Math.sqrt(linearRegression(dataLinear).rSquared).toFixed(2) : Math.sqrt(linearRegression(dataLinear).rSquared).toFixed(2)}`)
            .append('svg:tspan')
            .attr('x', 0)
            .attr('dy', 20)
            .classed('legend', true)
            .text(`R^2 = ${linearRegression(dataLinear).rSquared.toFixed(2)}`)

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
        // Linear regression end

        // Y axis label
        var axisLabelX = chartWidth / 10;
        var axisLabelY = chartHeight / 2.5;
        svg.append('g')
            .attr("transform", `translate(${margin.l / 2 - 15} ${(svgHeight - margin.b) / 2})`)
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(-90)')
            .text(chosenYAxis)
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


// Load Scatter
scatter_plot(queryUrl, chosenXAxis, chosenYAxis);