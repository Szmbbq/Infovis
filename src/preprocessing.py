import csv

with open('../data/oscar.csv', 'r', encoding='utf-8') as rOscar:
	oscarReader = csv.reader(rOscar)
	# oscar index 5 title
	Oscar = [movie for movie in oscarReader]

	with open('../data/tmdb_5000_movies.csv', 'r', encoding='utf-8') as rTMDB:
		TMDBReader = csv.reader(rTMDB)
		TMDB = [movie for movie in TMDBReader]
		# TMDB index 17 title
		# for i in range(4800):
		# 	next(TMDBReader)
		# for line in TMDBReader:
		# 	print(line[17])


		oscarTMDB = []
		for oscarMovie in Oscar:
			for TMDBMovie in TMDB:
				if len(TMDBMovie[11].split('-')) > 1:
					year = int(TMDBMovie[11].split('-')[0])
				else:
					year = 0
				if len(oscarMovie[0].split('/')) > 1:
					oscarYear = int(oscarMovie[0].split('/')[1])
				else:
					if oscarMovie[0] != 'Year':
						oscarYear = int(oscarMovie[0])
					else:
						oscarYear = 0;
				if (oscarMovie[4].lower() == TMDBMovie[17].lower() or oscarMovie[5].lower() == TMDBMovie[17].lower()) and (oscarYear == year):
					oscarTMDB.append([year, TMDBMovie[17], TMDBMovie[1], TMDBMovie[18], oscarMovie[2], oscarMovie[3]])


		with open('../data/result.csv', 'w', encoding='utf-8') as result:
			fieldnames = ['year', 'title', 'genre', 'vote_average', 'award', 'winner']
			csv_writer = csv.writer(result, delimiter=',')
			csv_writer.writerow(fieldnames)
			for line in oscarTMDB:
				csv_writer.writerow(line)


