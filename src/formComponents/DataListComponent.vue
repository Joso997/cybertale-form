<template>
  <input class="form-control" :list="object.Stats[statTypeEnum.BelongsTo].Data"
         :class="returnIfExists(statTypeEnum.Design) + ' ' + validate()"
         :required="attributeCheck(statTypeEnum.Required)"
         :disabled="attributeCheck(statTypeEnum.Disabled)"
         :type="returnIfExists(statTypeEnum.ElementType)"
         :value="`${object?.Stats[statTypeEnum.Value].Data !== null ? object.Stats[statTypeEnum.Value].Data.name === undefined ? valueName : object.Stats[statTypeEnum.Value].Data.name : ''}`"
         :placeholder="returnIfExists(statTypeEnum.Placeholder)"
         @input="inputEvent(object as ObjectTemplate, $event.target.value)">
  <datalist :id="object.Stats[statTypeEnum.BelongsTo].Data" v-if="displayOptions">
    <option v-for="(option, index) in options" :key="index" :value="option.name">{{ option.name }}</option>
  </datalist>
  <div class="invalid-feedback order-1">{{ returnIfExists(statTypeEnum.ErrorMessage) }}</div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { ObjectTemplate, ObjectType, ObjectTypeEnum, RegionEnum, RegionType, StatTypeEnum } from '@cybertale/interface'
import http from '@/http-common'

interface Option {
  id: number;
  name: string;
}

const MIN_SEARCH_LENGTH = 3;

@Options({
  computed: {
    ObjectTemplate () {
      return ObjectTemplate
    }
  },
  props: {
    object: ObjectTemplate
  }
})
export default class DataListComponent extends Vue {
  statTypeEnum = StatTypeEnum
  objectTypeEnum = ObjectTypeEnum
  objectType = ObjectType
  regionType = RegionType
  regionEnum = RegionEnum
  object!: ObjectTemplate
  displayOptions = false
  options: Option[] = []

  returnIfExists (tag: number): string {
    return this.object.Stats[tag]?.Data ?? ''
  }

  async created() {
    await this.fetchOptions();
  }

  // Extract the logic for fetching options data into a separate method
  async fetchOptions() {
    try {
      const parsedObject: { link?: string } = JSON.parse(this.object.Stats[this.statTypeEnum.ItemList].Data)[0];
      if (parsedObject.link) {
        const response = await http.get(parsedObject.link + '/' + this.object.Stats[this.statTypeEnum.Name].Data);
        this.options = response.data;
        this.displayOptions = true;
      } else {
        this.options = JSON.parse(this.object.Stats[this.statTypeEnum.ItemList].Data);
      }
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    }
  }

  getValue (statEnum: number, indexStatTypeEnum = StatTypeEnum.Option) : string {
    if (this.object.Stats[statEnum]) {
      if (this.object.Stats[indexStatTypeEnum] && this.object.Stats[statEnum] && isValidJSON(this.object.Stats[statEnum].Data)) {
        const data = JSON.parse(this.object.Stats[statEnum].Data)
        return data[Number(this.object.Stats[indexStatTypeEnum].Data)]
      } else {
        return this.object.Stats[statEnum].Data
      }
    }
    return ''
  }

  get valueName (): string {
    const temp = this.options.find((option: any) => option.id === this.getValue(StatTypeEnum.Value, StatTypeEnum.ValueIndices))
    return temp?.name ?? this.getValue(StatTypeEnum.Value, StatTypeEnum.ValueIndices)
  }

  attributeCheck (statType : number) : boolean | string {
    return this.object.Stats[statType]?.Data ?? false
  }

  validate () : string {
    if (this.object.Stats[this.statTypeEnum.IsValid] === undefined) { return '' }
    if (this.object.Stats[this.statTypeEnum.IsValid].Data === '') { return '' }
    if (this.object.Stats[this.statTypeEnum.IsValid].Data) { return 'is-valid' }
    if (this.object.Stats[this.statTypeEnum.ErrorMessage].Data === null) { return '' }
    if (this.object.Stats[this.statTypeEnum.ErrorMessage].Data !== '') { return 'is-invalid' }
    return ''
  }

  inputEvent (object: ObjectTemplate, value: string) : void {
    this.displayOptions = value.length >= MIN_SEARCH_LENGTH
    this.regionType.RegionTypes[object.Region].ObjectTypes[object.ObjectEnum].ChooseSubType(object, value)
  }

  isSelected (id : string) : boolean { //previously check
    return this.object.Stats[this.statTypeEnum.Value]?.Data === id.toString()
  }

}

// Utility function to check if a string is valid JSON
function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
