//Info init radar chart
var infoRadarChart = {
    width: 800,
    height: 700,
    divId: "#chart-radar"
};

var titleChart = {
    drillLevel0: "Show percent each group in company",
    drillLevel1: "Average point in group",
    drillLevel2: "Employee",
}

//Info for data visited
var dataReview = {
    groupName: "",
    skillName: "",
    value: 0
};

//level drill down
var drillDownLevel = 0;

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
    console.log("width vs height  is " + w, h);
    var color = d3.scaleOrdinal(d3.schemeCategory20);


    // Define a specific area that can accommodate a circular shape (like Cartesian axis)
    var circleConstraint = d3.min([h, w]);
    console.log("circleConstraint  is:" + circleConstraint);
    var radius = d3.scaleLinear().range([0, (circleConstraint / 2)]);
    console.log("radius " + radius);

    // find center of drawing area (center of radar)
    var centerXPos = w / 2 + margin.left;
    var centerYPos = h / 2 + margin.top;
    console.log("centerXPos is " + centerXPos + " centerYPos is " + centerYPos);

    //reset
    d3.select(infoRadarChart.divId).html("");
    // draw root element <svg>
    var svg = d3.select(infoRadarChart.divId).append("svg")
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
    console.log("data " + data);

    var topValue = 1.5 * maxValue;

    console.log("topValue " + topValue);

    var ticks = [];
    for (i = 0; i < 5; i++) {
        ticks[i] = Math.round(topValue * i / 5 * 10) / 10;
    }
    console.log("ticks: " + ticks);
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
        .style("stroke", "#CCC")
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
        })
        .on("click", function(d){
            drillDownLevel++;
            hiddenBtn();
            switch(drillDownLevel) {
                case 1: 
                    drillLevel1(d.label);
                    dataReview.groupName = d.label;
                    break;
                case 2:
                    drillLevel2(dataReview.groupName, d.label, d.value);
                    dataReview.skillName = d.label;
                    dataReview.value = d.value;
                    break;
                default: break;
            }
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
                console.log("radius path: " + d)
                return radius(d);
            })
            .angle(function(d, i) {
                if (i == data.length) {
                    i = 0;
                } //close the line
                return (i / data.length) * 2 * Math.PI;
            }))
        .data(series)
        .style("stroke-width", 3)
        .style("fill", function(d, i) {  
            return color(i);
        })
        .style("fill-opacity", 0.2)

        .style("stroke", function(d, i) {
            return color(i);
        });



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
        .style("fill", "rgb(153, 191, 241)")
        .on('mouseover', function (d){
            d3.select(this)
                .style("fill", "rgb(69, 144, 243)");

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
                .style("fill", "rgb(153, 191, 241)");

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
        .style("font-size", "22px")
        .text(function() {
            switch(drillDownLevel) {
                case 0:
                    return titleChart.drillLevel0;
                    break;
                case 1:
                    return titleChart.drillLevel1;
                    break;
                default:
                    return "";
                    break;
            }
        });
}

// Draw Table details
function printTable(group, skill, value) {
    console.log("print table");
    document.getElementById("chart-radar").innerHTML = "";
    var thtml = "<h1 class='title-chart'>" + titleChart.drillLevel2 + "</h1>";
    thtml += "<table><tr><th>" + "ID"+ "</th><th>" + "Name" + "</th><th>" + "Group "+ "</th><th> "+ skill + "</th></tr>";
    var i;
    for (i in resultData) {
        if(resultData[i].group == group && resultData[i].skills[skill] >= value) {
            thtml += "<tr><td>" + resultData[i].id + "</td><td>" + resultData[i].name + "</td><td> " + resultData[i].group + "</td><td>" + resultData[i].skills[skill]+ "</td></tr>";       
        }
    }
    var x = document.
    thtml += '</table>';
    document.getElementById("chart-radar").innerHTML = thtml;
}

//Function for drill down event
function drillLevel0() {
    var dataGroup = calculateDataGroup(resultData);
    console.log(dataGroup);
    drawRadarChart(dataGroup);
}
function drillLevel1(group) {
    var dataSkill = calculateDataSkill(group, resultData);
    console.log(dataSkill);
    drawRadarChart(dataSkill);
}
function drillLevel2(group, skill, value) {
    printTable(group, skill, value);
}

//For back drill down
function backDrill() {
    if (drillDownLevel < 0) {
        drillDownLevel = 0;
        return;
    }
    drillDownLevel--;

    switch(drillDownLevel) {
        case 0: 
            drillLevel0();
            break;
        case 1: 
            drillLevel1(dataReview.groupName);
            break;
        case 2:
            drillLevel2(dataReview.groupName, dataReview.skillName, dataReview.value);
            break;
        default: break;
    }
}