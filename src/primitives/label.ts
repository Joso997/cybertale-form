import { GetStatData, GetStringStat, GetValue, ObjectTemplate, StatTypeEnum } from '@cybertale/interface'

import { getLabelData } from './shared'

function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (_m, r, g, b) => r + r + g + g + b + b)
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}

function getLuminance(rgb: { r: number; g: number; b: number }) {
  const a = [rgb.r, rgb.g, rgb.b].map((v) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

function getContrastRatio(luminance1: number, luminance2: number) {
  const lightest = Math.max(luminance1, luminance2)
  const darkest = Math.min(luminance1, luminance2)
  return (lightest + 0.05) / (darkest + 0.05)
}

function isDarkBackground(bgHex: string) {
  const bgRgb = hexToRgb(bgHex)
  if (!bgRgb) return false
  const bgLuminance = getLuminance(bgRgb)
  const whiteLuminance = getLuminance({ r: 255, g: 255, b: 255 })
  const blackLuminance = getLuminance({ r: 0, g: 0, b: 0 })

  const whiteContrast = getContrastRatio(bgLuminance, whiteLuminance)
  const blackContrast = getContrastRatio(bgLuminance, blackLuminance)

  return whiteContrast > blackContrast
}

function extractHexColor(styleData: string): string {
  const match = styleData.match(/background-color:\s*(#[0-9a-fA-F]{3,6})/)
  return match ? match[1] : ''
}

export function buildLabelModel(object: ObjectTemplate) {
  const showIcon = GetStatData(object, StatTypeEnum.ElementType) === 'icon'
  const labelValue = GetValue(object, StatTypeEnum.Label)
  const labelData = getLabelData(labelValue)
  const tooltip = GetStringStat(object, StatTypeEnum.Tooltip)
  const designClass = GetValue(object, StatTypeEnum.Design) as string

  const label = showIcon && labelData ? labelData.title : (labelValue as string)
  const iconClass = showIcon && labelData ? labelData.iconClass : ''
  const markValue = showIcon && labelData ? labelData.markValue : ''
  const styleData = showIcon && labelData ? labelData.styleData : ''
  const contentClass = showIcon && labelData ? labelData.contentClass : ''
  const contentValue = ''

  let markClass = ''
  if (showIcon && labelData) {
    const backgroundColor = labelData.styleData
    if (isDarkBackground(extractHexColor(backgroundColor))) {
      markClass = labelData.markClass + ' text-white'
    } else {
      markClass = labelData.markClass
    }
  }

  return {
    showIcon,
    designClass,
    label,
    iconClass,
    markValue,
    markClass,
    styleData,
    contentValue,
    contentClass,
    hidden: GetValue(object, StatTypeEnum.ElementType) === 'hidden',
    tooltip: tooltip || undefined
  }
}
