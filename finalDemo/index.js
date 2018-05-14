var margin = {top: 20, right: 80, bottom: 30, left: 40},
width = 900 - margin.left - margin.right,
height = 800 - margin.top - margin.bottom;
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleBand().range([height, 0]);

var chart = d3.select(".chart")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");



d3.json("static.json", (error, data) =>{
    // y.domain(data.data.map(function(d) { return d.name; }));
    // x.domain([0, d3.max(data.data, function(d) { return d.value; })]);

    x.domain([0, d3.max(data.data, function(d) { return d.value; })]);
    y.domain(data.data.map(function(d) { return d.name; })).padding(0.6);

    chart.append("g")
        .attr("class", "x axis")
       	.attr("transform", "translate(0," + height + ")")
      	.call(d3.axisBottom(x));

    chart.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));


    chart.selectAll(".bar")
        .data(data.data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", data.left)
        .attr("height", y.bandwidth())
        .attr("y", function(d) { return y(d.name); })
        .attr("width", function(d) { return x(d.value); })
        // .attr("margin-left", function(d) { return d.left+ "px"; })
});

function type(d) {
    d.value = +d.frequency; // coerce to number
    return d;
}