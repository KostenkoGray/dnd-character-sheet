import { STATS, ABILITY_KEYS } from "../data/rulesData.js";
import { RACES } from "../data/racesData.js";
import { CLASSES } from "../data/classesData.js";
import { CREATOR_ABILITY_SCORE_ARRAY, CREATOR_CLASS_EQUIPMENT, CREATOR_TOOL_OPTIONS } from "../data/characterCreatorData.js";
import { BACKGROUNDS } from "../data/backgroundsData.js";
import { getItemCatalog } from "../services/inventoryService.js";
import {
  getRaceChoices,
  getRaceTraitSummary,
  getClassSummary,
  getSubclassOptions,
  isSubclassRequiredAtLevel1,
  getClassChoiceGroups,
  getBackgroundOptions,
  getBackgroundChoiceGroups,
  getEquipmentChoiceGroups,
  getMagicRequirements,
  getSpellOptionsForCreator,
  getChoiceValue,
  getRecommendedBackgroundId,
  getCreatorSteps,
  getCurrentStep
} from "../services/characterCreatorService.js";

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderProgress(state) {
  const steps = getCreatorSteps(state);
  const current = getCurrentStep(state);
  const index = Math.min(Math.max(Number(state.step ?? 0), 0), steps.length - 1);

  return (
    '<div class="creator-progress">' +
      '<div class="creator-progress-meta">' +
        '<span>Створення персонажа</span>' +
        '<strong>' + (index + 1) + ' / ' + steps.length + '</strong>' +
      '</div>' +
      '<div class="creator-progress-track"><span style="width:' + (((index + 1) / steps.length) * 100) + '%"></span></div>' +
      '<div class="creator-progress-step">' + escapeHtml(current?.title ?? "") + '</div>' +
    '</div>'
  );
}

function renderChoiceCards(options, selected, attributes = "", multiple = false) {
  const selectedValues = Array.isArray(selected) ? selected : selected ? [selected] : [];

  return '<div class="creator-choice-grid">' +
    options.map(option => {
      const isSelected = selectedValues.includes(option.id);
      return (
        '<label class="creator-choice-card ' + (isSelected ? "selected" : "") + '">' +
          '<input type="' + (multiple ? "checkbox" : "radio") + '"' +
            ' name="creator-choice-' + escapeHtml(attributes) + '"' +
            ' value="' + escapeHtml(option.id) + '"' +
            ' data-creator-choice-option="' + escapeHtml(attributes) + '"' +
            (isSelected ? " checked" : "") +
          '>' +
          '<span class="creator-choice-card-body">' +
            '<strong>' + escapeHtml(option.label) + '</strong>' +
            (option.description ? '<small>' + escapeHtml(option.description) + '</small>' : "") +
          '</span>' +
        '</label>'
      );
    }).join("") +
  '</div>';
}

function renderSelect(title, group, selected) {
  const selectedValues = Array.isArray(selected) ? selected : selected ? [selected] : [];
  const max = Number(group.count ?? 1);

  return (
    '<label class="creator-field">' +
      '<span>' + escapeHtml(title) + (max > 1 ? ' <small>(оберіть ' + max + ')</small>' : "") + '</span>' +
      '<select ' +
        (max > 1 ? "multiple" : "") +
        ' size="' + (max > 1 ? String(Math.min(Math.max(group.options.length, 4), 7)) : "1") + '"'
        ' data-creator-choice-select="' + escapeHtml(group.id) + '"' +
        ' data-creator-choice-kind="' + escapeHtml(group.kind) + '"' +
        ' data-creator-choice-count="' + max + '"' +
      '>' +
        (group.kind === "single"
          ? '<option value="">Оберіть...</option>'
          : "") +
        group.options.map(option =>
          '<option value="' + escapeHtml(option.id) + '"' +
          (selectedValues.includes(option.id) ? " selected" : "") +
          '>' + escapeHtml(option.label) + '</option>'
        ).join("") +
      '</select>' +
    '</label>'
  );
}

