import { GetStatData, GetValidationClass, GetValue, ObjectTemplate, StatTypeEnum } from '@cybertale/interface'

import { applyValue } from './shared'

export function buildFieldModel(object: ObjectTemplate) {
  return {
    tag: GetStatData(object, StatTypeEnum.Tag) as string,
    label: GetStatData(object, StatTypeEnum.Label) as string,
    required: GetStatData(object, StatTypeEnum.Required, 'boolean') as boolean,
    disabled: !!GetValue(object, StatTypeEnum.Disabled),
    readOnly: GetStatData(object, StatTypeEnum.ReadOnly, 'boolean') as boolean,
    autocomplete: GetStatData(object, StatTypeEnum.AutoComplete) as string,
    type: GetValue(object, StatTypeEnum.ElementType) as string,
    value: GetValue(object, StatTypeEnum.Value, StatTypeEnum.ValueIndices) as string,
    placeholder: GetStatData(object, StatTypeEnum.Placeholder) as string,
    maxLength: GetStatData(object, StatTypeEnum.MaxLength) as string,
    minLength: GetStatData(object, StatTypeEnum.MinLength) as string,
    min: GetStatData(object, StatTypeEnum.Min) as string,
    max: GetStatData(object, StatTypeEnum.Max) as string,
    step: GetStatData(object, StatTypeEnum.Step) as string,
    pattern: GetStatData(object, StatTypeEnum.Pattern) as string,
    helpText: GetStatData(object, StatTypeEnum.HelpText) as string,
    leadingIcon: GetStatData(object, StatTypeEnum.LeadingIcon) as string,
    trailingIcon: GetStatData(object, StatTypeEnum.TrailingIcon) as string,
    validationClass: GetValidationClass(object),
    bootstrapClass: GetValue(object, StatTypeEnum.Design) as string,
    errorMessage: GetStatData(object, StatTypeEnum.ErrorMessage) as string,
    select: (value: string) => applyValue(object, value)
  }
}
