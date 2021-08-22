import { WritableComputedRef } from '@vue/runtime-core'
import { AvailableStringType, AvailableType, TypeFromString } from './stringType'
import { ValidationErrors, Validator } from './validator'

export type InputValueType = string | number | boolean
export type InputBuilder = {
  type: AvailableStringType
  defaultValue?: AvailableType
  validators?: Validator[]
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

export type FormErrors<T extends FormBuilder> = {
  [K in keyof T]: T[K] extends InputBuilder
    ? ValidationErrors
    : T[K] extends FormBuilder
    ? FormErrors<T[K]>
    : never
}
