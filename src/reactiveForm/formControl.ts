import { computed, ComputedRef, customRef, ref, Ref } from 'vue'
import { AvailableType } from '../interfaces/availableType'
import { ValidationErrors, Validator } from '../interfaces/validator'

import AbstractControl from './abstractControl'
import isObject from '../libs/isObject'

export type InputBuilder<T extends AvailableType> = {
  defaultValue?: T
  validators?: Validator<T>[]
}

export default class FormControl<T extends AvailableType> extends AbstractControl {
  ref: Ref<T>

  validators: Ref<Validator<T>[]> = ref([])

  errors: ComputedRef<ValidationErrors> = computed(() => {
    const errors =
      this.validators.value?.reduce(
        (accumulator, validator: Validator<T>) => ({
          ...accumulator,
          ...validator(this.ref.value),
        }),
        {} as ValidationErrors
      ) || {}

    return Object.keys(errors).length ? errors : null
  })

  constructor(private inputBuilder: InputBuilder<T> | AvailableType | null) {
    super()

    if (isObject(inputBuilder)) {
      this.ref = this.createFormControlRef(inputBuilder.defaultValue || null)
      this.validators = ref(inputBuilder.validators ?? [])
      return
    }
    this.ref = this.createFormControlRef(inputBuilder as T)
  }

  private createFormControlRef(defaultValue: T): Ref<T> {
    let value: T = defaultValue ?? null

    const markAsDirty = this.markAsDirty.bind(this)

    return customRef((track, trigger) => ({
      get(): T {
        track()
        return value
      },
      set(newValue: T) {
        markAsDirty()
        value = newValue

        trigger()
      },
    }))
  }

  markAsDirty(): void {
    this.dirty.value = true
  }

  markAsPristine(): void {
    this.dirty.value = false
  }

  appendValidators(validator: Validator<T>): void {
    this.validators.value.push(validator)
  }

  setValidator(validator: Validator<T> | Validator<T>[]): void {
    this.validators.value = Array.isArray(validator) ? validator : [validator]
  }

  clearValidators(): void {
    this.validators.value = []
  }

  reset(): void {
    if (isObject(this.inputBuilder)) {
      this.ref.value = this.inputBuilder?.defaultValue ?? null
    }
    this.ref.value = isObject(this.inputBuilder)
      ? this.inputBuilder.defaultValue ?? null
      : (this.inputBuilder as T)

    this.markAsPristine()
  }
}
