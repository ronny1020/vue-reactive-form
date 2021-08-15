import { computed, ComputedRef } from 'vue'
import { FormRefs, FormValue, InputBuilder } from '../interfaces/formBuilder'
import FormControl from './formControl'

export default class ReactiveForm<T extends Record<string, InputBuilder>> {
  controls: { [K in keyof T]: FormControl<T[K]> }

  refs: FormRefs<T>

  value: ComputedRef<FormValue<T>> = computed(
    () =>
      Object.fromEntries(
        Object.entries(this.controls).map(([key, control]) => [key, control.ref.value])
      ) as FormValue<T>
  )

  constructor(private formBuilders: T) {
    this.controls = Object.fromEntries(
      Object.entries(formBuilders).map(([key, inputBuilder]) => [
        key,
        new FormControl(inputBuilder),
      ])
    ) as { [K in keyof T]: FormControl<T[K]> }

    this.refs = Object.fromEntries(
      Object.entries(this.controls).map(([key, control]: [keyof T, FormControl<T[keyof T]>]) => [
        key,
        computed({
          get: () => control.ref.value,
          set(newValue) {
            // eslint-disable-next-line no-param-reassign
            control.ref.value = newValue
          },
        }),
      ])
    ) as FormRefs<T>
  }
}
