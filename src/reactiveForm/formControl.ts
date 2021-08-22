import { TypeFromString } from '@/interfaces/stringType'
import { Validator } from '@/interfaces/validator'
import { computed, customRef, ref, Ref } from 'vue'
import { InputBuilder, InputValueType } from '../interfaces/form'

export default class FormControl<T extends InputBuilder> {
  ref: Ref<TypeFromString<T['type']> | null>

  dirty = ref(false)

  errors = computed(
    () =>
      this.inputBuilder.validators?.reduce(
        (accumulator, validator: Validator) => ({ ...accumulator, ...validator(this.ref.value) }),
        {} as Record<string, true>
      ) || {}
  )

  constructor(private inputBuilder: InputBuilder) {
    this.ref = this.createFormControlRef(inputBuilder.defaultValue)
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
        value = newValue

        markAsDirty()
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
}