function renderChoiceGroup(state, group) {
  const value = getChoiceValue(state, group);
  const selected = Array.isArray(value) ? value : value ? [value] : [];

  if (group.kind === "info") {
    return (
      '<section class="creator-info-box">' +
        '<div class="creator-choice-title">' + escapeHtml(group.title) + '</div>' +
        '<p>' + escapeHtml(group.options.map(option => option.label).join(", ")) + '</p>' +
      '</section>'
    );
  }

  if (group.kind === "single" || group.kind === "feat") {
    return renderSelect(group.title, group, selected[0] ?? "");
  }

  if (group.kind === "stats" || group.kind === "skills" || group.kind === "languages" || group.kind === "categoryTools") {
    return renderSelect(group.title, group, selected);
  }

  if (group.kind === "expertise") {
    return renderSelect(group.title, group, selected);
  }

  return renderSelect(group.title, group, selected);
}

function renderRaceStep(state) {
  const race = state.raceId ? state.raceId : "";
  const traitSummary = state.raceId ? getRaceTraitSummary(state) : null;
  const raceChoices = getRaceChoices(state);
  return (
    '<section class="creator-step">' +
      '<div class="creator-section-heading">' +
        '<h2>Раса</h2>' +
        '<p>Обери расу. Підраса та расові варіанти з виборами з\'являться тут же.</p>' +
      '</div>' +
      '<div class="creator-choice-grid creator-race-grid">' +
        renderRaceOptions(state, race) +
      '</div>' +
      (race ? renderSubraceOptions(state) : "") +
      (race === "human" ? renderHumanVariantOptions(state) : "") +
      (traitSummary ? renderRaceSummary(traitSummary) : "") +
      (raceChoices.length ? '<div class="creator-choice-groups">' + raceChoices.map(group => renderChoiceGroup(state, group)).join("") + '</div>' : "") +
    '</section>'
  );
}

function renderRaceOptions(state, selectedRace) {
  const races = Object.values(RACES);

  return races.map(race =>
    '<button type="button" class="creator-card-button creator-race-option ' + (selectedRace === race.id ? "selected" : "") + '" data-creator-race="' + escapeHtml(race.id) + '">' +
      '<strong>' + escapeHtml(race.ukr ?? race.name) + '</strong>' +
      '<span>' + escapeHtml(race.name) + '</span>' +
      '<small>' + escapeHtml((race.size ?? "") + " · " + (race.speed ?? "—") + " ft." + (race.darkvision ? " · darkvision " + race.darkvision + " ft." : "")) + '</small>' +
    '</button>'
  ).join("");
}

function renderSubraceOptions(state) {
  const race = RACES[state.raceId];
  const subraces = Object.values(race?.subraces ?? {});

  if (!subraces.length) return "";

  return (
    '<section class="creator-subsection">' +
      '<h3>Підраса</h3>' +
      '<div class="creator-choice-grid creator-subrace-grid">' +
        subraces.map(subrace =>
          '<button type="button" class="creator-card-button ' + (state.subraceId === subrace.id ? "selected" : "") + '" data-creator-subrace="' + escapeHtml(subrace.id) + '">' +
            '<strong>' + escapeHtml(subrace.ukr ?? subrace.name) + '</strong>' +
            '<span>' + escapeHtml(subrace.name) + '</span>' +
          '</button>'
        ).join("") +
      '</div>' +
    '</section>'
  );
}

function renderHumanVariantOptions(state) {
  const variants = Object.entries(RACES.human?.variants ?? {});

  if (!variants.length) return "";

  return (
    '<section class="creator-subsection">' +
      '<h3>Варіант людини</h3>' +
      '<div class="creator-choice-grid">' +
        variants.map(([id, variant]) =>
          '<button type="button" class="creator-card-button ' + (state.raceVariant === id ? "selected" : "") + '" data-creator-race-variant="' + escapeHtml(id) + '">' +
            '<strong>' + escapeHtml(variant.label ?? id) + '</strong>' +
          '</button>'
        ).join("") +
      '</div>' +
    '</section>'
  );
}

