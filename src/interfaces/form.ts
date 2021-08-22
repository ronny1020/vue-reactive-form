import { WritableComputedRef } from '@vue/runtime-core'
import { AvailableType, TypeFromString } from './stringType'

export type InputValueType = string | number | boolean
export type InputBuilder = {
  type: AvailableType
  defaultValue?: TypeFromString<AvailableType>
}

export type FormBuilder = {
  [key: string]: InputBuilder | FormBuilder
}

export type FormValue<T extends FormBuilder> = {
  [K in keyof T]: T[K] extends InputBuilder
    ? TypeFromString<T[K]['type']>
    : T[K] extends FormBuilder
    ? T[K]['value']
    : never
}

export type FormRefs<T extends FormBuilder> = {
  [K in keyof T]: T[K] extends InputBuilder
    ? WritableComputedRef<TypeFromString<T[K]['type']>>
    : T[K] extends FormBuilder
    ? FormRefs<T[K]>
    : never
}
