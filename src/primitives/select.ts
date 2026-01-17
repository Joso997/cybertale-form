import {
  GetStatData,
  GetStringStat,
  GetValidationClass,
  GetValue,
  ObjectTemplate,
  ParseJSON,
  StatTypeEnum
} from '@cybertale/interface'

import { applyValue } from './shared'
import { SelectOption } from './types'

export function buildSelectModel(object: ObjectTemplate) {
  const itemListRaw = GetStringStat(object, StatTypeEnum.ItemList)
  const items = ParseJSON<SelectOption[]>(itemListRaw) ?? []
  const selected = GetValue(object, StatTypeEnum.Value, StatTypeEnum.ValueIndices)

  return {
    name: GetStringStat(object, StatTypeEnum.Tag),
    hidden: GetValue(object, StatTypeEnum.ElementType) === 'hidden',
    required: GetStatData(object, StatTypeEnum.Required, 'boolean') as boolean,
    disabled: GetStatData(object, StatTypeEnum.Disabled, 'boolean') as boolean,
    autocomplete: GetStringStat(object, StatTypeEnum.AutoComplete),
    validationClass: GetValidationClass(object),
    errorMessage: GetStringStat(object, StatTypeEnum.ErrorMessage),
    items,
    isSelected: (id: string | number) => selected === id.toString(),
    placeholderSelected: GetStatData(object, StatTypeEnum.Value, 'boolean') as boolean,
    select: (value: string) => applyValue(object, value)
  }
}
