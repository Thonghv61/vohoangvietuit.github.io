var dataResult = [
    { label: "Part 1", value: 25},
    { label: "Part 2", value: 65},
    { label: "Part 3", value: 55},
    { label: "Part 4", value: 75},
    { label: "Part 5", value: 55},
    { label: "Part 6", value: 85},
    { label: "Part 7", value: 5},
];

//Info init radar chart
var infoRadarChart = {
    width: 800,
    height: 650,
    divId: "#chart_radar"
};

var titleChart = 'Show score each part toeic';

//Info for data visited
var dataReview = {
    groupName: "",
    skillName: "",
    value: 0
};

drawRadarChart(dataResult);

//Draw radar chart
function drawRadarChart(data) {
    // Drawing area and the margins and color sequence
    var margin = {
        top: 70,
        right: 20,
        bottom: 40,
        left: 40
    };
    w = infoRadarChart.width;
    h = infoRadarChart.height - margin.top - margin.bottom;
    var color = d3.scaleOrdinal(d3.schemeCategory20);

    // Define a specific area that can accommodate a circular shape (like Cartesian axis)
    var circleConstraint = d3.min([h, w]);

    var radius = d3.scaleLinear().range([0, (circleConstraint / 2)]);

    // find center of drawing area (center of radar)
    var centerXPos = w / 2 + margin.left;
    var centerYPos = h / 2 + margin.top;

    //reset
    d3.select(infoRadarChart.divId).html("");
    // draw root element <svg>
    var svg = d3.select(infoRadarChart.divId).append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 " + (w + margin.left + margin.right) + " " + (h + margin.top + margin.bottom))
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + centerXPos + "," + centerYPos + ")");

    // read data csv, verify value, find maximum value
    var maxValue = 0;
    data.forEach(function(d) {
        d.value = +d.value;
        if (d.value > maxValue)
            maxValue = d.value;
    });

    var topValue = 1.5 * maxValue;

    var ticks = [];
    for (i = 0; i < 5; i++) {
        ticks[i] = Math.round(topValue * i / 5 * 10) / 10;
    }
    radius.domain([0, topValue]);


    // Draw Circle of radar
    var circleAxes = svg.selectAll(".circle-ticks")
        .data(ticks)
        .enter().append("g")
        .attr("class", "circle-ticks");

    circleAxes.append("svg:circle")
        .attr("r", function(d) {
            return radius(d);
        })
        .attr("class", "circle")
        .style("stroke", "#9E9E9E")
        .style("fill", "none");

    circleAxes.append("svg:text")
        .attr("text-anchor", "start")
        .attr("dy", function(d) {
            return - radius(d) -2;
        })
        .attr("dx", 2)
        .text(String);

    // Draw line axe of radar
    var lineAxes = svg.selectAll(".line-ticks")
        .data(data)
        .enter().append("svg:g")
        .attr("transform", function(d, i) {
            return "rotate(" + ((i / data.length * 360) - 90) +
                ")translate(" + radius(topValue) + ")";
        })
        .attr("class", "line-ticks");

    lineAxes.append("svg:line")
        .attr("x2", -1 * radius(topValue))
        .style("stroke", "rgb(138, 138, 138)")
        .style("fill", "none");

    lineAxes.append("svg:text")
        .text(function(d) {
            return d.label;
        })
        .attr("text-anchor", "middle")
        .attr("transform", function(d, i) {
            return "rotate(" + (90 - (i * 360 / data.length)) + ")";
        });

    //
    var series = d3.keys(data[0])
        .filter(function(key) {
            return key !== "label";
        })
        .filter(function(key) {
            return key !== "";
        });

    color.domain(series);

    var lines = color.domain().map(function(name) {
        return (data.concat(data[0])).map(function(d) {
            return +d[name];
        });
    });
    console.log("lines :" + typeof(lines) + lines);

    var arrpoint = (data.concat(data[0])).map(function(d) {
            return d.value;
        });

    console.log("arrpoint :" + typeof(arrpoint) + arrpoint);

    //create the correct path element 
    var sets = svg.selectAll(".series")
        .data(series)
        .enter().append("g")
        .attr("class", "series");

    sets.append('svg:path')
        .data(lines)
        .attr("class", "line")
        .style('opacity', 0.8)
        .attr("d", d3.radialLine()
            .radius(function(d) {
                return radius(d);
            })
            .angle(function(d, i) {
                if (i == data.length) {
                    i = 0;
                } //close the line
                return (i / data.length) * 2 * Math.PI;
            }))
            .attr("animation", "bounceIn 2s")
        .data(series)
        .style("stroke-width", 3)
        .style("fill", "#F44336")
        .style("fill-opacity", 0.5)
        .style("stroke", "#F44336");



    //Points
    var points =  svg.selectAll(".group-points")
        .data(series)
        .enter().append("g")
        //.attr("transform", "translate(" + 40 + "," + 40 + ")")
        .attr("class", "group-points");

    //Tooltip
    var tooltip = points.append('text')
    .style('opacity', 0)
    .style('font-family', 'sans-serif')
    .style('font-size', 18);

    points.selectAll(".nodes")
        .data(arrpoint)
        .enter()
        .append("svg:circle")
        .attr("class", "nodes")
        .attr("r", 5)
        .attr("cx", function(d, i) {
            return radius(d) * Math.sin(i * 2 * Math.PI / data.length);
        })
        .attr("cy", function(d, i) {
            return radius(d) * -1 * Math.cos(i * 2 * Math.PI / data.length);
        })
        .style("fill", "#F44336")
        .style("fill-opacity", 0.8)
        .on('mouseover', function (d){
            d3.select(this)
            .style("fill-opacity", 1)

            newX =  parseFloat(d3.select(this).attr('cx')) - 10;
            newY =  parseFloat(d3.select(this).attr('cy')) - 5;
            
            tooltip.attr('x', newX)
            .attr('y', newY)
            .text(d)
            .transition(200)
            .style('opacity', 1);
        })
        .on('mouseout', function(){
            d3.select(this)
            .style("fill-opacity", 0.8)

            tooltip.transition(200)
            .style('opacity', 0);
        })
        .text(function (d) {
            return d;
        });

    // Create title radar chart
    var title = d3.select("svg").append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "title");

    title.append("text")
        .attr("class", "title-chart")
        .attr("x", (w / 2))
        .attr("y", -30)
        .attr("text-anchor", "middle")
        .attr("font-family","sans-serif")
        .style("fill", "")
        .text(function() {
            return titleChart;
        });
}

