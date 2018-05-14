var margin = { top: 20, right: 80, bottom: 30, left: 40 },
    width = 900 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleBand().range([height, 0]);

var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function render(data,chart) {
    var bar = chart.selectAll(".bar")
        .data(data,function(d) { return d ? d.name : this.getAttribute("id"); })

    bar.exit().remove();

    var rectBar = bar.enter()
        .append("rect")
        .attr("class", "bar")
        .merge(bar)
        .attr("x", function (d) { return x(d.min); })
        .attr("height", y.bandwidth())
        .attr("y", function (d) { return y(d.name); })
        .attr("width", function (d) { return x(d.max) - x(d.min); })
        .on("click", function(e, i){
            console.log(data,i)
            data.splice(i, 1);
            render(data,chart)
        })
    rectBar.append("text")
        .attr("class", "below")
        .attr("x", 12)
        .attr("dy", "1.2em")
        .text(function(d) { return d.name; })
        .style("fill", "#000000");
}

d3.json("static.json", (error, data) => {
    x.domain([0, d3.max(data.data, function (d) { return d.max; })]);
    y.domain(data.data.map(function (d) { return d.name; })).padding(0.6);

    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    chart.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));
    render(data.data,chart)
});

function type(d) {
    d.max = +d.frequency; // coerce to number
    return d;
}