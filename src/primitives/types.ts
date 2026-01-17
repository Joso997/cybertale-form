export interface LabelData {
  styleData: string
  iconClass: string
  title: string
  markValue: string
  markClass: string
  contentValue: string
  contentClass: string
  distanceFromSea: string
  translate: string
  number: string
}

export interface TooltipData {
  toggleBy: string
  value: string
  translate?: string
}

export interface SelectOption {
  id: string | number
  name: string
}

export interface RadioOption {
  id: string | number
  name: string
}
