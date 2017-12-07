function dataProcessing(data) {
    data.forEach(function(d) {
        if (d['award'] == 'Actor' || d['award'] == 'Actor in a Leading Role') {
            // if that year already in dataset
            if (leading_actor_dataset[d['year']]) {
                // is this movie a winning movie?
                if (d['winner'] == '1') {
                    leading_actor_dataset[d['year']]['winScore'] = parseFloat(d['vote_average']);
                }
                if (d['vote_average'] < leading_actor_dataset[d['year']]['lowScore']) {
                    if (d['year'] == '1987') {
                        console.log("1");
                    }
                    var temp = leading_actor_dataset[d['year']]['lowScore'];
                    leading_actor_dataset[d['year']]['lowScore'] = parseFloat(d['vote_average']);
                    leading_actor_dataset[d['year']]['others'].push([temp]);
                } else if (d['vote_average'] > leading_actor_dataset[d['year']]['highScore']) {
                    var temp = leading_actor_dataset[d['year']]['highScore'];
                    leading_actor_dataset[d['year']]['highScore'] = parseFloat(d['vote_average']);
                    // if nbOfMovies is 1 just modify the highScore, no need to push
                    if (leading_actor_dataset[d['year']]['nbOfMovies'] > 1) {
                        leading_actor_dataset[d['year']]['others'].push([temp]);
                    }
                } else {
                    leading_actor_dataset[d['year']]['others'].push([parseFloat(d['vote_average']), 0]);
                }
                // update the totalScore
                leading_actor_dataset[d['year']]['totalScore'] += parseFloat(d['vote_average']);
                // update the number of movies
                leading_actor_dataset[d['year']]['nbOfMovies'] += 1;
                // update the mean
                leading_actor_dataset[d['year']]['mean'] = leading_actor_dataset[d['year']]['totalScore'] / leading_actor_dataset[d['year']]['nbOfMovies'];
                // update the difference
                leading_actor_dataset[d['year']]['others'].forEach(function(ele) {
                    ele[1] = ele[0] - leading_actor_dataset[d['year']]['mean'];
                });
            } else {
                leading_actor_dataset[d['year']] = {};
                // add the year field
                leading_actor_dataset[d['year']]['year'] = d['year'];
                // initialize field totalScore, nbOfMovies, and others
                leading_actor_dataset[d['year']]['totalScore'] = 0;
                leading_actor_dataset[d['year']]['nbOfMovies'] = 0;
                leading_actor_dataset[d['year']]['others'] = [];
                // is this movie a winning movie?
                if (d['winner'] == '1') {
                    leading_actor_dataset[d['year']]['winScore'] = parseFloat(d['vote_average']);
                }
                // set the current lowScore
                leading_actor_dataset[d['year']]['lowScore'] = parseFloat(d['vote_average']);
                // set the current highScore
                leading_actor_dataset[d['year']]['highScore'] = parseFloat(d['vote_average']);
                // update the totalScore
                leading_actor_dataset[d['year']]['totalScore'] += parseFloat(d['vote_average']);
                // update number of movies
                leading_actor_dataset[d['year']]['nbOfMovies'] += 1;
                // update the mean
                leading_actor_dataset[d['year']]['mean'] = leading_actor_dataset[d['year']]['totalScore'] / leading_actor_dataset[d['year']]['nbOfMovies'];
            }
        }
    });


    data.forEach(function(d) {
        if (d['award'] == 'Actress' || d['award'] == 'Actress in a Leading Role') {
            // if that year already in dataset
            if (leading_actress_dataset[d['year']]) {
                // is this movie a winning movie?
                if (d['winner'] == '1') {
                    leading_actress_dataset[d['year']]['winScore'] = parseFloat(d['vote_average']);
                }
                if (d['vote_average'] < leading_actress_dataset[d['year']]['lowScore']) {
                    if (d['year'] == '1987') {
                        console.log("1");
                    }
                    var temp = leading_actress_dataset[d['year']]['lowScore'];
                    leading_actress_dataset[d['year']]['lowScore'] = parseFloat(d['vote_average']);
                    leading_actress_dataset[d['year']]['others'].push([temp]);
                } else if (d['vote_average'] > leading_actress_dataset[d['year']]['highScore']) {
                    var temp = leading_actress_dataset[d['year']]['highScore'];
                    leading_actress_dataset[d['year']]['highScore'] = parseFloat(d['vote_average']);
                    // if nbOfMovies is 1 just modify the highScore, no need to push
                    if (leading_actress_dataset[d['year']]['nbOfMovies'] > 1) {
                        leading_actress_dataset[d['year']]['others'].push([temp]);
                    }
                } else {
                    leading_actress_dataset[d['year']]['others'].push([parseFloat(d['vote_average']), 0]);
                }
                // update the totalScore
                leading_actress_dataset[d['year']]['totalScore'] += parseFloat(d['vote_average']);
                // update the number of movies
                leading_actress_dataset[d['year']]['nbOfMovies'] += 1;
                // update the mean
                leading_actress_dataset[d['year']]['mean'] = leading_actress_dataset[d['year']]['totalScore'] / leading_actress_dataset[d['year']]['nbOfMovies'];
                // update the difference
                leading_actress_dataset[d['year']]['others'].forEach(function(ele) {
                    ele[1] = ele[0] - leading_actress_dataset[d['year']]['mean'];
                });
            } else {
                leading_actress_dataset[d['year']] = {};
                // add the year field
                leading_actress_dataset[d['year']]['year'] = d['year'];
                // initialize field totalScore, nbOfMovies, and others
                leading_actress_dataset[d['year']]['totalScore'] = 0;
                leading_actress_dataset[d['year']]['nbOfMovies'] = 0;
                leading_actress_dataset[d['year']]['others'] = [];
                // is this movie a winning movie?
                if (d['winner'] == '1') {
                    leading_actress_dataset[d['year']]['winScore'] = parseFloat(d['vote_average']);
                }
                // set the current lowScore
                leading_actress_dataset[d['year']]['lowScore'] = parseFloat(d['vote_average']);
                // set the current highScore
                leading_actress_dataset[d['year']]['highScore'] = parseFloat(d['vote_average']);
                // update the totalScore
                leading_actress_dataset[d['year']]['totalScore'] += parseFloat(d['vote_average']);
                // update number of movies
                leading_actress_dataset[d['year']]['nbOfMovies'] += 1;
                // update the mean
                leading_actress_dataset[d['year']]['mean'] = leading_actress_dataset[d['year']]['totalScore'] / leading_actress_dataset[d['year']]['nbOfMovies'];
            }
        }
    });
}
