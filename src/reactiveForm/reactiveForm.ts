import { customRef, Ref } from 'vue'
import { InputBuilder, FormRefs, FormValue, FormControls } from '../interfaces/formBuilder'

export default class ReactiveForm<T extends Record<string, InputBuilder>> {
  refs: FormRefs<T>

  controls: FormControls<T>

  get value(): FormValue<T> {
    return Object.fromEntries(
      Object.entries(this.refs).map(([key, inputRef]) => [key, inputRef.value])
    ) as FormValue<T>
  }

  constructor(private formBuilders: T) {
    this.refs = Object.fromEntries(
      Object.entries(formBuilders).map(([key, builder]) => [
        key,
        this.onValueChanged(key, builder.value),
      ])
    ) as FormRefs<T>

    this.controls = Object.fromEntries(
      Object.entries(formBuilders).map(([key, builder]) => [key, { value: builder.value }])
    ) as FormControls<T>
  }

  onValueChanged<Value extends T[keyof T]['value']>(key: keyof T, value: Value): Ref<Value> {
    return customRef((track, trigger) => {
      const setControlValue = (inputValue: Value) => {
        this.controls[key].value = inputValue
      }

      return {
        get() {
          track()
          return value
        },
        set(newValue: Value) {
          setControlValue(newValue)

          // eslint-disable-next-line no-param-reassign
          value = newValue

          trigger()
        },
      }
    })
  }
}
