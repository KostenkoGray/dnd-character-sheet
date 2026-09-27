import { ARMOR, SHIELDS } from "../data/armorData.js";
import { WEAPONS } from "../data/weaponsData.js";
import { ARTIFACTS } from "../data/artifactsData.js";
import { OTHER_ITEMS, TOOLS_DATA } from "../data/otherItemsData.js";

export const ITEM_TYPES = {
  ARMOR: "armor",
  SHIELD: "shield",
  WEAPON: "weapon",
  ARTIFACT: "artifact",
  TOOL: "tool",
  OTHER: "other"
};

export const ITEM_TYPE_LABELS = {
  [ITEM_TYPES.ARMOR]: "Броня",
  [ITEM_TYPES.SHIELD]: "Щити",
  [ITEM_TYPES.WEAPON]: "Зброя",
  [ITEM_TYPES.ARTIFACT]: "Артефакти",
  [ITEM_TYPES.TOOL]: "Інструменти",
  [ITEM_TYPES.OTHER]: "Інше"
};

export const ITEM_SOURCES = {
  ARMOR: "armor",
  SHIELD: "shield",
  WEAPON: "weapon",
  ARTIFACT: "artifact",
  TOOL: "tool",
  OTHER: "other"
};

const INVENTORY_SCHEMA_VERSION = 1;
let fallbackInstanceCounter = 0;

function createInstanceId() {
  const uuid = globalThis.crypto?.randomUUID?.();

  if (uuid) {
    return uuid;
  }

  fallbackInstanceCounter += 1;
  return `inv-${Date.now()}-${fallbackInstanceCounter}`;
}

function normalizeCatalogItem(source, item, type) {
  if (!item) return null;

  return {
    ...item,
    source,
    type,
    itemId: item.id,
    equipable: item.equipable ?? (
      type === ITEM_TYPES.ARMOR ||
      type === ITEM_TYPES.SHIELD ||
      type === ITEM_TYPES.WEAPON ||
      type === ITEM_TYPES.ARTIFACT
    ),
    equipmentSlot: item.equipmentSlot ?? type,
    description: item.description ?? item.short ?? ""
  };
}

export function getItemCatalog() {
  return [
    ...Object.values(ARMOR).map(item =>
      normalizeCatalogItem(ITEM_SOURCES.ARMOR, item, ITEM_TYPES.ARMOR)
    ),
    ...Object.values(SHIELDS).map(item =>
      normalizeCatalogItem(ITEM_SOURCES.SHIELD, item, ITEM_TYPES.SHIELD)
    ),
    ...Object.values(WEAPONS).map(item =>
      normalizeCatalogItem(ITEM_SOURCES.WEAPON, item, ITEM_TYPES.WEAPON)
    ),
    ...Object.values(ARTIFACTS).map(item =>
      normalizeCatalogItem(ITEM_SOURCES.ARTIFACT, item, ITEM_TYPES.ARTIFACT)
    ),
    ...Object.values(TOOLS_DATA).map(item =>
      normalizeCatalogItem(ITEM_SOURCES.TOOL, item, ITEM_TYPES.TOOL)
    ),
    ...Object.values(OTHER_ITEMS).map(item =>
      normalizeCatalogItem(ITEM_SOURCES.OTHER, item, ITEM_TYPES.OTHER)
    )
  ].filter(Boolean);
}

export function getCatalogItem(source, itemId) {
  return getItemCatalog().find(
    item => item.source === source && item.itemId === itemId
  ) ?? null;
}

export function getInventoryItem(character, instanceId) {
  ensureInventory(character);

  return character.inventory.find(
    item => item.instanceId === instanceId
  ) ?? null;
}

export function getInventoryItems(character) {
  ensureInventory(character);

  return character.inventory
    .map(instance => {
      const catalogItem = getCatalogItem(instance.source, instance.itemId);

      if (!catalogItem) {
        return null;
      }

      return {
        ...catalogItem,
        instanceId: instance.instanceId,
        equipped: instance.equipped === true,
        quantity: Math.max(1, Number(instance.quantity ?? 1))
      };
    })
    .filter(Boolean);
}

export function getEquippedItems(character, types = null) {
  const typeSet = types
    ? new Set(Array.isArray(types) ? types : [types])
    : null;

  return getInventoryItems(character).filter(item =>
    item.equipped &&
    (!typeSet || typeSet.has(item.type))
  );
}

export function getEquippedArmor(character) {
  return getEquippedItems(character, ITEM_TYPES.ARMOR)[0] ?? null;
}

