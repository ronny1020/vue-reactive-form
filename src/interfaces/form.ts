import { WritableComputedRef } from '@vue/runtime-core'
import type DynamicFormGroup from '../reactiveForm/dynamicFormGroup'
import type FormControl from '../reactiveForm/formControl'
import type FormGroup from '../reactiveForm/formGroup'
import { AvailableStringType, AvailableType, TypeFromString } from './stringType'
import { ValidationErrors, Validator } from './validator'

export type InputValueType = string | number | boolean
export type InputBuilder = {
  type?: AvailableStringType
  defaultValue?: AvailableType
  validators?: Validator[]
}

export type FormBuilder = {
  [key: string]: InputBuilder | FormGroup<FormBuilder> | DynamicFormGroup<FormBuilder>
}

export type FormControls<T> = {
  [K in keyof T]: T[K] extends FormGroup<FormBuilder> | DynamicFormGroup<FormBuilder>
    ? T[K]
    : T[K] extends InputBuilder
    ? FormControl<T[K]>
    : never
}

export type FormValue<T extends FormBuilder> = {
  [K in keyof T]: T[K] extends FormGroup<FormBuilder> | DynamicFormGroup<FormBuilder>
    ? T[K]['values']
    : T[K] extends InputBuilder
    ? TypeFromString<T[K]['type']>
    : never
}

export type DynamicFormRefs = {
  [key: string]: WritableComputedRef<AvailableStringType> | DynamicFormRefs | unknown
}

export type FormRefs<T extends FormBuilder> = {
  [K in keyof T]: T[K] extends FormGroup<FormBuilder> | DynamicFormGroup<FormBuilder>
    ? T[K]['refs']
    : T[K] extends InputBuilder
    ? WritableComputedRef<TypeFromString<T[K]['type']>>
    : unknown
}

export type FormErrors<T extends FormBuilder> = {
  [K in keyof T]: T[K] extends FormGroup<FormBuilder> | DynamicFormGroup<FormBuilder>
    ? T[K]['errors']
    : T[K] extends InputBuilder
    ? ValidationErrors
    : never
}
