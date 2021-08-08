import { ref } from 'vue'
import { InputBuilder, FormRefs, FormValue } from '../interfaces/formBuilder'

export default class ReactiveForm<T extends Record<string, InputBuilder>> {
  refs: FormRefs<T>

  get value(): FormValue<T> {
    return Object.fromEntries(
      Object.entries(this.refs).map(([key, inputRef]) => [key, inputRef.value])
    ) as FormValue<T>
  }

  constructor(private formBuilders: T) {
    this.refs = Object.fromEntries(
      Object.entries(formBuilders).map(([key, builder]) => [key, ref(builder.value)])
    ) as FormRefs<T>
  }
}
