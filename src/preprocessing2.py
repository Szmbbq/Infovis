import csv

with open('../data/oscar.csv', 'r', encoding='utf-8') as rOscar:
	oscarReader = csv.reader(rOscar)
	# oscar index 5 title
	Oscar = [movie for movie in oscarReader]

	with open('../data/Oscars-demographics-DFE.csv', 'r', encoding='utf-8') as rStarInfo:
		starInfoReader = csv.reader(rStarInfo)
		StarInfo = [starInfo for starInfo in starInfoReader]

		oscarStarInfo = []

		for star in StarInfo:
			for oscarMovie in Oscar:
				if(star[22].lower() == oscarMovie[4].lower() or star[22].lower() == oscarMovie[5].lower()):
					if oscarMovie[0].split('/') > 0:
						year = oscarMovie[0].split('/')[1];
					else:
						year = oscarMovie[0]
					oscarStarInfo.append([])


