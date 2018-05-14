var chart = d3.select(".chart");

var bar = chart.selectAll("div");
var data = [{r:4,l:0}, {r:8,l:1}, {r:15,l:2}, {r:16,l:3}, {r:23,l:4}, {r:42,l:5}];

var barUpdate = bar.data(data);

var barEnter = barUpdate.enter().append("div");

barEnter.style("width", function(d) { return d.r * 10 + "px"; });

barEnter.style("margin-left", function(d) { return d.l * 10 + "px"; });
barEnter.text(function(d) { return d.r; });