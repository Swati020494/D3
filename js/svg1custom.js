// rs
$.getJSON("static.json", function(data) {
    var width = 420,
    barHeight = 20;
    console.log(data)
    var x = d3.scaleLinear()
        .domain([0, d3.max(data.numberData)])
        .range([0, width]);

    var chart = d3.select(".chart")
        .attr("width", width)
        .attr("height", barHeight * data.numberData.length);

    var bar = chart.selectAll("g")
        .data(data.numberData)
    .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

    bar.append("rect")
        .attr("width", x)
        .attr("height", barHeight - 1);

    bar.append("text")
        .attr("x", function(d) { return x(d) - 3; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d; });
});