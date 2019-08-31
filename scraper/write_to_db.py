import pymysql.cursors
import time
import login


def write(people, cities, goods):
    connection = pymysql.connect(host='127.0.0.1',
                                 user=login.USERNAME,
                                 password=login.PASSWORD,
                                 db=login.DATABASE,
                                 charset='utf8',
                                 cursorclass=pymysql.cursors.DictCursor)
    try:
        with connection.cursor() as cursor:
            delete_all(cursor)
            write_people(cursor, people)
            write_goods(cursor, goods)
            write_cities(cursor, cities)
            write_updated(cursor)
            connection.commit()
    finally:
        connection.close()


def write_updated(cursor):
    sql = "INSERT INTO `updated` (`timestamp`) VALUES (%s)"
    cursor.execute(sql, (time.time()))


def delete_all(cursor):
    sql = "DELETE FROM `own`"
    cursor.execute(sql)
    sql = "DELETE FROM `livesin`"
    cursor.execute(sql)
    sql = "DELETE FROM `helps`"
    cursor.execute(sql)
    sql = "DELETE FROM `buildings`"
    cursor.execute(sql)
    sql = "DELETE FROM `sells`"
    cursor.execute(sql)
    sql = "DELETE FROM `people`"
    cursor.execute(sql)
    sql = "DELETE FROM `cities`"
    cursor.execute(sql)
    sql = "DELETE FROM `goods`"
    cursor.execute(sql)
    sql = "DELETE FROM `updated`"
    cursor.execute(sql)


def write_people(cursor, people):
    for person in people:
        sql = "INSERT INTO `people` (`Username`, `Rank`, `Total`, `Wild`, `City`, `Nether`, `End`) " \
              "VALUES (%s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(sql, (person[0], person[1], person[2], person[3], person[4], person[5], person[6]))


def write_cities(cursor, cities):
    for city in cities:
        city_name = city["City Name"]
        sql = "INSERT INTO `cities` (`City Name`, `Coordinates`, `City Size`," \
              " `Total Tiles`, `Max Sellable`, `Tiles Sold`, `Population`, `Nation`) " \
              "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(sql, (
            city["City Name"], city["Coordinates"], city["City Size"], city["Total Tiles"],
            city["Max Sellable"],
            city["Tiles Sold"], city["Population"], city["Nation"]))
        for resident in city["residents"]:
            sql = "INSERT INTO `livesin` (`Username`, `City Name`, `Tiles`) " \
                  "VALUES (%s, %s, %s)"
            cursor.execute(sql, (resident[0], city_name, resident[1]))
        if city["Helpers"] != "None":
            for helper in city["Helpers"]:
                sql = "INSERT INTO `helps` (`Username`, `City Name`) " \
                      "VALUES (%s, %s)"
                cursor.execute(sql, (helper, city_name))
        for owner in city["owner"]:
            sql = "INSERT INTO `own` (`Username`, `City Name`) " \
                  "VALUES (%s, %s)"
            cursor.execute(sql, (owner, city_name))
        for building in city['buildings']:
            sql = "INSERT INTO `buildings` (`City Name`, `building`) " \
                  "VALUES (%s, %s)"
            cursor.execute(sql, (city_name, building))
        for item in city['items']:
            sql = "INSERT INTO `sells` (`good`, `City Name`, `tier`) " \
                  "VALUES (%s, %s, %s)"
            cursor.execute(sql, (item[0], city_name, int(item[1])))


def write_goods(cursor, goods):
    for good in goods:
        if good[3]:
            sql = "INSERT INTO `goods` (`Name`, `Sell`, `Buy`, `Boostable`, `T1`, `T2`, `T3`) " \
                  "VALUES (%s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(sql, (good[0], good[1], good[2], good[3], good[4], good[5], good[6]))
        else:
            sql = "INSERT INTO `goods` (`Name`, `Sell`, `Buy`, `Boostable`) " \
                  "VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (good[0], good[1], good[2], good[3]))
