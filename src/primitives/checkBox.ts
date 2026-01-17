import {
  GetStatData,
  GetStringStat,
  GetValidationClass,
  GetValue,
  ObjectTemplate,
  StatTypeEnum
} from '@cybertale/interface'

import { applyValue } from './shared'

export function buildCheckBoxModel(object: ObjectTemplate) {
  return {
    designClass: GetStringStat(object, StatTypeEnum.Design),
    checked: GetValue(object, StatTypeEnum.Value, StatTypeEnum.ValueIndices),
    name: GetStringStat(object, StatTypeEnum.Tag),
    id: GetStringStat(object, StatTypeEnum.Tag),
    required: GetStatData(object, StatTypeEnum.Required, 'boolean') as boolean,
    disabled: GetStatData(object, StatTypeEnum.Disabled, 'boolean') as boolean,
    label: GetStringStat(object, StatTypeEnum.Label),
    validationClass: GetValidationClass(object),
    errorMessage: GetStringStat(object, StatTypeEnum.ErrorMessage),
    select: (checked: boolean) => applyValue(object, checked)
  }
}