function renderRaceSummary(summary) {
  const bonuses = Object.entries(summary.abilityScoreIncrease ?? {})
    .map(([id, value]) => (STATS[id]?.short ?? id) + " +" + value)
    .join(", ");

  const weapons = (summary.weaponProficiencies ?? [])
    .map(item => item?.ukr ?? item?.name ?? item)
    .join(", ");

  const armor = (summary.armorProficiencies ?? []).join(", ");

  return (
    '<section class="creator-summary-card">' +
      '<div class="creator-summary-grid">' +
        '<div><span>Швидкість</span><strong>' + escapeHtml(summary.speed ? summary.speed + " ft." : "—") + '</strong></div>' +
        '<div><span>Темнобачення</span><strong>' + escapeHtml(summary.darkvision ? summary.darkvision + " ft." : "—") + '</strong></div>' +
        '<div><span>Бонуси характеристик</span><strong>' + escapeHtml(bonuses || "Немає") + '</strong></div>' +
      '</div>' +
      '<div class="creator-summary-lines">' +
        '<p><span>Мови:</span> ' + escapeHtml((summary.languages ?? []).join(", ") || "—") + '</p>' +
        '<p><span>Зброя:</span> ' + escapeHtml(weapons || "—") + '</p>' +
        '<p><span>Броня:</span> ' + escapeHtml(armor || "—") + '</p>' +
        (summary.traits ?? []).map(trait => '<p><span>' + escapeHtml(trait[1]) + ':</span> ' + escapeHtml(trait[2]) + '</p>').join("") +
      '</div>' +
    '</section>'
  );
}

function renderStatsStep(state) {
  return (
    '<section class="creator-step">' +
      '<div class="creator-section-heading">' +
        '<h2>Характеристики</h2>' +
        '<p>Розподіли стандартний набір значень: 15, 14, 13, 12, 10, 8. Расові бонуси застосуються після вибору.</p>' +
      '</div>' +
      '<div class="creator-stats-assignment">' +
        ABILITY_KEYS.map(id => {
          const value = state.stats[id];
          return (
            '<label class="creator-stat-row">' +
              '<span><strong>' + escapeHtml(STATS[id].short) + '</strong>' + escapeHtml(STATS[id].ukr) + '</span>' +
              '<select data-creator-stat="' + escapeHtml(id) + '">' +
                '<option value="">—</option>' +
                CREATOR_ABILITY_SCORE_ARRAY.map(score =>
                  '<option value="' + score + '"' + (Number(value) === Number(score) ? " selected" : "") + '>' + score + '</option>'
                ).join("") +
              '</select>' +
            '</label>'
          );
        }).join("") +
      '</div>' +
      '<div class="creator-info-box"><strong>Після розподілу</strong><p>Бонуси раси та підраси будуть автоматично додані до цих значень.</p></div>' +
    '</section>'
  );
}

function renderClassStep(state) {
  const classes = Object.values(CLASSES);
  const summary = state.classId ? getClassSummary(state) : null;
  const subclassOptions = state.classId ? getSubclassOptions(state) : [];

  return (
    '<section class="creator-step">' +
      '<div class="creator-section-heading">' +
        '<h2>Клас</h2>' +
        '<p>Обери клас 1 рівня. Нижче одразу показуються кістка HP, ряткидки, володіння та стартові фічі.</p>' +
      '</div>' +
      '<div class="creator-choice-grid creator-class-grid">' +
        classes.map(cls =>
          '<button type="button" class="creator-card-button ' + (state.classId === cls.id ? "selected" : "") + '" data-creator-class="' + escapeHtml(cls.id) + '">' +
            '<strong>' + escapeHtml(cls.ukr ?? cls.name) + '</strong>' +
            '<span>d' + escapeHtml(cls.hitDie) + ' HP</span>' +
          '</button>'
        ).join("") +
      '</div>' +
      (state.classId && subclassOptions.length && isSubclassRequiredAtLevel1(state)
        ? '<section class="creator-subsection"><h3>Підклас / архетип</h3>' +
          '<div class="creator-choice-grid">' +
          subclassOptions.map(option =>
            '<button type="button" class="creator-card-button ' + (state.subclassId === option.id ? "selected" : "") + '" data-creator-subclass="' + escapeHtml(option.id) + '">' +
              '<strong>' + escapeHtml(option.ukr) + '</strong>' +
              '<small>' + escapeHtml(option.level1Features.map(f => f.ukr ?? f.name).join(", ") || "Без додаткової фічі на 1 рівні") + '</small>' +
            '</button>'
          ).join("") +
          '</div></section>'
        : "") +
      (summary ? renderClassSummary(summary) : "") +
    '</section>'
  );
}

