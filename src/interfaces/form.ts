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
  [key: string]: AvailableType | FormGroupGenericType | FormGroup<FormGroupGenericType> | undefined
}

export type FormBuilder<T extends FormGroupGenericType> = {
  [K in keyof T]: T[K] extends AvailableType | undefined
    ? InputBuilder<T[K]> | T[K] | null
    : T[K] extends FormGroupGenericType
    ? FormBuilder<T[K]> | FormGroup<T[K]>
    : never
}

export type FormControls<T extends FormGroupGenericType> = {
  [K in keyof T]: T[K] extends AvailableType | undefined
    ? FormControl<T[K]>
    : T[K] extends FormGroupGenericType
    ? FormGroup<T[K]>
    : T[K] extends FormGroup<FormGroupGenericType>
    ? T[K]
    : never
}

export type FormRefs<T extends FormGroupGenericType> = {
  [K in keyof T]: T[K] extends AvailableType | undefined
    ? Ref<T[K]>
    : T[K] extends FormGroupGenericType
    ? FormGroup<T[K]>['refs']
    : never
}

export type FormErrors<T extends FormGroupGenericType> = {
  [K in keyof T]: T[K] extends AvailableType | undefined
    ? ValidationErrors
    : T[K] extends FormGroupGenericType
    ? FormGroup<T[K]>['errors']
    : never
}
