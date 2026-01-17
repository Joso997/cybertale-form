import { ObjectTemplate, ParseJSON, RegionType, StatTypeEnum } from '@cybertale/interface'

import { LabelData } from './types'

export function applyValue(object: ObjectTemplate, value: unknown) {
  RegionType.RegionTypes[object.Region]
    .ObjectTypes[object.ObjectEnum]
    .ChooseSubType(object, value)
}

export function buildParsedStats(object: ObjectTemplate): Record<number, any> {
  const parsed: Record<number, any> = {}
  const stats = object.Stats ?? {}
  Object.entries(stats).forEach(([key, stat]) => {
    const parsedValue = ParseJSON(stat.Data as string | null | undefined)
    parsed[Number(key)] = parsedValue == null ? stat.Data : parsedValue
  })
  return parsed
}

export function getLabelData(value: unknown): LabelData | null {
  if (typeof value === 'object' && value !== null) {
    return value as LabelData
  }
  return null
}
