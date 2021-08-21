/* eslint-disable no-use-before-define */

import { computed, ComputedRef } from 'vue'
import { FormBuilder, FormRefs, FormValue, InputBuilder } from '../interfaces/form'
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
      'value' in builder
        ? [key, new FormControl(builder as InputBuilder)]
        : [key, new FormGroup(builder)]
    )
  )
}

export default class FormGroup<T extends FormBuilder> {
  controls: FormControls<T>

  refs: FormRefs<T>

  value: ComputedRef<FormValue<T>> = computed(
    () =>
      Object.fromEntries(
        Object.entries(this.controls).map(([key, control]) => {
          if (control instanceof FormGroup) {
            return [key, control.value.value]
          }

          return [key, control.ref.value]
        })
      ) as FormValue<T>
  )

  constructor(private formBuilders: T) {
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
}