function renderClassSummary(summary) {
  const saving = summary.savingThrows.map(id => STATS[id]?.short ?? id).join(", ");
  const weapons = summary.weaponProficiencies.map(id => typeof id === "string" ? id : id?.ukr ?? id?.name ?? id).map(id => CLASS_WEAPON_NAMES[id] ?? id).join(", ");
  const armor = summary.armorProficiencies.map(id => CLASS_ARMOR_NAMES[id] ?? id).join(", ");

  return (
    '<section class="creator-summary-card">' +
      '<div class="creator-class-highlight">' +
        '<strong>d' + escapeHtml(summary.hitDie) + '</strong><span>Hit Die</span>' +
      '</div>' +
      '<div class="creator-summary-lines">' +
        '<p><span>Ряткидки:</span> ' + escapeHtml(saving || "—") + '</p>' +
        '<p><span>Зброя:</span> ' + escapeHtml(weapons || "—") + '</p>' +
        '<p><span>Броня:</span> ' + escapeHtml(armor || "—") + '</p>' +
        (Array.isArray(summary.toolProficiencies)
          ? '<p><span>Інструменти:</span> ' + escapeHtml(summary.toolProficiencies.map(id => formatToolName(id)).join(", ") || "—") + '</p>'
          : "") +
        '<div class="creator-feature-list">' +
          summary.features.map(feature =>
            '<div><strong>' + escapeHtml(feature.ukr ?? feature.name) + '</strong><span>' + escapeHtml(feature.short ?? "") + '</span></div>'
          ).join("") +
        '</div>' +
        (summary.resources.length
          ? '<p><span>Ресурси 1 рівня:</span> ' + escapeHtml(summary.resources.map(item => item.id + ": " + item.value).join(", ")) + '</p>'
          : "") +
      '</div>' +
    '</section>'
  );
}

const CLASS_WEAPON_NAMES = {
  simple: "Проста зброя",
  martial: "Бойова зброя"
};

const CLASS_ARMOR_NAMES = {
  light: "Легка",
  medium: "Середня",
  heavy: "Важка",
  shield: "Щити"
};

function formatToolName(id) {
  return Object.values(CREATOR_TOOL_OPTIONS)
    .flat()
    .find(entry => entry[0] === id)?.[1] ?? id;
}

function renderClassChoicesStep(state) {
  const groups = getClassChoiceGroups(state);
  return (
    '<section class="creator-step">' +
      '<div class="creator-section-heading">' +
        '<h2>Навички та вибори</h2>' +
        '<p>Тут фіксуються всі рішення, які клас вимагає вже на 1 рівні.</p>' +
      '</div>' +
      '<div class="creator-choice-groups">' +
        groups.map(group => renderChoiceGroup(state, group)).join("") +
      '</div>' +
      (!groups.length ? '<div class="creator-info-box"><strong>Немає додаткових виборів</strong><p>Для цього класу на 1 рівні окремі вибори не потрібні.</p></div>' : "") +
    '</section>'
  );
}

