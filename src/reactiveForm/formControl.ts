import { computed, ComputedRef, customRef, ref, Ref } from 'vue'
import { AvailableType } from '@/interfaces/availableType'
import { ValidationErrors, Validator } from '../interfaces/validator'
import { InputBuilder } from '../interfaces/form'
import AbstractControl from './abstractControl'

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

  constructor(private inputBuilder: InputBuilder<T> | null) {
    super()

    if (inputBuilder && inputBuilder.constructor === Object) {
      this.ref = this.createFormControlRef(inputBuilder?.defaultValue || null)
      this.validators = ref(this.inputBuilder?.validators ?? [])
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
    if (this.inputBuilder && this.inputBuilder.constructor === Object) {
      this.ref.value = this.inputBuilder?.defaultValue ?? null
    }
    this.ref.value = this.inputBuilder as T

    this.markAsPristine()
  }
}
