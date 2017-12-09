import csv

with open('../data/non-US-demographics.csv', 'r', encoding='latin1') as rNonUS:
	nonUSReader = csv.reader(rNonUS)
	next(nonUSReader)

	nonUSStarInfo = [star for star in nonUSReader]

	with open('../data/US-demographics.csv', 'r', encoding='latin1') as rUS:
		USReader = csv.reader(rUS)
		next(USReader)

		USStarInfo = [star for star in USReader]

		with open('../data/result-demographics.csv', 'w', encoding='latin1') as wStar:
			fieldnames = ['_unit_id', '_golden', '_unit_state', '_trusted_judgments', '_last_judgment_at', 'birthplace', 'birthplace:confidence',
						  'date_of_birth', 'date_of_birth:confidence', 'race_ethnicity', 'race_ethnicity:confidence', 'religion', 
						  'religion:confidence', 'sexual_orientation', 'sexual_orientation:confidence', 'year_of_award', 'year_of_award:confidence', 
						  'award', 'biourl', 'birthplace_gold', 'date_of_birth_gold', 'movie', 'person', 'race_ethnicity_gold', 'religion_gold', 
						  'sexual_orientation_gold', 'year_of_award_gold']
			star_writer = csv.writer(wStar, delimiter=',')
			star_writer.writerow(fieldnames)
			for info in nonUSStarInfo:
				star_writer.writerow(info)
			for info in USStarInfo:
				star_writer.writerow(info)