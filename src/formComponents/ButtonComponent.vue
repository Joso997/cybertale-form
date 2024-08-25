<template v-if="renderComponent">
  <button
    data-bs-toggle="tooltip"
    data-bs-placement="top"
    :data-bs-title="tooltipText"
    :hidden="isHidden"
    :disabled="isDisabled"
    :class="buttonClass"
    @click.prevent="handleClick"
  >
    <span class="order-2">{{ buttonLabel }}</span>
    <i v-if="showIcon" :class="iconClass"></i>
  </button>
  <slot></slot>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'
import { ObjectTemplate, ObjectTypeEnum, RegionEnum, RegionType, StatTypeEnum } from '@cybertale/interface'

interface LabelData {
  iconClass: string;
  title: string;
}
@Component
export default class ButtonComponent extends Vue {
  @Prop() object!: ObjectTemplate

  // Enums
  StatTypeEnum = StatTypeEnum
  ObjectTypeEnum = ObjectTypeEnum
  RegionEnum = RegionEnum
  btnClass = ''

  renderComponent = false

  // Computed properties
  get tooltipText(): string | undefined {
    return this.getStatData(StatTypeEnum.Tooltip)
  }

  get isHidden(): boolean {
    return this.getStatData(StatTypeEnum.ElementType) === 'hidden'
  }

  get isDisabled(): boolean {
    return !!this.getStatData(StatTypeEnum.Disabled, 'boolean')
  }

  get buttonClass(): string {
    const temp = this.getValue(StatTypeEnum.Design) as string
    return temp
  }

  get buttonLabel(): string {
    if(this.showIcon){
      const value = this.getValue(StatTypeEnum.Label) as LabelData
      return value.title
    }
    return this.getValue(StatTypeEnum.Label) as string
  }

  get showIcon(): boolean {
    return this.getStatData(StatTypeEnum.ElementType) === 'icon'
  }

  get iconClass(): string {
    if(this.showIcon){
      const value = this.getValue(StatTypeEnum.Label) as LabelData
      return value.iconClass
    }
    return this.getValue(StatTypeEnum.Label)
  }

  // Methods
  handleClick(): void {
    const { Region, ObjectEnum } = this.object
    RegionType.RegionTypes[Region].ObjectTypes[ObjectEnum].ChooseSubType(this.object)
  }

  getValue( statEnum: StatTypeEnum, indexStatTypeEnum = StatTypeEnum.Option): string | LabelData {
    const tempData:string = this.getStatData(statEnum) as string
    if (!tempData) return '';

    if (this.statIsDefined(indexStatTypeEnum) && this.isJSON(tempData)) {
      const data = JSON.parse(tempData);
      const optionData = this.getStatData(indexStatTypeEnum) as string
      if(this.isJSON(optionData)){
        const parsedOptionData = JSON.parse(optionData)[Number(this.object.Stats[StatTypeEnum.OptionIndices].Data)]
        return data[Number(parsedOptionData)] || '';
      }
      return data[Number(this.getStatData(indexStatTypeEnum))] || '';
    }

    return tempData;
  }

  statIsDefined (statType: StatTypeEnum): boolean {
    return !!this.object.Stats[statType]
  }

  getStatData(statType: StatTypeEnum, returnType: 'boolean' | 'string' = 'string'): boolean | string {
    try {
      const data = this.object.Stats[statType]?.Data ?? ''
      return returnType === 'boolean' ? !!data : data
    } catch (error) {
      console.error(`Error accessing data for statType ${statType}:`, error)
      return returnType === 'boolean' ? false : ''
    }
  }

  isJSON(str: string): boolean {
    try {
      return Array.isArray(JSON.parse(str))
    } catch {
      return false
    }
  }
}
</script>

<style scoped>
/* Add your scoped styles here */
</style>
