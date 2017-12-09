import csv
import json


with open('../data/result-demographics.csv', 'r', encoding='latin1') as rResult:
	resultReader = csv.reader(rResult)
	next(resultReader)

	struct = {"name": "earth", "children": []}

	for info in resultReader:
		name = info[22]
		movie = info[21]
		birthPlaceInfo = info[5].split(',')
		city = birthPlaceInfo[0].strip()
		county = birthPlaceInfo[1].strip()
		country = birthPlaceInfo[2].strip()
		continent = birthPlaceInfo[3].strip()

		continentExist = [i for i in struct["children"] if i["name"] == continent]

		# if no such continent create
		if len(continentExist) == 0:
			struct["children"].append({"name": continent, 
									   "children": [{
									   "name": country,
									   "children": [{
									   "name": county,
									   "children": [{
									   "name":city,
									   "person": name,
									   "movie": movie,
									   "size": 1
									   }]
									   }]
									   }]})
		# keep searching
		else:
			countryExist = [j for j in continentExist[0]["children"] if j["name"] == country]
			# if no such country
			if len(countryExist) == 0:
				continentExist[0]["children"].append({"name": country, 
												   "children": [{
												   "name": county,
												   "children": [{
												   "name": city,
												   "person": name,
												   "movie": movie,
												   "size": 1
												   }]
												   }]})
			else:
				countyExist = [k for k in countryExist[0]["children"] if k["name"] == county]
				# if no such county
				if len(countyExist) == 0:
					countryExist[0]["children"].append({"name": county,
													 "children": [{
													 "name": city,
													 "person": name,
													 "movie": movie,
													 "size": 1
													 }]})
				else:
					countyExist[0]["children"].append({"name": city,
													"person": name,
													"movie": movie,
													"size": 1})

with open('../data/starInfo.json', 'w') as output:
	json.dump(struct, output)

