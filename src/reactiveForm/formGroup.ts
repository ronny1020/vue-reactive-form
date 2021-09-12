/* eslint-disable no-use-before-define */

import { AvailableType } from '@/interfaces/availableType'
import { OptionalPropertiesObject, OptionalPropertyOf } from '@/interfaces/libs'
import { ComputedRef, computed } from 'vue'
import type {
  FormBuilder,
  FormControls,
  FormErrors,
  FormGroupGenericType,
  FormRefs,
  InputBuilder,
} from '../interfaces/form'
import FormControl from './formControl'
import AbstractControl from './abstractControl'

function isInputBuilder(
  builder: FormBuilder<FormGroupGenericType> | InputBuilder<AvailableType>
): builder is InputBuilder<AvailableType> {
  if (!builder) {
    return true
  }
  if (builder.constructor !== Object) {
    return true
  }
  if (
    Object.entries(builder).every(
      ([key, value]) => key === 'defaultValue' || (key === 'validators' && Array.isArray(value))
    )
  ) {
    return true
  }
  return false
}

function createFormControls<T extends FormGroupGenericType>(
  formBuilder: FormBuilder<T>
): FormControls<T> {
  return Object.fromEntries(
    Object.entries(formBuilder).map(([key, builder]) => {
      if (builder instanceof FormGroup) {
        return [key, builder]
      }
      if (isInputBuilder(builder)) {
        return [key, new FormControl(builder)]
      }
      return [key, new FormGroup(builder)]
    })
  ) as FormControls<T>
}

function createFormRefs<T extends FormGroupGenericType>(controls: FormControls<T>): FormRefs<T> {
  return Object.fromEntries(
    Object.entries(controls).map(([key, control]: [string, FormControls<T>]) => {
      return control instanceof FormGroup ? [key, control.refs] : [key, control.ref]
    })
  ) as FormRefs<T>
}

export default class FormGroup<T extends FormGroupGenericType> extends AbstractControl {
  controls: FormControls<T>

  refs: FormRefs<T>

  values: ComputedRef<T> = computed(
    () =>
      Object.fromEntries(
        Object.entries(this.controls).map(([key, control]) => {
          if (control instanceof FormGroup) {
            return [key, control.values.value]
          }

          return [key, (control as FormControl<AvailableType>).ref.value]
        })
      ) as T
  )

  constructor(private formBuilder: FormBuilder<T>) {
    super()
    this.controls = createFormControls<T>(formBuilder)
    this.refs = createFormRefs(this.controls)
  }

  dirty: ComputedRef<boolean> = computed(() =>
    Object.values(this.controls).some((control: FormControls<T>) => control.dirty)
  )

  errors: ComputedRef<FormErrors<T>> = computed(() => {
    const formErrors = Object.fromEntries(
      Object.entries(this.controls)
        .map(
          ([key, control]: [
            string,
            FormControl<AvailableType> | FormGroup<FormGroupGenericType>
          ]) => [key, control.errors.value]
        )
        .filter(([, errors]) => errors)
    )

    return Object.keys(formErrors).length ? formErrors : null
  })

  markAsDirty(): void {
    Object.values(this.controls).forEach(
      (control: FormControl<AvailableType> | FormGroup<FormGroupGenericType>) =>
        control.markAsDirty()
    )
  }

  markAsPristine(): void {
    Object.values(this.controls).forEach(
      (control: FormControl<AvailableType> | FormGroup<FormGroupGenericType>) =>
        control.markAsPristine()
    )
  }

  reset(): void {
    Object.values(this.controls).forEach(
      (control: FormControl<AvailableType> | FormGroup<FormGroupGenericType>) => control.reset()
    )
  }

  appendFormControl(formBuilder: FormBuilder<OptionalPropertiesObject<T>>): void {
    const newControls = createFormControls<OptionalPropertiesObject<T>>(formBuilder)

    this.controls = { ...this.controls, ...newControls }
    this.refs = { ...this.refs, ...createFormRefs(newControls) }
  }

  removeFormControl(key: OptionalPropertyOf<T> | OptionalPropertyOf<T>[]): void {
    const keys = Array.isArray(key) ? key : [key]

    keys.forEach((keyToRemove) => {
      delete this.controls[keyToRemove]
      delete this.refs[keyToRemove]
    })
  }
}
