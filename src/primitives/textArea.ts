import { GetStringStat, ObjectTemplate, StatTypeEnum } from '@cybertale/interface'

export function buildTextAreaModel(object: ObjectTemplate) {
  return {
    label: GetStringStat(object, StatTypeEnum.Label),
    tooltip: GetStringStat(object, StatTypeEnum.Tooltip),
    value: GetStringStat(object, StatTypeEnum.Value),
    setValue: (next: string) => {
      if (object.Stats?.[StatTypeEnum.Value]) {
        object.Stats[StatTypeEnum.Value].Data = next
      }
    }
  }
}
