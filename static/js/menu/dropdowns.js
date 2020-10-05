

// let state_abbrevs = console.log(states.map(row => row.abbreviation))

d3.select("#state-dropdown")
  .selectAll("option")
  .data(states)
  .enter()
  .append("option")
    .attr("value", d=> d.abbreviation)
    .text(d=>d.abbreviation)

    document.getElementById("state-dropdown").selectedIndex = 11;

console.log("Hello World")