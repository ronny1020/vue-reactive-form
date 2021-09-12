/* eslint-disable no-use-before-define */
import { Ref } from '@vue/runtime-core'
import FormGroup from '../reactiveForm/formGroup'
import type FormControl from '../reactiveForm/formControl'
import { AvailableType } from './availableType'
import { ValidationErrors, Validator } from './validator'

export type InputBuilder<T extends AvailableType> = {
  defaultValue?: T
  validators?: Validator<T>[]
}

export interface FormGroupGenericType {
  [key: string]: AvailableType | FormGroupGenericType | FormGroup<FormGroupGenericType>
}

export type FormBuilder<T extends FormGroupGenericType> = {
  [K in keyof T]: T[K] extends AvailableType
    ? InputBuilder<T[K]> | T[K]
    : T[K] extends FormGroupGenericType
    ? FormBuilder<T[K]> | FormGroup<T[K]>
    : never
}

export type FormControls<T extends FormGroupGenericType> = {
  [K in keyof T]: T[K] extends AvailableType
    ? FormControl<T[K]>
    : T[K] extends FormGroupGenericType
    ? FormGroup<T[K]>
    : T[K] extends FormGroup<FormGroupGenericType>
    ? T[K]
    : unknown
}

export type FormRefs<T extends FormGroupGenericType> = {
  [K in keyof T]: T[K] extends AvailableType
    ? Ref<T[K]>
    : T[K] extends FormGroupGenericType
    ? FormGroup<T[K]>['refs']
    : unknown
}

export type FormErrors<T extends FormGroupGenericType> = {
  [K in keyof T]: T[K] extends AvailableType
    ? ValidationErrors
    : T[K] extends FormGroupGenericType
    ? FormGroup<T[K]>['errors']
    : never
}