export function getEquippedShield(character) {
  return getEquippedItems(character, ITEM_TYPES.SHIELD)[0] ?? null;
}

export function getEquippedWeapons(character) {
  return getEquippedItems(character, ITEM_TYPES.WEAPON);
}

export function getEquippedArtifacts(character) {
  return getEquippedItems(character, ITEM_TYPES.ARTIFACT);
}

export function getEquipmentBonuses(character) {
  const result = {
    acBonus: 0,
    initiativeBonus: 0,
    speedBonus: 0,
    statBonuses: {},
    skillBonuses: {},
    saveBonuses: {},
    skillProficiencies: {},
    features: []
  };

  for (const item of getEquippedItems(character)) {
    const effects = item.effects ?? {};

    result.acBonus += Number(effects.acBonus ?? 0);
    result.initiativeBonus += Number(effects.initiativeBonus ?? 0);
    result.speedBonus += Number(effects.speedBonus ?? 0);

    for (const [statKey, value] of Object.entries(effects.statBonuses ?? {})) {
      result.statBonuses[statKey] =
        Number(result.statBonuses[statKey] ?? 0) + Number(value ?? 0);
    }

    for (const [skillKey, value] of Object.entries(effects.skillBonuses ?? {})) {
      result.skillBonuses[skillKey] =
        Number(result.skillBonuses[skillKey] ?? 0) + Number(value ?? 0);
    }

    for (const [saveKey, value] of Object.entries(effects.saveBonuses ?? {})) {
      result.saveBonuses[saveKey] =
        Number(result.saveBonuses[saveKey] ?? 0) + Number(value ?? 0);
    }

    for (const [skillKey, proficiency] of Object.entries(
      effects.skillProficiencies ?? {}
    )) {
      result.skillProficiencies[skillKey] = proficiency;
    }

    if (Array.isArray(effects.features)) {
      result.features.push(...effects.features);
    }
  }

  return result;
}

export function getEffectiveAbilityScore(character, statKey) {
  const baseScore = Number(character.stats?.[statKey] ?? 10);
  const bonus = Number(
    getEquipmentBonuses(character).statBonuses?.[statKey] ?? 0
  );

  return baseScore + bonus;
}

export function getInventoryFeatureEntries(character) {
  const entries = [];

  for (const item of getEquippedItems(character)) {
    const effects = item.effects ?? {};

    for (const feature of effects.features ?? []) {
      if (typeof feature === "string") {
        entries.push({
          id: `item:${item.instanceId}:${feature}`,
          ukr: feature,
          short: "",
          sourceItem: item.ukr ?? item.name
        });
        continue;
      }

      entries.push({
        id: feature.id ?? `item:${item.instanceId}:${entries.length}`,
        name: feature.name ?? "",
        ukr: feature.ukr ?? feature.name ?? "Властивість предмета",
        short: feature.short ?? "",
        sourceItem: item.ukr ?? item.name
      });
    }

    for (const [skillKey, proficiency] of Object.entries(effects.skillProficiencies ?? {})) {
      entries.push({
        id: `item:${item.instanceId}:skill-proficiency:${skillKey}`,
        ukr: `Володіння навичкою: ${skillKey}`,
        short: `Рівень володіння: ${proficiency}.`,
        sourceItem: item.ukr ?? item.name
      });
    }

    for (const [skillKey, bonus] of Object.entries(effects.skillBonuses ?? {})) {
      entries.push({
        id: `item:${item.instanceId}:skill-bonus:${skillKey}`,
        ukr: `Бонус до навички: ${skillKey}`,
        short: `${Number(bonus) >= 0 ? "+" : ""}${bonus} до перевірок навички.`,
        sourceItem: item.ukr ?? item.name
      });
    }
  }

  return entries;
}

export function addItemToInventory(character, source, itemId) {
  ensureInventory(character);

  const catalogItem = getCatalogItem(source, itemId);

  if (!catalogItem) {
    return {
      ok: false,
      message: "Предмет не знайдено в базі предметів."
    };
  }

  const instance = {
    instanceId: createInstanceId(),
    source,
    itemId,
    equipped: false,
    quantity: 1
  };

  character.inventory.push(instance);

  return {
    ok: true,
    instance: getInventoryItems(character).find(
      item => item.instanceId === instance.instanceId
    )
  };
}

