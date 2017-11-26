


function rescale() {
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
	    });

	// rescale lowScore movie points
	svg.selectAll(".loser")
	   .transition()
	   .duration(1000)
	   .attr("cy", function(d, i) {
	    	return scaleSwitch == 0 ? nyscale(d["lowScore"] - d["mean"]) : pyscale(d["lowScore"]);
	   })

	// rescale other nominated movie points
	svg.selectAll(".other")
	   .transition()
	   .duration(1000)
	   .attr("cy", function(d, i) {
	   		return scaleSwitch == 0 ? nyscale(d[1]) : pyscale(d[0]);
	   });

	// hide rectangles
	svg.selectAll(".win-mean,.low-mean")
	   .transition()
	   .duration(1000)
	   .style("display", function(d) {
	   		return scaleSwitch == 0 ? "block" : "none";
	   });

	// hide ny-axis
	svg.select("#ny-axis")
	   .transition()
	   .duration(1000)
	   .style("opacity", function(d) {
	   		return scaleSwitch == 0 ? 1 : 0;
	   })

	// draw lines to connect winning movies
	var valueline = d3.line()
					  .x(function(d) { return x() })
					  .y(function(d) {});
}





