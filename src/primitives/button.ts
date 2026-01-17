import { GetStatData, GetStringStat, GetValue, ObjectTemplate, StatTypeEnum } from '@cybertale/interface'

import { getLabelData } from './shared'
import { TooltipData } from './types'

export function buildButtonModel(object: ObjectTemplate, currentPath = '') {
  const tooltip = GetValue(object, StatTypeEnum.Tooltip) as TooltipData | string
  const tooltipToggleBy = typeof tooltip === 'string' ? 'tooltip' : tooltip.toggleBy
  const tooltipText = typeof tooltip === 'string' ? tooltip : tooltip.value
  const labelValue = GetValue(object, StatTypeEnum.Label)
  const labelData = getLabelData(labelValue)
  const tag = GetStringStat(object, StatTypeEnum.Tag)

  let label = ''
  if (labelData && 'title' in labelData) {
    label = labelData.title
  } else {
    label = labelValue as string
  }

  const lowerLabel = label.toLowerCase()
  if ((tag === 'buttonDelete' || lowerLabel.includes('delete') || lowerLabel.includes('izbri\u0161i')) && !currentPath.includes('add')) {
    label = '<i class="fa-solid fa-trash-alt"></i> ' + label
  } else if (tag === 'buttonEdit' || lowerLabel.includes('edit') || lowerLabel.includes('uredi')) {
    label = '<i class="fa-solid fa-edit"></i> ' + label
  } else if (tag === 'buttonMap' || lowerLabel.includes('kart')) {
    label = '<i class="fa-solid fa-map-marker-alt"></i> ' + label
  }

  const showIcon = GetStatData(object, StatTypeEnum.ElementType) === 'icon'
  const iconClass = showIcon && labelData ? labelData.iconClass : (labelValue as string)
  const styleData = showIcon && labelData ? labelData.styleData : (labelValue as string)
  const contentClass = showIcon && labelData ? labelData.contentClass : ''

  return {
    tooltipToggleBy,
    tooltipText,
    isHidden: GetStatData(object, StatTypeEnum.ElementType) === 'hidden',
    isDisabled: GetStatData(object, StatTypeEnum.Disabled, 'boolean') as boolean,
    buttonClass: GetValue(object, StatTypeEnum.Design) as string,
    buttonLabel: label,
    showIcon,
    iconClass,
    styleData,
    contentClass,
    contentValue: ''
  }
}