function renderBackgroundStep(state) {
  const backgrounds = getBackgroundOptions();
  const recommended = getRecommendedBackgroundId(state);

  return (
    '<section class="creator-step">' +
      '<div class="creator-section-heading">' +
        '<h2>Походження</h2>' +
        '<p>Можеш взяти рекомендоване для класу походження або обрати будь-яке інше.</p>' +
      '</div>' +
      '<div class="creator-choice-grid creator-background-grid">' +
        backgrounds.map(background =>
          '<button type="button" class="creator-card-button ' + (state.backgroundId === background.id ? "selected" : "") + '" data-creator-background="' + escapeHtml(background.id) + '">' +
            '<strong>' + escapeHtml(background.ukr ?? background.name) + '</strong>' +
            (recommended === background.id ? '<span class="creator-recommended">Рекомендоване</span>' : "") +
            '<small>' + escapeHtml(background.description ?? "") + '</small>' +
            '<em>' + escapeHtml((background.skillProficiencies?.granted ?? []).join(", ")) + '</em>' +
          '</button>'
        ).join("") +
      '</div>' +
      (state.backgroundId
        ? '<section class="creator-background-detail">' +
            '<h3>' + escapeHtml(BACKGROUNDS[state.backgroundId]?.feature?.ukr ?? "Особливість") + '</h3>' +
            '<p>' + escapeHtml(BACKGROUNDS[state.backgroundId]?.feature?.description ?? "") + '</p>' +
            (getBackgroundChoiceGroups(state).length
              ? '<div class="creator-choice-groups">' + getBackgroundChoiceGroups(state).map(group => renderChoiceGroup(state, group)).join("") + '</div>'
              : "") +
          '</section>'
        : "") +
    '</section>'
  );
}

function renderEquipmentStep(state) {
  const groups = getEquipmentChoiceGroups(state);
  const classEquipment = CREATOR_CLASS_EQUIPMENT[state.classId];

  return (
    '<section class="creator-step">' +
      '<div class="creator-section-heading">' +
        '<h2>Спорядження</h2>' +
        '<p>Тут обираються всі варіанти стартового спорядження від класу та походження. Фіксовані предмети додаються автоматично.</p>' +
      '</div>' +
      '<section class="creator-info-box">' +
        '<strong>Клас — фіксоване</strong>' +
        '<p>' + escapeHtml((classEquipment?.fixed ?? []).map(item => getEntryLabel(item.source, item.itemId, item.customItem)).join(", ") || "—") + '</p>' +
      '</section>' +
      '<section class="creator-info-box">' +
        '<strong>Походження — фіксоване</strong>' +
        '<p>' + escapeHtml((BACKGROUNDS[state.backgroundId]?.startingEquipment?.fixed ?? []).map(item => item.name ?? item.id).join(", ") || "—") + '</p>' +
      '</section>' +
      '<div class="creator-choice-groups">' +
        groups.map(group => renderEquipmentGroup(state, group)).join("") +
      '</div>' +
      (!groups.length ? '<div class="creator-info-box"><strong>Немає варіантів</strong><p>Усе спорядження цього набору фіксоване.</p></div>' : "") +
    '</section>'
  );
}

function renderEquipmentGroup(state, group) {
  const selected = state.equipmentChoices[group.id];

  if (group.kind === "catalogMulti") {
    const values = Array.isArray(selected) ? selected : selected ? [selected] : [];
    return (
      '<label class="creator-field creator-equipment-field">' +
        '<span>' + escapeHtml(group.title) + ' <small>(оберіть ' + group.count + ')</small></span>' +
        '<select multiple size="7" data-creator-equipment-multi="' + escapeHtml(group.id) + '">' +
          group.options.map(option =>
            '<option value="' + escapeHtml(option.id) + '"' + (values.includes(option.id) ? " selected" : "") + '>' +
              escapeHtml(option.label) +
            '</option>'
          ).join("") +
        '</select>' +
      '</label>'
    );
  }

  return (
    '<section class="creator-equipment-choice">' +
      '<h3>' + escapeHtml(group.title) + '</h3>' +
      renderChoiceCards(
        group.options,
        Array.isArray(selected) ? selected[0] : selected,
        "equipment:" + group.id,
        false
      ).replace(/data-creator-choice-option="equipment:[^"]+"/g, 'data-creator-equipment-choice="' + escapeHtml(group.id) + '"')
    + '</section>'
  );
}

function getEntryLabel(source, itemId, customItem) {
  if (customItem?.ukr) return customItem.ukr;
  const item = getItemCatalog().find(entry => entry.source === source && entry.itemId === itemId);
  return item?.ukr ?? item?.name ?? itemId;
}

