/* eslint-disable no-use-before-define */

import { computed, ComputedRef } from 'vue'
import { FormBuilder, FormErrors, FormRefs, FormValue, InputBuilder } from '../interfaces/form'
import AbstractControl from './abstractControl'
import FormControl from './formControl'

type FormControls<T> = {
  [K in keyof T]: T[K] extends InputBuilder
    ? FormControl<T[K]>
    : T[K] extends FormBuilder
    ? FormGroup<T[K]>
    : never
}

function createFormControls<T extends FormBuilder>(formBuilder: T): FormControls<T> {
  return Object.fromEntries(
    Object.entries(formBuilder).map(([key, builder]) =>
      'type' in builder
        ? [key, new FormControl(builder as InputBuilder)]
        : [key, new FormGroup(builder)]
    )
  )
}

export default class FormGroup<T extends FormBuilder> extends AbstractControl {
  controls: FormControls<T>

  refs: FormRefs<T>

  values: ComputedRef<FormValue<T>> = computed(
    () =>
      Object.fromEntries(
        Object.entries(this.controls).map(([key, control]) => {
          if (control instanceof FormGroup) {
            return [key, control.values.value]
          }

          return [key, control.ref.value]
        })
      ) as FormValue<T>
  )

  dirty: ComputedRef<boolean> = computed(() =>
    Object.values(this.controls).some((control: FormControl<InputBuilder>) => control.dirty)
  )

  errors: ComputedRef<FormErrors<T>> = computed(() => {
    const formErrors = Object.fromEntries(
      Object.entries(this.controls)
        .map(([key, control]: [string, FormControl<InputBuilder> | FormGroup<FormBuilder>]) => [
          key,
          control.errors.value,
        ])
        .filter(([, errors]) => errors)
    ) as FormErrors<T>

    return Object.keys(formErrors).length ? formErrors : null
  })

  constructor(private formBuilders: T) {
    super()
    this.controls = createFormControls(formBuilders)

    this.refs = Object.fromEntries(
      Object.entries(this.controls).map(
        ([key, control]: [string, FormControl<InputBuilder> | FormGroup<FormBuilder>]) => {
          if (control instanceof FormGroup) {
            return [key, control.refs]
          }

          return [
            key,
            computed({
              get: () => control.ref.value,
              set(newValue) {
                // eslint-disable-next-line no-param-reassign
                control.ref.value = newValue
              },
            }),
          ]
        }
      )
    ) as FormRefs<T>
  }

  markAsDirty(): void {
    Object.values(this.controls).forEach(
      (control: FormControl<InputBuilder> | FormGroup<FormBuilder>) => control.markAsDirty()
    )
  }

  markAsPristine(): void {
    Object.values(this.controls).forEach(
      (control: FormControl<InputBuilder> | FormGroup<FormBuilder>) => control.markAsPristine()
    )
  }
}
