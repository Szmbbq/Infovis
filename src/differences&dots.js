// setup axes
var xscale = d3.scaleLinear()
      .domain([0, dataset.length])
      .range([0, width - 50]);


var pyscale = d3.scaleLinear()
            .domain([0, maxWinMeanDiff + 1])
            .range([height, 50]);

var nyscale = d3.scaleLinear()
            .domain([0, -maxWinMeanDiff - 1])
            .range([height, height + 250]);

var yscale = d3.scaleLinear()
		   .domain([-maxWinMeanDiff, maxWinMeanDiff])
		   .range([height + 250, height - 250]);

// create svg tag
var svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", 2 * height);

// create horizontal axis
var xaxis = d3.axisBottom(xscale)
		  .tickValues(Array.from(new Array(dataset.length + 1),(val,index)=>index))
		  .tickFormat(function(d, i) { return years[i]; });
// add x-axis
svg.append("g")
	.attr("id", "x-axis")
	.attr("transform", "translate(0, " + height + ")")
	.call(xaxis)
	.selectAll("text")	
	.style("text-anchor", "end")
	.attr("dx", "3em");


// create vertical axis
var pyaxis = d3.axisRight(pyscale).ticks(6);
var nyaxis = d3.axisRight(nyscale).ticks(6);
var yaxis = d3.axisRight(yscale);

// draw vertical axis	
svg.append("g")
	.attr("id", "py-axis")
	.call(pyaxis);
	svg.append("g")
	.attr("id", "ny-axis")
	.call(nyaxis);


// draw win-mean differences
svg.selectAll(".win-mean")
	.data(differenceData)
	.enter()
	.append("rect")
	.attr("class", "win-mean")
	.style("fill", "green")
	.attr("width", 2)
	.attr("x", function(d, i) {
	   return xscale(i + 1);
	})
	.attr("y", function(d, i) {
	   return pyscale(d["win-mean"]);
	})
	.attr("height", function(d, i) {
		console.log(d["win-mean"]);
	   return height - pyscale(d["win-mean"]);
	});


// draw low-mean differences
svg.selectAll(".low-mean")
	.data(differenceData)
	.enter()
	.append("rect")
	.attr("class", "low-mean")
	.style("fill", "red")
	.attr("width", 2)
	.attr("x", function(d, i) {
	   return xscale(i + 1);
	})
	.attr("y", height)
	.attr("height", function(d, i) {
	   return nyscale(d["low-mean"])-height;
	})


// draw winning movies
svg.selectAll(".winning")
	.data(dataset)
	.enter()
	.append("circle")
	.attr("class", "winning")
	.style("fill", "blue")
	.attr("r", 3)
	.attr("cx", function(d, i) { return xscale(i + 1) + 1; })
	.attr("cy", function(d, i) { return pyscale(d["winScore"] - d["mean"]); });


// draw low score movies
svg.selectAll(".loser")
	.data(dataset)
	.enter()
	.append("circle")
	.attr("class", "loser")
	.style("fill", "yellow")
	.attr("r", 3)
	.attr("cx", function(d, i) { return xscale(i + 1) + 1; })
	.attr("cy", function(d, i) { return nyscale(d["lowScore"] - d["mean"]); });


/// draw other movies
svg.selectAll(".others")
   .data(dataset)
   .enter()
   .each(function(d, i) {
		d3.select(this).selectAll(".others")
		  .data(d["others"]).enter()
		  .append("circle")
		  .attr("class", "other")
		  .attr("r", 3)
		  .attr("cx", function(ele) { return xscale(i + 1) + 1; })
		  .attr("cy", function(ele) { return nyscale(ele[1]); })
})


function hideWinMean() {
	const opacity = document.getElementById("py-axis").style.opacity === "" ? 1 : document.getElementById("py-axis").style.opacity;
	// new opacity
	var newOpacity = opacity == 1 ? 0 : 1;

	// change opacity of py-axis
	document.getElementById("py-axis").style.opacity = newOpacity

	// change text for the button
	document.getElementById("upperBtn").innerHTML = newOpacity === 1 ? "Hide winner mean difference" : "Show winner mean difference";

	// select win-mean rectangles
	var win_mean = document.getElementsByClassName("win-mean");
	// change opacity of win-mean rectangles
	Array.from(win_mean).forEach(function(d) {
		d.style.display = d.style.display === "none" ? "block" : "none";
	});

	// select and change display of winning movies
	var winnings = document.getElementsByClassName("winning");
	Array.from(winnings).forEach(function(d) {
		d.style.display = d.style.display === "none" ? "block" : "none";
	})

	// select and change display of other movies
	var others = document.getElementsByClassName("other");
	Array.from(others).forEach(function(d) {
		d.style.display = d.style.display === "none" ? "block" : "none";
	});
}

function hideLowMean() {
	const opacity = document.getElementById("ny-axis").style.opacity === "" ? 1 : document.getElementById("ny-axis").style.opacity;
	// new opacity
	var newOpacity = opacity == 1 ? 0 : 1;

	// change opacity of py-axis
	document.getElementById("ny-axis").style.opacity = newOpacity

	// change text for the button
	document.getElementById("lowerBtn").innerHTML = newOpacity === 1 ? "Hide lowest mean difference" : "Show lowest mean difference";

	// select and change low mean rectangles
	var low_mean = document.getElementsByClassName("low-mean");
	Array.from(low_mean).forEach(function(d) {
		d.style.display = d.style.display === "none" ? "block" : "none";
	});

	// select and change display of lowscore
	var lowScores = document.getElementsByClassName("loser");
	Array.from(lowScores).forEach(function(d) {
		d.style.display = d.style.display === "none" ? "block" : "none";
	});

	// selct and change display of other movies
	var others = document.getElementsByClassName("other");
	Array.from(others).forEach(function(d) {
		d.style.display = d.style.display === "none" ? "block" : "none";
	});
}