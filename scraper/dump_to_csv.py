import csv


def dump_data(people, cities, goods):
    try:
        with open("eldin.csv", 'w', newline='') as out_file:
            writer = csv.writer(out_file)
            write_to_csv(writer, people, goods, cities)
    except PermissionError:
        print("\nWas unable to access CSV. It was probably open. Moving on")
        pass


def write_to_csv(writer, people, goods, cities):
    writer.writerow(["People"])
    writer.writerow(["Username", "Rank", "Total Tiles", "Wild Tiles", "City Tiles", "Nether Tiles", "End Tiles"])
    for person in people:
        # writer.writerow([person[0], person[1], person[2], person[3], person[4], person[5], person[6]])
        writer.writerow(person)
    writer.writerow([])
    writer.writerow(["Goods"])
    writer.writerow(["Name", "Base Sell", "Base Buy", "Boostable?", "T1", "T2", "T3"])
    for good in goods:
        # writer.writerow(good[0], good[1], good[2])
        writer.writerow(good)
    writer.writerow([])
    writer.writerow(["City Info"])
    writer.writerow(
        ["Name", "Coordinates", "City Size", "Total Tiles", "Max Sellable", "Tiles Sold",
         "Population", "Buildings", "Items", "Nation", "Residents", "Helpers", "Owners"])

    for city in cities:
        city_info = []
        for key, value in city.items():
            city_info.append(value)
        writer.writerow(city_info)
