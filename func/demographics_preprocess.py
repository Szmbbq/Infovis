import csv

with open('../data/Oscars-demographics-DFE.csv', 'r', encoding='latin1') as rDemographics:
	demographicsReader = csv.reader(rDemographics)
	next(demographicsReader)

	starInfo = [star for star in demographicsReader]

	nonUSStarInfo = []
	USStarInfo = []

	for info in starInfo:
		birthPlaceInfo = info[5].split(',')
		# print(birthPlaceInfo[len(birthPlaceInfo) - 1].strip(' '), len(birthPlaceInfo[len(birthPlaceInfo) - 1].strip(' ')) > 2)

		# add non US stars to nonUSStarInfo
		if len(birthPlaceInfo[len(birthPlaceInfo) - 1].strip(' ')) > 2 and info[5] != "New York City" and int(info[15]) >= 1980 and (info[17] == "Best Actor" or info[17] == "Best Actress"):
			nonUSStarInfo.append(info)

		# add US stars to USStarInfo
		elif int(info[15]) >= 1980 and (info[17] == "Best Actor" or info[17] == "Best Actress"):
			if info[5] == "New York City":
				info[5] += ', Ny, United States, North America'
			else:
				info[5] += ', United States, North America'
			USStarInfo.append(info)

	with open('../data/non-US-demographics.csv', 'w', encoding='latin1') as wNonUSStar:
		fieldnames = ['_unit_id', '_golden', '_unit_state', '_trusted_judgments', '_last_judgment_at', 'birthplace', 'birthplace:confidence',
					  'date_of_birth', 'date_of_birth:confidence', 'race_ethnicity', 'race_ethnicity:confidence', 'religion', 
					  'religion:confidence', 'sexual_orientation', 'sexual_orientation:confidence', 'year_of_award', 'year_of_award:confidence', 
					  'award', 'biourl', 'birthplace_gold', 'date_of_birth_gold', 'movie', 'person', 'race_ethnicity_gold', 'religion_gold', 
					  'sexual_orientation_gold', 'year_of_award_gold']
		nonUSStar_writer = csv.writer(wNonUSStar, delimiter=',')
		nonUSStar_writer.writerow(fieldnames)
		for info in nonUSStarInfo:
			nonUSStar_writer.writerow(info)


	with open('../data/US-demographics.csv', 'w', encoding='latin1') as wUSStar:
		fieldnames = ['_unit_id', '_golden', '_unit_state', '_trusted_judgments', '_last_judgment_at', 'birthplace', 'birthplace:confidence',
					  'date_of_birth', 'date_of_birth:confidence', 'race_ethnicity', 'race_ethnicity:confidence', 'religion', 
					  'religion:confidence', 'sexual_orientation', 'sexual_orientation:confidence', 'year_of_award', 'year_of_award:confidence', 
					  'award', 'biourl', 'birthplace_gold', 'date_of_birth_gold', 'movie', 'person', 'race_ethnicity_gold', 'religion_gold', 
					  'sexual_orientation_gold', 'year_of_award_gold']
		USStar_writer = csv.writer(wUSStar, delimiter=',')
		USStar_writer.writerow(fieldnames)
		for info in USStarInfo:
			USStar_writer.writerow(info)

