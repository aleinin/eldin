export function cityRankSort(propA: string, propB: string) {
  const value1 = CityRank[propA]
  const value2 = CityRank[propB]
  return (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0
}


enum CityRank {
  Village = 1,
  Town,
  City,
  Kingdom,
  Empire
}
