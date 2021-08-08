import { Ref } from 'vue'

export interface InputBuilder {
  value: string | number | boolean
}

export type FormBuilder = Record<string, InputBuilder>

export type FormValue<T extends FormBuilder> = {
  [K in keyof T]: T[K]['value']
}

export type FormRefs<T extends FormBuilder> = {
  [K in keyof T]: Ref<T[K]['value']>
}
