// index.d.ts
import { DefineComponent } from 'vue';

declare module 'vue' {
  export interface AlertComponent extends DefineComponent {}
  export interface ButtonComponent extends DefineComponent {}
  export interface CheckBoxComponent extends DefineComponent {}
  export interface DataListComponent extends DefineComponent {}
  export interface FieldComponent extends DefineComponent {}
  export interface LabelComponent extends DefineComponent {}
  export interface RadioComponent extends DefineComponent {}
  export interface SelectListComponent extends DefineComponent {}
}

export { AlertComponent, ButtonComponent, CheckBoxComponent, DataListComponent, FieldComponent, LabelComponent, RadioComponent, SelectListComponent };
