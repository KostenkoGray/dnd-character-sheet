// ==================================================
// D&D Character Sheet — Currency Data (PHB 2014)
// ==================================================

export const COIN_ORDER = ["pp", "gp", "ep", "sp", "cp"];

export const COINS = {
  pp: {
    id: "pp",
    name: "Platinum",
    ukr: "Платинові",
    short: "PP",
    goldValue: 10
  },
  gp: {
    id: "gp",
    name: "Gold",
    ukr: "Золоті",
    short: "GP",
    goldValue: 1
  },
  ep: {
    id: "ep",
    name: "Electrum",
    ukr: "Електрумові",
    short: "EP",
    goldValue: 0.5
  },
  sp: {
    id: "sp",
    name: "Silver",
    ukr: "Срібні",
    short: "SP",
    goldValue: 0.1
  },
  cp: {
    id: "cp",
    name: "Copper",
    ukr: "Мідні",
    short: "CP",
    goldValue: 0.01
  }
};

export const EMPTY_WALLET = {
  pp: 0,
  gp: 0,
  ep: 0,
  sp: 0,
  cp: 0
};
