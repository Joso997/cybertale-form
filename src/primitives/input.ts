import {
  GetStatData,
  GetStringStat,
  GetValidationClass,
  GetValue,
  ObjectTemplate,
  StatTypeEnum
} from '@cybertale/interface'

import { applyValue } from './shared'

export function buildInputModel(object: ObjectTemplate) {
  return {
    id: GetStringStat(object, StatTypeEnum.Tag),
    name: GetStringStat(object, StatTypeEnum.Tag),
    type: (GetValue(object, StatTypeEnum.ElementType) as string) || 'text',
    placeholder: GetStringStat(object, StatTypeEnum.Placeholder),
    required: GetStatData(object, StatTypeEnum.Required, 'boolean') as boolean,
    disabled: GetStatData(object, StatTypeEnum.Disabled, 'boolean') as boolean,
    readOnly: GetStatData(object, StatTypeEnum.ReadOnly, 'boolean') as boolean,
    autocomplete: GetStringStat(object, StatTypeEnum.AutoComplete),
    value: GetValue(object, StatTypeEnum.Value, StatTypeEnum.ValueIndices),
    validationClass: GetValidationClass(object),
    select: (value: string) => applyValue(object, value)
  }
}
