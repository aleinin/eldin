from bs4 import BeautifulSoup
from urllib.request import urlopen
from time import sleep
from write_to_db import write
from goods import get_boosted_prices, get_price_tier, get_boost_building
from clarify import aliases

shop_page = "https://www.worldofeldin.com/server-information/server-shops/"
people_page = "https://www.worldofeldin.com/portal/tableview/"
city_page = "https://www.worldofeldin.com/portal/cityview/"
details_format = "https://www.worldofeldin.com/portal/cityview/index.php?id={}&view=View+Details"


def scrape_table(link):
    page = urlopen(link)
    soup = BeautifulSoup(page, 'html.parser')
    data = []
    for tr in soup.find_all('tr'):
        entry = []
        for td in tr:
            if td.string != "\n":
                entry.append(td.string)
        data.append(entry)
    del data[0]
    return data


def remove_last_col(data):
    new_data = []
    for line in data:
        if line[0] != "Name":
            new_data.append(line[:-1])
    return new_data


def append_boosted_prices(data):
    new_data = []
    for good in data:
        good.extend(get_boosted_prices(good))
        new_data.append(good)
    return new_data


def get_city_info():
    page = urlopen(city_page)
    soup = BeautifulSoup(page, 'html.parser')
    city_info = []
    for id in soup.find_all("input", attrs={"type": "hidden"}):
        sleep(1)
        link = details_format.format(id.attrs['value'])
        city = scrape_details(link)
        city_info.append(city)
        print()
        for key, value in city.items():
            try:
                print("{}: {}".format(key, value))
            except UnicodeEncodeError:
                print("{}: {}".format(key.encode('ascii', 'ignore').decode('ascii'),
                                      value.encode('ascii', 'ignore').decode('ascii')))

    return city_info


def get_residents(soup):
    data = []
    for tr in soup.find_all('tr'):
        entry = []
        for td in tr:
            if td.string != "\n":
                entry.append(td.string)
        data.append(entry)
    data = data[2:]
    return data


def scrape_details(link):
    page = urlopen(link)
    soup = BeautifulSoup(page, 'html.parser')
    city = dict()
    ignore = ["Town Hall Conquered?", "# of TH's Conquered"]
    categories = soup.findAll('fieldset')
    in_buildings = False
    in_market = False
    buildings = []
    items = []
    city_name = ""
    for fieldset in categories:
        for field in fieldset.text.replace("\t", "").replace("\xa0", "").split("\n"):
            key_value = field.split(":")
            if len(key_value) > 1 and key_value[0] not in ignore:
                city[key_value[0]] = key_value[1].lstrip()
                if key_value[0] == "City Name":
                    city_name = key_value[1].lstrip()
            elif key_value[0] == "City Buildings":
                in_buildings = True
            elif key_value[0] == "Servershop Items":
                in_market = True
            elif in_buildings:
                if key_value[0] != "":
                    building = key_value[0].split(" - T")
                    if len(building) > 1:
                        buildings.append([building[0], building[1]])
                    else:
                        buildings.append([building[0], None])
                else:
                    in_buildings = False
                    city["buildings"] = buildings
            elif in_market:
                if key_value[0] != "":
                    market_item = key_value[0]
                    if market_item in aliases:
                        market_item = aliases[market_item]
                    tier = get_price_tier(market_item, buildings, city_name)
                    items.append([market_item, tier])
                else:
                    in_market = False
                    city["items"] = items
    city["residents"] = get_residents(soup)
    if city["Nation"] == "":
        city["Nation"] = "None"
    city = helpers_owners_to_arr(city)
    city["Coordinates"] = city["Coordinates"].replace("/", "to")
    return city


def helpers_owners_to_arr(info):
    # max 5 helpers
    # max 3 co-owners
    helpers = []
    owners = []
    helper_names = ["1st Helper", "2nd Helper", "3rd Helper", "4th Helper", "5th Helper"]
    owner_names = ["1st Owner", "2nd Owner", "3rd Owner"]
    for i in range(0, 5):
        if helper_names[i] in info:
            helpers.append(info[helper_names[i]])
            del info[helper_names[i]]
        if i < 3 and owner_names[i] in info:
            owners.append(info[owner_names[i]])
            del info[owner_names[i]]
    if helpers != []:
        info['Helpers'] = helpers
    else:
        info['Helpers'] = "None"
    info['owner'] = owners
    return info


def print_data_to_console(header, data):
    print()
    print(header)
    for datum in data:
        print(datum)


# detects issue #1 occurrences
def check_for_boost_error(cities):
    for city in cities:
        city_boost_buildings = []
        goods = city['items']
        for good in goods:
            # if good is boosted
            if good[1] != 0:
                if get_boost_building(good[0]) in city_boost_buildings:
                    print("Warning: Possible issue #1 error")
                    print(city['City Name'])
                    print(get_boost_building(good[0]))
                else:
                    city_boost_buildings.append(get_boost_building(good[0]))


def scrape_eldin():
    # Scrape Land Table
    # Username, Rank, Total Tiles, Wild Tiles, City Tiles, Nether Tiles, End Tiles
    people = scrape_table(people_page)
    # due to database constraints, someone has to own spawn so a server user is added.
    people.append(['Server', "None", '0', '0', '0', '0', '0'])
    print_data_to_console("PEOPLE", people)
    # Limit requests to 1/second for ethical scraping.
    sleep(1)
    # Scrape Server Shop
    # Name, Base Sell, Base Buy
    goods = scrape_table(shop_page)
    # Remove unneeded requirements column
    goods = remove_last_col(goods)
    goods = append_boosted_prices(goods)
    print_data_to_console("GOODS", goods)

    # Get Info about Cities
    # Name, Coordinates, Owner, Size, Total Tiles, Sellable, Tiles Sold, Population, Buildings, Items, Nation, Residents
    cities = get_city_info()
    check_for_boost_error(cities)
    return people, cities, goods


def main():
    people, cities, goods = scrape_eldin()
    write(people, cities, goods)


if __name__ == "__main__": main()
