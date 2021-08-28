import { TypeFromString } from '@/interfaces/stringType'
import { ValidationErrors, Validator } from '@/interfaces/validator'
import { computed, ComputedRef, customRef, ref, Ref } from 'vue'
import { InputBuilder, InputValueType } from '../interfaces/form'
import AbstractControl from './abstractControl'

export default class FormControl<T extends InputBuilder> extends AbstractControl {
  ref: Ref<TypeFromString<T['type']> | null>

  validators: Ref<Validator[]> = ref([])

  errors: ComputedRef<ValidationErrors> = computed(() => {
    const errors =
      this.validators.value?.reduce(
        (accumulator, validator: Validator) => ({ ...accumulator, ...validator(this.ref.value) }),
        {} as ValidationErrors
      ) || {}

    return Object.keys(errors).length ? errors : null
  })

  constructor(private inputBuilder: InputBuilder) {
    super()
    this.ref = this.createFormControlRef(inputBuilder.defaultValue)

    this.validators = ref(this.inputBuilder.validators ?? [])
  }

  createFormControlRef<ValueType extends InputValueType>(defaultValue: ValueType): Ref<ValueType> {
    let value: ValueType = defaultValue ?? null

    const markAsDirty = this.markAsDirty.bind(this)

    return customRef((track, trigger) => ({
      get() {
        track()
        return value
      },
      set(newValue: ValueType) {
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

  appendValidators(validator: Validator): void {
    this.validators.value.push(validator)
  }

  setValidator(validator: Validator): void {
    this.validators.value = [validator]
  }

  clearValidators(): void {
    this.validators.value = []
  }
}
