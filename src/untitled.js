var fs = require("fs");

const leading_actor_dataset = [];
const leading_actress_dataset = [];
const supporting_actor_dataset = [];
const supporting_actress_dataset = [];


// // year labels
// var years;

// // calculate stats
// var differenceData, maxWinMeanDiff, maxLowMeanDiff;


d3.csv("./data/result.csv", function(data) {
	data.forEach(function(d) {
		if(d['award'] == 'Actor' || d['award'] == 'Actor in a Leading Role') {
			// if that year already in dataset
			if(leading_actor_dataset[d['year']]) {
				// is this movie a winning movie?
				if(d['winner'] == '1') {
					leading_actor_dataset[d['year']]['winScore'] = parseFloat(d['vote_average']);
				} else {
					leading_actor_dataset[d['year']]['others'].push([parseFloat(d['vote_average'])]);
				}
				// update lowScore
				if(d['vote_average'] < leading_actor_dataset[d['year']]['lowScore']) {
					var temp = leading_actor_dataset[d['year']]['lowScore'];
					leading_actor_dataset[d['year']]['lowScore'] = parseFloat(d['vote_average']);
					leading_actor_dataset[d['year']]['others'].push([temp]);
				} else {
					leading_actor_dataset[d['year']]['others'].push([parseFloat(d['vote_average']), 0]);
				}
				// update the totalScore
				leading_actor_dataset[d['year']]['totalScore'] += parseFloat(d['vote_average']);
				// update the number of movies
				leading_actor_dataset[d['year']]['nbOfMovies'] += 1;
				// update the mean
				leading_actor_dataset[d['year']]['mean'] = leading_actor_dataset[d['year']]['totalScore']/leading_actor_dataset[d['year']]['nbOfMovies'];
				// update the difference
				leading_actor_dataset[d['year']]['others'].forEach(function(ele) {
					ele[1] = ele[0] - leading_actor_dataset[d['year']]['mean'];
				});
			} else {
				leading_actor_dataset[d['year']] = {};
				// initialize field totalScore, nbOfMovies, and others
				leading_actor_dataset[d['year']]['totalScore'] = 0;
				leading_actor_dataset[d['year']]['nbOfMovies'] = 0;
				leading_actor_dataset[d['year']]['others'] = [];
				// is this movie a winning movie?
				if(d['winner'] == '1') {
					leading_actor_dataset[d['year']]['winScore'] = parseFloat(d['vote_average']);
				} else {
					leading_actor_dataset[d['year']]['others'].push([parseFloat(d['vote_average'])]);
				}
				// set the current lowScore
				leading_actor_dataset[d['year']]['lowScore'] = parseFloat(d['vote_average']);
				// update the totalScore
				leading_actor_dataset[d['year']]['totalScore'] += parseFloat(d['vote_average']);
				// update number of movies
				leading_actor_dataset[d['year']]['nbOfMovies'] += 1;
				// update the mean
				leading_actor_dataset[d['year']]['mean'] = leading_actor_dataset[d['year']]['totalScore']/leading_actor_dataset[d['year']]['nbOfMovies'];
				// update the difference
				leading_actor_dataset[d['year']]['others'].forEach(function(ele) {
					var score = ele[0];
					ele.push(score - leading_actor_dataset[d['year']]['mean']);
				});
			}
		}
	});
	console.log(leading_actor_dataset)
});


