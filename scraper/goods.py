import re
from clarify import clarify_boosted


# helper
def get_boost_building(good):
    good = good.lower()
    if good in bakery:
        return "baker"
    elif good in butcher:
        return "butcher"
    elif good in grocer:
        return "grocer"
    elif good in fish:
        return "fish monger"
    elif good in iron:
        return "iron monger"
    elif good in gold:
        return "goldsmith"
    elif good in gem:
        return "gem polisher"
    else:
        return "-1"


# helper
def extract_tier(build):
    tier_extract = re.search('T[1-3]?', build)
    if tier_extract:
        tier = tier_extract.group(0)
    return tier.replace("T", "")


# called
def get_price_tier(good, buildings, city):
    boost_building = get_boost_building(good)
    city = city.lower()
    tier = 0
    for build in buildings:
        if boost_building.lower() in build.lower():
            if good in ore:
                tier = extract_tier(build)
            else:
                # For things other than ore, it's possible to have multiple goods that COULD be boosted
                # by the same economic building. Buildings can only boost one however.
                # described more here: https://github.com/aleinin/eldinscraper/issues/1
                if city in clarify_boosted:
                    if good.lower() in clarify_boosted[city]:
                        tier = extract_tier(build)
                    # else tier = 0
                else:
                    tier = extract_tier(build)
    return tier


# helper
def get_boost_percent(good):
    good = good.lower()
    if good in boostable:
        if good in ore:
            return 0.05
        else:
            return 0.10
    else:
        return 0


# called
def get_boosted_prices(good_line):
    percent = get_boost_percent(good_line[0])
    if percent == 0:
        return [False]
    else:
        boosted_list = [True]
        sell = float(good_line[1])
        for i in range(1, 4):
            boosted_list.append(round(sell + (sell * (percent * i)), 2))
        return boosted_list


boostable = [
    "cooked cod",
    "cooked salmon",
    "cooked pork",
    "cooked chicken",
    "cooked steak",
    "cooked mutton",
    "cooked rabbit",
    "leather",
    "bread",
    "pumpkin pie",
    "cake",
    "carrots",
    "potatoes",
    "apple",
    "melon blocks",
    "iron ingot",
    "gold ingot",
    "diamond",
    "emerald",
    "pufferfish",
    "tropical fish"
]

ore = [
    "quartz",
    "redstone dust",
    "coal",
    "lapis lazuli",
    "iron ingot",
    "gold ingot",
    "diamond",
    "emerald"
]
bakery = [
    "bread",
    "pumpkin pie",
    "cake"
]

butcher = [
    "cooked pork",
    "cooked chicken",
    "cooked steak",
    "cooked mutton",
    "cooked rabbit"
]

grocer = [
    "carrots",
    "potatoes",
    "apple",
    "melon block"
]

fish = [
    "cooked cod",
    "cooked salmon",
    "pufferfish",
    "tropical fish"
]

iron = [
    "iron ingot"
]
gold = [
    "gold ingot"
]
gem = {
    "diamond",
    "emerald"
}
