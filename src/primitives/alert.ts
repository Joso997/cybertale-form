import { GetStringStat, ObjectTemplate, StatTypeEnum } from '@cybertale/interface'

export function buildAlertModel(object: ObjectTemplate) {
  return {
    className: GetStringStat(object, StatTypeEnum.Design),
    text: GetStringStat(object, StatTypeEnum.Label)
  }
}
