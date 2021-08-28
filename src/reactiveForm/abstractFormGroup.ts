/* eslint-disable no-use-before-define */

import { computed, ComputedRef } from 'vue'
import {
  DynamicFormRefs,
  FormBuilder,
  FormErrors,
  FormValue,
  InputBuilder,
} from '../interfaces/form'
import AbstractControl from './abstractControl'
import FormControl from './formControl'

export default abstract class AbstractFormGroup<T extends FormBuilder> extends AbstractControl {
  controls: Record<string, FormControl<InputBuilder> | AbstractFormGroup<FormBuilder>>

  refs: DynamicFormRefs

  values: ComputedRef<FormValue<T>> = computed(
    () =>
      Object.fromEntries(
        Object.entries(this.controls).map(([key, control]) => {
          if (control instanceof AbstractFormGroup) {
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
        .map(
          ([key, control]: [
            string,
            FormControl<InputBuilder> | AbstractFormGroup<FormBuilder>
          ]) => [key, control.errors.value]
        )
        .filter(([, errors]) => errors)
    ) as FormErrors<T>

    return Object.keys(formErrors).length ? formErrors : null
  })

  markAsDirty(): void {
    Object.values(this.controls).forEach(
      (control: FormControl<InputBuilder> | AbstractFormGroup<FormBuilder>) => control.markAsDirty()
    )
  }

  markAsPristine(): void {
    Object.values(this.controls).forEach(
      (control: FormControl<InputBuilder> | AbstractFormGroup<FormBuilder>) =>
        control.markAsPristine()
    )
  }

  reset(): void {
    Object.values(this.controls).forEach(
      (control: FormControl<InputBuilder> | AbstractFormGroup<FormBuilder>) => control.reset()
    )
  }
}