export function equipInventoryItem(character, instanceId) {
  ensureInventory(character);

  const instance = getInventoryItem(character, instanceId);

  if (!instance) {
    return {
      ok: false,
      message: "Предмет не знайдено в інвентарі."
    };
  }

  const catalogItem = getCatalogItem(instance.source, instance.itemId);

  if (!catalogItem?.equipable) {
    return {
      ok: false,
      message: "Цей предмет не можна екіпірувати."
    };
  }

  if (instance.equipped === true) {
    return {
      ok: true,
      item: catalogItem
    };
  }

  const type = catalogItem.type;

  if (type === ITEM_TYPES.WEAPON) {
    const equippedWeapons = getEquippedWeapons(character);

    if (equippedWeapons.length >= 2) {
      return {
        ok: false,
        message: "Уже екіпіровано дві одиниці зброї. Спочатку зніміть одну."
      };
    }
  }

  if (
    type === ITEM_TYPES.ARMOR ||
    type === ITEM_TYPES.SHIELD
  ) {
    for (const other of character.inventory) {
      if (other.instanceId === instanceId) continue;
      const otherCatalog = getCatalogItem(other.source, other.itemId);

      if (otherCatalog?.type === type) {
        other.equipped = false;
      }
    }
  }

  instance.equipped = true;

  return {
    ok: true,
    item: catalogItem
  };
}

export function unequipInventoryItem(character, instanceId) {
  const instance = getInventoryItem(character, instanceId);

  if (!instance) {
    return {
      ok: false,
      message: "Предмет не знайдено в інвентарі."
    };
  }

  instance.equipped = false;

  return {
    ok: true,
    item: getCatalogItem(instance.source, instance.itemId)
  };
}

export function removeItemFromInventory(character, instanceId) {
  ensureInventory(character);

  const index = character.inventory.findIndex(
    item => item.instanceId === instanceId
  );

  if (index === -1) {
    return {
      ok: false,
      message: "Предмет не знайдено в інвентарі."
    };
  }

  if (character.inventory[index].equipped) {
    return {
      ok: false,
      message: "Спочатку зніміть предмет, потім його можна видалити."
    };
  }

  const [removed] = character.inventory.splice(index, 1);

  return {
    ok: true,
    item: getCatalogItem(removed.source, removed.itemId)
  };
}

function createMigratedInstance(characterId, source, item, index) {
  return {
    instanceId: `legacy-${characterId}-${source}-${item.id}-${index}`,
    source,
    itemId: item.id,
    equipped: true,
    quantity: 1
  };
}

export function ensureInventory(character) {
  if (!character || typeof character !== "object") {
    return character;
  }

  if (!Array.isArray(character.inventory)) {
    character.inventory = [];
  }

  const hasLegacyEquipment =
    character.armor ||
    character.shield ||
    (Array.isArray(character.weapons) && character.weapons.length);

  if (
    character.inventory.length === 0 &&
    hasLegacyEquipment
  ) {
    let index = 0;

    if (character.armor?.id) {
      character.inventory.push(
        createMigratedInstance(
          character.id,
          ITEM_SOURCES.ARMOR,
          character.armor,
          index++
        )
      );
    }

    if (character.shield?.id) {
      character.inventory.push(
        createMigratedInstance(
          character.id,
          ITEM_SOURCES.SHIELD,
          character.shield,
          index++
        )
      );
    }

    for (const weapon of character.weapons ?? []) {
      if (!weapon?.id) continue;

      character.inventory.push(
        createMigratedInstance(
          character.id,
          ITEM_SOURCES.WEAPON,
          weapon,
          index++
        )
      );
    }
  }

  for (const instance of character.inventory) {
    instance.instanceId ??= createInstanceId();
    instance.quantity = Math.max(1, Number(instance.quantity ?? 1));
    instance.equipped = instance.equipped === true;

    const catalogItem = getCatalogItem(instance.source, instance.itemId);
    if (!catalogItem) {
      continue;
    }

    instance.source ??= catalogItem.source;
    instance.itemId ??= catalogItem.itemId;
  }

  character.inventorySchemaVersion = INVENTORY_SCHEMA_VERSION;

  syncLegacyEquipment(character);

  return character;
}

function syncLegacyEquipment(character) {
  const equipped = character.inventory
    .filter(instance => instance.equipped === true)
    .map(instance => ({
      instance,
      item: getCatalogItem(instance.source, instance.itemId)
    }))
    .filter(entry => entry.item);

  const armor = equipped.find(entry => entry.item.type === ITEM_TYPES.ARMOR)?.item ?? null;
  const shield = equipped.find(entry => entry.item.type === ITEM_TYPES.SHIELD)?.item ?? null;
  const weapons = equipped
    .filter(entry => entry.item.type === ITEM_TYPES.WEAPON)
    .map(entry => entry.item);

  character.armor = armor;
  character.shield = shield;
  character.weapons = weapons;
}
