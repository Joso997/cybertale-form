import {
  GetRawStat,
  GetStatData,
  GetStringStat,
  GetValidationClass,
  GetValue,
  ObjectTemplate,
  StatTypeEnum
} from '@cybertale/interface'

import { applyValue } from './shared'

export function buildDataListModel(object: ObjectTemplate) {
  return {
    belongsTo: GetStringStat(object, StatTypeEnum.BelongsTo),
    tag: GetStringStat(object, StatTypeEnum.Tag),
    name: GetStringStat(object, StatTypeEnum.Name),
    designClass: GetStringStat(object, StatTypeEnum.Design),
    required: GetStatData(object, StatTypeEnum.Required, 'boolean') as boolean,
    disabled: GetStatData(object, StatTypeEnum.Disabled, 'boolean') as boolean,
    type: GetStringStat(object, StatTypeEnum.ElementType),
    placeholder: GetStringStat(object, StatTypeEnum.Placeholder),
    validationClass: GetValidationClass(object),
    errorMessage: GetStringStat(object, StatTypeEnum.ErrorMessage),
    rawValue: GetRawStat(object, StatTypeEnum.Value),
    selectedValue: GetValue(object, StatTypeEnum.Value, StatTypeEnum.ValueIndices),
    itemListRaw: GetStringStat(object, StatTypeEnum.ItemList),
    setItemListRaw: (value: string) => {
      if (object.Stats?.[StatTypeEnum.ItemList]) {
        object.Stats[StatTypeEnum.ItemList].Data = value
      }
    },
    select: (value: string) => applyValue(object, value)
  }
}
