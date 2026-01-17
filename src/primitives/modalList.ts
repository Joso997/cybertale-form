import { GetValidationClass, GetValue, ObjectTemplate, StatTypeEnum } from '@cybertale/interface'

import { applyValue, buildParsedStats } from './shared'

export function buildModalListModel(object: ObjectTemplate) {
  const parsedStats = buildParsedStats(object)
  const value = GetValue(object, StatTypeEnum.Value, StatTypeEnum.ValueIndices)
  const valueName = value && typeof value === 'object' && 'name' in value
    ? (value as { name: string }).name
    : (value as string)
  const valueIcon = value && typeof value === 'object' && 'id' in value
    ? (value as { id: string }).id
    : (value as string)

  return {
    design: parsedStats[StatTypeEnum.Design],
    placeholder: parsedStats[StatTypeEnum.Placeholder],
    required: parsedStats[StatTypeEnum.Required],
    disabled: parsedStats[StatTypeEnum.Disabled],
    elementType: parsedStats[StatTypeEnum.ElementType],
    itemList: parsedStats[StatTypeEnum.ItemList],
    name: parsedStats[StatTypeEnum.Name],
    validationClass: GetValidationClass(object),
    value,
    valueName,
    valueIcon,
    setItemListRaw: (raw: string) => {
      if (object.Stats?.[StatTypeEnum.ItemList]) {
        object.Stats[StatTypeEnum.ItemList].Data = raw
      }
    },
    select: (next: string) => applyValue(object, next)
  }
}
