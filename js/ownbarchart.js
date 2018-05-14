var data = [4, 8, 15, 16, 23, 42];

d3.select(".chart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { console.log( d * 10 + "px");
        return d * 10 + "px";
     })
    .text(function(d) { console.log( d ); return d; });