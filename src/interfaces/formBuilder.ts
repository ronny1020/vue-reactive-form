import { WritableComputedRef } from '@vue/runtime-core'

export type InputValueType = string | number | boolean
export interface InputBuilder {
  value: InputValueType
}

export type FormBuilder = Record<string, InputBuilder>

export type FormValue<T extends FormBuilder> = {
  [K in keyof T]: T[K]['value']
}

export type FormRefs<T extends FormBuilder> = { [K in keyof T]: WritableComputedRef<T[K]['value']> }
