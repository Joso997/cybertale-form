import { GetValidationClass, GetValue, ObjectTemplate, StatTypeEnum } from '@cybertale/interface'

import { applyValue, buildParsedStats } from './shared'

export function buildMarkdownModel(object: ObjectTemplate) {
  const parsedStats = buildParsedStats(object)
  return {
    design: parsedStats[StatTypeEnum.Design],
    placeholder: parsedStats[StatTypeEnum.Placeholder],
    required: parsedStats[StatTypeEnum.Required],
    disabled: parsedStats[StatTypeEnum.Disabled],
    validationClass: GetValidationClass(object),
    value: GetValue(object, StatTypeEnum.Value, StatTypeEnum.ValueIndices),
    select: (value: unknown) => applyValue(object, value)
  }
}
