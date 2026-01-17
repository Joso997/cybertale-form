import { ObjectTemplate, ObjectType, ObjectTypeEnum, RegionType, RegionEnum, StatTypeEnum, GetStringStat } from '@cybertale/interface'

export class RadioComponentLogic {
  statTypeEnum = StatTypeEnum
  objectTypeEnum = ObjectTypeEnum
  objectType = ObjectType
  regionType = RegionType
  regionEnum = RegionEnum

  returnIfExists(object: ObjectTemplate, tag: number): string {
    return GetStringStat(object, tag as StatTypeEnum)
  }

  handleInput(object: ObjectTemplate, value: string) {
    this.regionType.RegionTypes[object.Region]
      .ObjectTypes[object.ObjectEnum]
      .ChooseSubType(object as ObjectTemplate, value)
  }
}
