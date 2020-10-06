// Define SVG area dimensions
var svgWidth = parseInt(d3.select('#d3-scatter').style('width'));
var svgHeight = svgWidth - (svgWidth/3.9);
var margin =  0;
var pad = 40;
var labelArea = 110;

// Define dimensions of the chart area
var chartWidth = svgWidth - (margin * 2);
var chartHeight = svgHeight - (margin * 2);

// append the svg object to the body of the page
var svg = d3.select("#d3-scatter")
    .append("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight)


// // Load data 
var queryUrl = "http://project-2-covid.herokuapp.com/api/v1.0/Florida_data";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {

// d3.csv("static/data/fl_data.csv").then(function(data) {
    console.log(data);
    
    // X and Y Axis Max/Min Values
    var xValMax = d3.max(data.map(d => d['median income 2018']))*1.10;
    var xValMin = d3.min(data.map(d => d['median income 2018']))*0.90;
    var yValMax = d3.max(data.map(d => parseFloat(d['deaths'])))*1.10;
    var yValMin = d3.min(data.map(d => parseFloat(d['deaths'])))*0.90;
    
    // Add X axis
    var xScale = d3.scaleLinear()
        .domain([xValMin, xValMax])
        .range([ margin + labelArea, svgWidth - margin ]);

    // Add Y axis
    var yScale = d3.scaleLinear()
        .domain([yValMin, yValMax])
        .range([ svgHeight - margin - labelArea, margin]);

    // Add dots
    svg.append('g')
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d.poverty) ; } )
        .attr("cy", function (d) { return yScale(d.healthcare); } )
        .attr("r", 10)
        .attr("class", "stateCircle");
    
        console.log(svg.selectAll("text"));
        
        // Add Text
    var text = svg.selectAll("text")
                .data(data)
                .enter()
                .append("text");
    
                
    var textLabels = text
                    .attr("x", function (d) { return  xScale(d.poverty); } )
                    .attr("y", function (d) { return yScale(d.healthcare -.3); } )
                    .text(function (d) { return (d.abbr); } )
                    .attr("class", "stateText")
                    .attr("font-size", "10px");

    // Create axes
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

    // Set x to the bottom of the chart
    svg.append("g")
    .call(xAxis)
    .attr('class','xAxis')
    .attr("transform", `translate(0, ${svgHeight - margin - labelArea})`);

    // set y to the y axis
    svg.append("g")
    .call(yAxis)
    .attr('class','yAxis')
    .attr('transform', `translate(${margin + labelArea}, 0)`);

    // Y axis label
    var axisLabelX = chartWidth/10;
    var axisLabelY = chartHeight / 2.5;
    
    svg.append('g')
        .attr('transform', 'translate(' + axisLabelX + ', ' + axisLabelY + ')')
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .text('Lacks Healthcare (%)')
        .style('font-weight', 'bold');
    
    // X axis label
    var axisLabelX = chartHeight/100;
    var axisLabelY = chartWidth / 2;
    
    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", chartWidth -(chartWidth/2.9))
    .attr("y", chartHeight- (chartHeight/12))
    .text("In Poverty (%)")
    .style('font-weight', 'bold');

}).catch(function(error) {
        // console.log(error);
});
