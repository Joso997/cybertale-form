import { GetRawStat, GetStringStat, ObjectTemplate, StatTypeEnum } from '@cybertale/interface'

import { applyValue } from './shared'
import { RadioOption } from './types'

export function buildRadioModel(object: ObjectTemplate) {
  const itemListRaw = GetStringStat(object, StatTypeEnum.ItemList)
  const name = GetStringStat(object, StatTypeEnum.Name)
  const tag = GetStringStat(object, StatTypeEnum.Tag)
  const isGroup = itemListRaw !== '' && name === ''
  const items = isGroup ? (JSON.parse(itemListRaw) as RadioOption[]) : []

  const isChecked = (candidate: unknown) => GetRawStat(object, StatTypeEnum.Value) === candidate

  return {
    className: GetStringStat(object, StatTypeEnum.Design),
    isGroup,
    items,
    groupName: tag,
    name,
    singleValue: itemListRaw,
    singleLabel: itemListRaw,
    isChecked,
    select: (value: unknown) => applyValue(object, value)
  }
}