function renderMagicStep(state) {
  const requirements = getMagicRequirements(state);
  const cantrips = getSpellOptionsForCreator(state, 0);
  const spells = getSpellOptionsForCreator(state, 1);
  const selectedCantrips = state.magicChoices.cantrips ?? [];
  const selectedSpells = state.magicChoices.spells ?? [];

  return (
    '<section class="creator-step">' +
      '<div class="creator-section-heading">' +
        '<h2>Магія</h2>' +
        '<p>Обери те, що клас отримує вже на 1 рівні. Кількість визначається наявними даними класу та Creator.</p>' +
      '</div>' +
      (requirements.cantrips
        ? '<label class="creator-field"><span>Заговори <small>(оберіть ' + requirements.cantrips + ')</small></span>' +
          '<select multiple size="8" data-creator-magic="cantrips">' +
            cantrips.map(option =>
              '<option value="' + escapeHtml(option.id) + '"' + (selectedCantrips.includes(option.id) ? " selected" : "") + '>' + escapeHtml(option.label) + '</option>'
            ).join("") +
          '</select></label>'
        : "") +
      (requirements.spells
        ? '<label class="creator-field"><span>Закляття 1 рівня <small>(оберіть ' + requirements.spells + ')</small></span>' +
          '<select multiple size="8" data-creator-magic="spells">' +
            spells.map(option =>
              '<option value="' + escapeHtml(option.id) + '"' + (selectedSpells.includes(option.id) ? " selected" : "") + '>' + escapeHtml(option.label) + '</option>'
            ).join("") +
          '</select></label>'
        : "") +
    '</section>'
  );
}

function renderNameStep(state) {
  return (
    '<section class="creator-step">' +
      '<div class="creator-section-heading">' +
        '<h2>Ім\\'я персонажа</h2>' +
        '<p>Останній крок. Після створення персонаж одразу відкриється у Character Sheet.</p>' +
      '</div>' +
      '<label class="creator-name-field">' +
        '<span>Ім\\'я</span>' +
        '<input type="text" data-creator-name value="' + escapeHtml(state.name) + '" placeholder="Наприклад, Severus Grey" autocomplete="off">' +
      '</label>' +
      '<section class="creator-final-summary">' +
        '<div><span>Раса</span><strong>' + escapeHtml(state.raceId || "—") + '</strong></div>' +
        '<div><span>Клас</span><strong>' + escapeHtml(state.classId || "—") + '</strong></div>' +
        '<div><span>Походження</span><strong>' + escapeHtml(state.backgroundId || "—") + '</strong></div>' +
        '<div><span>Рівень</span><strong>1</strong></div>' +
      '</section>' +
    '</section>'
  );
}

function renderStep(state) {
  const current = getCurrentStep(state);
  switch (current.key) {
    case "race":
      return renderRaceStep(state);
    case "stats":
      return renderStatsStep(state);
    case "class":
      return renderClassStep(state);
    case "classChoices":
      return renderClassChoicesStep(state);
    case "background":
      return renderBackgroundStep(state);
    case "equipment":
      return renderEquipmentStep(state);
    case "magic":
      return renderMagicStep(state);
    case "name":
      return renderNameStep(state);
    default:
      return "";
  }
}

export function characterCreatorScreen(state) {
  const steps = getCreatorSteps(state);
  const index = Math.min(Math.max(Number(state.step ?? 0), 0), steps.length - 1);
  const atFirst = index === 0;
  const atLast = index === steps.length - 1;

  return (
    '<div class="app character-creator-app">' +
      '<header class="creator-header">' +
        '<button type="button" class="creator-close-button" data-creator-action="cancel" aria-label="Скасувати">×</button>' +
        renderProgress(state) +
      '</header>' +
      '<main class="character-creator">' +
        (state.error ? '<div class="creator-error">' + escapeHtml(state.error) + '</div>' : "") +
        renderStep(state) +
      '</main>' +
      '<footer class="creator-navigation">' +
        '<button type="button" class="creator-nav-button secondary" data-creator-action="' + (atFirst ? "cancel" : "back") + '">' +
          (atFirst ? "Скасувати" : "← Назад") +
        '</button>' +
        '<button type="button" class="creator-nav-button primary" data-creator-action="' + (atLast ? "create" : "next") + '">' +
          (atLast ? "Створити персонажа" : "Далі →") +
        '</button>' +
      '</footer>' +
    '</div>'
  );
}
