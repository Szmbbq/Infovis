function firstDesign(dataset) {
    // extract year array
    years = Array.from(dataset, d => d["year"]);
    years.unshift("");

    // calculate stats
    minScore = d3.min(dataset, function(d) {
        return d["lowScore"];
    });

    differenceData = dataset.map(function(d) {
        return {
            "high-mean": d["highScore"] - d["mean"],
            "low-mean": d["lowScore"] - d["mean"],
            "mean": d["mean"]
        };
    });

    maxWinMeanDiff = d3.max(differenceData, function(d) {
        return d["high-mean"];
    });

    maxLowMeanDiff = d3.min(differenceData, function(d) {
        return d["low-mean"];
    });


    // setup scalers
    xscale = d3.scaleLinear()
        .domain([0, dataset.length])
        .range([0, width - 50]);

    pyscale = d3.scaleLinear()
        .domain([0, maxWinMeanDiff + 1])
        .range([height, 50]);

    nyscale = d3.scaleLinear()
        .domain([0, -maxWinMeanDiff - 1])
        .range([height, height + 250]);

    yscale = d3.scaleLinear()
        .domain([-maxWinMeanDiff, maxWinMeanDiff])
        .range([height + 250, height - 250]);

    // setup horizontal axis
    xaxis = d3.axisBottom(xscale)
        .tickValues(Array.from(new Array(dataset.length + 1), (val, index) => index))
        .tickFormat(function(d, i) {
            return years[i];
        });

    // draw x-axis
    svg.append("g")
        .attr("id", "x-axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(xaxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "1em");

    // setup vertical axis
    pyaxis = d3.axisRight(pyscale).ticks(6);
    nyaxis = d3.axisRight(nyscale).ticks(6);
    yaxis = d3.axisRight(yscale);

    // draw vertical axis
    svg.append("g")
        .attr("id", "py-axis")
        .call(pyaxis);
    svg.append("g")
        .attr("id", "ny-axis")
        .call(nyaxis);

    // draw high-mean differences
    svg.selectAll(".high-mean")
        .data(differenceData)
        .enter()
        .append("rect")
        .attr("class", "high-mean")
        .style("fill", "green")
        .attr("width", 2)
        .attr("x", function(d, i) {
            return xscale(i + 1);
        })
        .attr("y", function(d, i) {
            return pyscale(d["high-mean"]);
        })
        .attr("height", function(d, i) {
            return height - pyscale(d["high-mean"]);
        });

    // draw low-mean differences
    svg.selectAll(".low-mean")
        .data(differenceData)
        .enter()
        .append("rect")
        .attr("class", "low-mean")
        .style("fill", "pink")
        .attr("width", 2)
        .attr("x", function(d, i) {
            return xscale(i + 1);
        })
        .attr("y", height)
        .attr("height", function(d, i) {
            return nyscale(d["low-mean"]) - height;
        });

    // draw winning movies
    svg.selectAll(".winning")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("class", "winning")
        .style("fill", "red")
        .attr("r", 7)
        .attr("cx", function(d, i) {
            return xscale(i + 1) + 1;
        })
        .attr("cy", function(d, i) {
            if (d['year'] == "1985" || d['year'] == "1994") {
                console.log(d["winScore"], d["mean"])
            }
            return pyscale(d["winScore"] - d["mean"]);
        });

    // draw high score movies
    svg.selectAll(".highScore")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("class", "highScore")
        .style("fill", "orange")
        .attr("r", 5)
        .attr("cx", function(d, i) {
            return xscale(i + 1) + 1;
        })
        .attr("cy", function(d, i) {
            return nyscale(d["highScore"] - d["mean"]);
        });

    // draw low score movies
    svg.selectAll(".lowScore")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("class", "lowScore")
        .style("fill", "blue")
        .attr("r", 5)
        .attr("cx", function(d, i) {
            return xscale(i + 1) + 1;
        })
        .attr("cy", function(d, i) {
            return nyscale(d["lowScore"] - d["mean"]);
        });

    // draw other movies
    svg.selectAll(".others")
        .data(dataset)
        .enter()
        .each(function(d, i) {
            d3.select(this).selectAll(".others")
                .data(d["others"]).enter()
                .append("circle")
                .attr("class", "other")
                .style("fill", "navy")
                .attr("r", 3)
                .attr("cx", function(ele, j) {
                    return xscale(i + 1) + 1;
                })
                .attr("cy", function(ele) {
                    return nyscale(ele[1]);
                })
        });
}



function hideHighMean() {
    const opacity = document.getElementById("py-axis").style.opacity === "" ? 1 : document.getElementById("py-axis").style.opacity;
    // new opacity
    var newOpacity = opacity == 1 ? 0 : 1;

    // change opacity of py-axis
    svg.select("#py-axis")
        .transition()
        .duration(500)
        .style("opacity", newOpacity);

    // change text for the button
    document.getElementById("upperBtn").innerHTML = newOpacity === 1 ? "Observe the changing of mean-lowScore differences" : "Redo";

    // select win-mean rectangles and change opacity of win-mean rectangles
    svg.selectAll(".high-mean")
        .transition()
        .duration(500)
        .style("opacity", newOpacity);


    // select and change display of highScore movies
    svg.selectAll(".highScore")
        .transition()
        .duration(500)
        .style("opacity", newOpacity);

    // select and change display of other movies
    svg.selectAll(".other")
        .transition()
        .duration(500)
        .style("opacity", newOpacity);
}


function hideLowMean() {
    const opacity = document.getElementById("ny-axis").style.opacity === "" ? 1 : document.getElementById("ny-axis").style.opacity;
    // new opacity
    var newOpacity = opacity == 1 ? 0 : 1;

    // change opacity of ny-axis
    svg.select("#ny-axis")
        .transition()
        .duration(500)
        .style("opacity", newOpacity);

    // change text for the button
    document.getElementById("lowerBtn").innerHTML = newOpacity === 1 ? "Observe the changing of mean-lowScore differences" : "Redo";

    // select low-mean rectangles and change opacity of low-mean rectangles
    svg.selectAll(".low-mean")
        .transition()
        .duration(500)
        .style("opacity", newOpacity);

    // select and change display of lowScore movies
    svg.selectAll(".lowScore")
        .transition()
        .duration(500)
        .style("opacity", newOpacity);

    // select and change display of other movies
    svg.selectAll(".other")
        .transition()
        .duration(500)
        .style("opacity", newOpacity);
}


function rescale() {
    // check if dataset has been changed
    var newDataset = document.getElementById("dataset").value;
    if (newDataset != currentData) {
        currentData = newDataset;
        dataset = currentData == "actor" ? leading_actor : leading_actress;
        redraw(dataset);
    }

    var newMax = scaleSwitch == 0 ? 10 : maxWinMeanDiff + 1;
    var newMin = scaleSwitch == 0 ? minScore - 1 : 0;
    var numOfTicks = scaleSwitch == 0 ? 10 : 5;
    scaleSwitch = newMax == 10 ? 1 : 0;
    pyaxis = d3.axisRight(pyscale).ticks(numOfTicks);

    // rescale the positive yaxis
    pyscale.domain([newMin, newMax]);
    svg.select("#py-axis")
        .transition()
        .duration(1000)
        .call(pyaxis);

    // rescale winning movies points
    svg.selectAll(".winning")
        .transition()
        .duration(1000)
        .attr("cy", function(d, i) {
            return scaleSwitch == 0 ? pyscale(d["winScore"] - d["mean"]) : pyscale(d["winScore"]);
        })
        .on('start', function() {
            // remove the previous trend group every time rescaling
            svg.selectAll(".trendGroup")
                .transition()
                .delay((d, i) => i * 20)
                .remove();
        });

    // rescale highScore movie points
    svg.selectAll(".highScore")
        .transition()
        .duration(1000)
        .attr("cy", function(d, i) {
            return scaleSwitch == 0 ? pyscale(d["highScore"] - d["mean"]) : pyscale(d["highScore"]);
        });

    // rescale lowScore movie points
    svg.selectAll(".lowScore")
        .transition()
        .duration(1000)
        .attr("cy", function(d, i) {
            return scaleSwitch == 0 ? nyscale(d["lowScore"] - d["mean"]) : pyscale(d["lowScore"]);
        });

    // rescale other nominated movie points
    svg.selectAll(".other")
        .transition()
        .duration(1000)
        .attr("cy", function(d, i) {
            return scaleSwitch == 0 ? pyscale(d[1]) : pyscale(d[0]);
        });

    // hide rectangles
    svg.selectAll(".high-mean,.low-mean")
        .transition()
        .duration(500)
        .style("opacity", 0);


    // hide ny-axis
    svg.select("#ny-axis")
        .transition()
        .duration(1000)
        .style("opacity", function(d) {
            return scaleSwitch == 0 ? 1 : 0;
        }).on('end', function() {
            // after transition, redraw trendgroup;
            trendGroup();
        });

}

function trendGroup() {
    // this is how to get the coordinates
    // svg.selectAll(".highScore").each(function(d) {
    // 	console.log(d3.select(this).attr("cx"));
    // });

    // get the trendgroup display value
    const display = document.getElementById("trendGroup").value;

    // get the starting coodinates
    const x0 = [];
    const y0 = [];
    const y1 = [];
    const groupInfo = [];
    const maxWidth = width / years.length;
    svg.selectAll(".highScore").each(function(d) {
        x0.push(parseFloat(d3.select(this).attr("cx")));
    });
    svg.selectAll(".highScore").each(function(d) {
        y0.push(parseFloat(d3.select(this).attr("cy")));
    });
    svg.selectAll(".lowScore").each(function(d) {
        y1.push(parseFloat(d3.select(this).attr("cy")));
    });

    const interval = width / years.length - 1;

    for (let i = 0; i < x0.length; i++) {
        if (i == 0) {
            groupInfo.push({
                'x0': x0[i],
                'y0': y0[i],
                'deltaX': trendAlgo(interval / 2, Math.abs(y1[1] - y0[1] - y1[0] + y0[1])),
                'deltaY': y1[i] - y0[i],
                'year': years[i + 1]
            });
        } else if (i < x0.length - 1) {
            groupInfo.push({
                'x0': x0[i] - trendAlgo(interval / 2, Math.abs(y1[i] - y0[i] - y1[i - 1] + y0[i - 1])),
                'y0': y0[i],
                'deltaX': trendAlgo(interval / 2, Math.abs(y1[i] - y0[i] - y1[i - 1] + y0[i - 1])) + trendAlgo(interval / 2, Math.abs(y1[i + 1] - y0[i + 1] - y1[i] + y0[i])),
                'deltaY': y1[i] - y0[i],
                'year': years[i + 1]
            });
        } else {
            groupInfo.push({
                'x0': x0[i] - trendAlgo(interval / 2, Math.abs(y1[i] - y0[i] - y1[i - 1] + y0[i - 1])),
                'y0': y0[i],
                'deltaX': trendAlgo(interval / 2, Math.abs(y1[i] - y0[i] - y1[i - 1] + y0[i - 1])),
                'deltaY': y1[i] - y0[i],
                'year': years[i + 1]
            });
        }
    }

    const maxDeltaX = d3.max(groupInfo, function(d) {
        return d["deltaX"];
    });

    const meanDeltaX = d3.mean(groupInfo, function(d) {
        return d["deltaX"];
    })

    svg.selectAll(".trendGroups")
        .data(groupInfo)
        .enter()
        .append("rect")
        .transition()
        .delay((d, i) => i * 20)
        .attr("class", "trendGroup")
        .attr("display", display)
        .style("fill", "indigo")
        .style("opacity", d => sigmoid(sigmoid(d['deltaX'] - meanDeltaX)))
        .attr("width", d => d['deltaX'])
        .attr("x", d => d['x0'])
        .attr("y", d => d['y0'])
        .attr("rx", d => d['deltaX'] / 3)
        .attr("ry", d => d['deltaX'] / 3)
        .attr("height", (d, i) => d['deltaY']);


}


function update() {
    // check if dataset has been changed
    var newDataset = document.getElementById("dataset").value;
    if (newDataset != currentData) {
        currentData = newDataset;
        dataset = currentData == "actor" ? leading_actor : leading_actress;
        redraw(dataset);
    }
    // get opacity value for winning movies
    var newOpacity = document.getElementById("winner").value;
    // update display of winner movies
    svg.selectAll(".winning")
        .transition()
        .duration(500)
        .style("opacity", newOpacity);

    // get opacity value for high scores
    newOpacity = document.getElementById("highScores").value
    // update display of high scores
    svg.selectAll(".highScore")
        .transition()
        .duration(500)
        .style("opacity", newOpacity);

    // get opacity value for low scores
    newOpacity = document.getElementById("lowScores").value
    // update display of high scores
    svg.selectAll(".lowScore")
        .transition()
        .duration(500)
        .style("opacity", newOpacity);

    // get opacity value for other movies
    newOpacity = document.getElementById("others").value
    // update display of high scores
    svg.selectAll(".other")
        .transition()
        .duration(500)
        .style("opacity", newOpacity);

    // get opacity value for high-mean diff rects
    newOpacity = document.getElementById("HMDiff").value
    // update display of high scores
    svg.selectAll(".high-mean")
        .transition()
        .duration(500)
        .style("opacity", newOpacity);

    // get opacity value for low-mean diff rects
    newOpacity = document.getElementById("LMDiff").value
    // update display of high scores
    svg.selectAll(".low-mean")
        .transition()
        .duration(500)
        .style("opacity", newOpacity);

    // get display value for group trend
    var newDisplay = document.getElementById("trendGroup").value;
    // update display of group trend
    svg.selectAll(".trendGroup")
        .transition()
        .delay((d, i) => i * 20)
        .attr("display", newDisplay);
}


function trendAlgo(c, t) {
    return (c - 1) * Math.pow(Math.E, -0.03 * t) + 1;
}

function sigmoid(t) {
    return 1 / (1 + Math.pow(Math.E, -t));
}

function changeScale() {
    rescale();
}

function redraw(dataset) {
    // remove all elements in the svg
    d3.select("svg").selectAll("*")
        .remove();

    // redraw
    firstDesign(dataset);
}
