import { InputBuilder, InputValueType } from '@/interfaces/form'
import { customRef, Ref } from 'vue'

function createFormControlRef<T extends InputValueType>(defaultValue: T): Ref<T> {
  let value = defaultValue
  return customRef((track, trigger) => ({
    get() {
      track()
      return value
    },
    set(newValue: T) {
      value = newValue
      trigger()
    },
  }))
}

export default class FormControl<T extends InputBuilder> {
  ref: Ref<T['value']>

  value: T['value']

  constructor(private inputBuilder: InputBuilder) {
    this.value = inputBuilder.value

    this.ref = createFormControlRef(inputBuilder.value)
  }
}
