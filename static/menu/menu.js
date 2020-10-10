
anime({
  targets: 'h1',
  rotate: '1turn',
  backgroundColor: 'grey',
  duration: 800,
  scale: [
    {value: .1, easing: 'easeOutSine', duration: 500},
    {value: 1, easing: 'easeInOutQuad', duration: 1200}
  ],
  delay: anime.stagger(200, {grid: [14, 5], from: 'center'})
});

d3.select("#state-dropdown")
.selectAll("option")
.data(states)
.enter()
.append("option")
  .attr("value", d=> d.abbreviation)
  .text(d=>d.abbreviation)

// Setting dropdown to Florida to start    
document.getElementById("state-dropdown").selectedIndex = 11;

d3.json("/api/v1.0/Florida_data").then(flData => {

let counties = Object.values(flData).map(d=>d.county)

d3.select('#county-dropdown')
  .selectAll("option")
  .data(counties)
  .enter()
  .append("option")
    .attr("value", d=>d)
    .text(d=>d)

})

d3.select('#county-dropdown')
.on("change", function () { 
  var county = document.getElementById("county-dropdown").value
  d3.json(`/api/v1.0/Florida_data/${county}`).then(data => {
    console.log(data)
  })
  makePlotlyChart();
  scatter_plot(queryUrl);
})