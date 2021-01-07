export function playerRankSort(propA: string, propB: string) {
  const value1 = PlayerRank[propA]
  const value2 = PlayerRank[propB]
  return (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0
}

// nether fas fa-fire
// end fas fa-ring
// city: fas fa-crown
// wilderness: fas fa-tree
// helper fas fa-hands-helping
// Mixed
// Unknown question

enum PlayerRank {
  None = -1,
  Peasant = 0,
  Villager = 1,
  Gentry = 2,
  Serf = 3,
  Grue = 4,
  Acolyte = 4,
  Commoner = 5,
  Townsman = 6,
  Townswoman = 6,
  Yeoman = 6,
  Deviant = 7,
  Shade = 7,
  Citizen = 8,
  Trader = 8,
  Hellian = 9,
  Cultist = 9,
  Nobleman = 10,
  Noblewoman = 10,
  Aristocrat = 11,
  'Dark-Lord' = 12,
  'Dark-Lady' = 12,
  Zealot = 12,
  Merchant = 13,
  Lord = 14,
  Lady = 14,
  Baronet = 14,
  Baronetess = 14,
  Baron = 14,
  Baroness = 14,
  'Scarlet-Prince' = 15,
  'Scarlet-Princess' = 15,
  'Dragon-Priest' = 15,
  'Dragon-Priestess' = 15,
  Marquess = 16,
  Count = 17,
  Countess = 17,
  Duke = 17,
  Duchess = 17,
  'Shadow-King' = 18,
  'Shadow-Queen' = 18,
  'Dragon-Lord' = 18,
  'Dragon-Lady' = 18,
  Viscount = 19,
  Prince = 19,
  Princess = 19,
  Viceroy = 20,
  King = 20,
  Queen = 20,
  Impeartor = 21,
  Emperor = 21,
  Empress = 21
}
