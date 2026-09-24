// ==================================================
// D&D Character Sheet — Settings Data
// ==================================================
//
// Preferences are stored separately from character data.
// Undefined preference = ask once, then save the selected mode.
//

export const DEFAULT_SETTINGS = {
  actionPreferences: {}
};

export const ACTION_PREFERENCE_VALUES = {
  AVERAGE: "average",
  MANUAL: "manual",
  ROLL: "roll"
};
