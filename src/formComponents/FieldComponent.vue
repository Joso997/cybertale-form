<template>
  <input
    class="form-control"
    :id="getStatData(StatTypeEnum.Tag)"
    :required="getStatData(StatTypeEnum.Required, 'boolean')"
    :disabled="getStatData(StatTypeEnum.Disabled, 'boolean')"
    :autocomplete="getStatData(StatTypeEnum.AutoComplete)"
    :class="[getStatData(StatTypeEnum.Design), validationClass]"
    :type="getInputType()"
    :value="computedValue"
    :placeholder="getStatData(StatTypeEnum.Placeholder)"
    @input="handleInput"
  />
  <div v-if="showErrorMessage" class="invalid-feedback">
    {{ getStatData(StatTypeEnum.ErrorMessage) }}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-facing-decorator'
import { ObjectTemplate, ObjectType, ObjectTypeEnum, RegionEnum, RegionType, StatTypeEnum } from '@cybertale/interface'

@Component
export default class FieldComponent extends Vue {
  @Prop() object!: ObjectTemplate

  // Enums
  StatTypeEnum = StatTypeEnum
  ObjectTypeEnum = ObjectTypeEnum
  RegionEnum = RegionEnum

  // Computed properties
  get computedValue(): string {
    if (this.isLabelDisabled) {
      return this.getStatData(StatTypeEnum.Label)
    }
    return this.getValue(StatTypeEnum.Value, StatTypeEnum.ValueIndices)
  }

  get isLabelDisabled(): boolean {
    return this.getStatData(StatTypeEnum.Tag).includes('label') &&
      this.getStatData(StatTypeEnum.Disabled, 'boolean')
  }

  get validationClass(): string {
    const isValid = this.getStatData(StatTypeEnum.IsValid, 'boolean')
    const errorMessage = this.getStatData(StatTypeEnum.ErrorMessage)

    if (isValid === undefined || isValid === '') return ''
    if (isValid) return 'is-valid'
    if (errorMessage) return 'is-invalid'
    return ''
  }

  get showErrorMessage(): boolean {
    return this.validationClass === 'is-invalid'
  }

  // Methods
  getInputType(): string {
    return this.getValue(StatTypeEnum.ElementType)
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement
    const { Region, ObjectEnum } = this.object
    console.log(target.value)
    RegionType.RegionTypes[Region].ObjectTypes[ObjectEnum].ChooseSubType(this.object, target.value)
  }

  getValue( statEnum: StatTypeEnum, indexStatTypeEnum = StatTypeEnum.Option): string {
    const tempData:string = this.getStatData(statEnum)
    if (!tempData) return '';

    if (this.statIsDefined(indexStatTypeEnum) && this.isJSON(tempData)) {
      const data = JSON.parse(tempData);
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

  tooltipCase(): string | undefined {
    return this.object?.Stats[StatTypeEnum.Tooltip]?.Data
  }
}
</script>
