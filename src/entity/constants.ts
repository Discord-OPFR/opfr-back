import { EQUIPMENT_TYPE } from '@opfr/definitions';

export const ITEM_TYPES = [
  'boost',
  'bottle',
  'repair',
  'chest',
  'scroll',
  'object',
  'store',
  'cookedMeal',
  'enchant',
  'alcohol',
];

export const ENTITY_TYPES = [...ITEM_TYPES, ...EQUIPMENT_TYPE];

export const ENTITY_CATEGORY = ['item', 'resource', 'equipment', 'enchant'];

export const ITEM_CATEGORY = ['item', 'resource', 'enchant'];
