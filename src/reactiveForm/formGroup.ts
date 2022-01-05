/* eslint-disable @typescript-eslint/no-use-before-define */
import { ComputedRef, computed, Ref } from 'vue'
import { ValidationErrors } from '../interfaces/validator'
import { AvailableType } from '../interfaces/availableType'
import FormControl, { InputBuilder } from './formControl'
import AbstractControl from './abstractControl'
import isObject from '../libs/isObject'

type OptionalPropertyOf<T extends Record<string, unknown>> = Exclude<
  {
    [K in keyof T]: T extends Record<K, T[K]> ? never : K
  }[keyof T],
  undefined
>

type OptionalPropertiesObject<T extends Record<string, unknown>> = Pick<T, OptionalPropertyOf<T>>

export type FormGroupControls<T extends FormGroupGenericType> = {
  [K in keyof T]: T[K] extends AvailableType | undefined
    ? FormControl<T[K]>
    : T[K] extends FormGroupGenericType
    ? FormGroup<T[K]>
    : T[K] extends FormGroup<FormGroupGenericType>
    ? T[K]
    : never
}

export type FormGroupRefs<T extends FormGroupGenericType> = {
  [K in keyof T]: T[K] extends AvailableType | undefined
    ? Ref<T[K]>
    : T[K] extends FormGroupGenericType
    ? FormGroup<T[K]>['refs']
    : never
}

export type FormGroupBuilder<T extends FormGroupGenericType> = {
  [K in keyof T]: T[K] extends AvailableType | undefined
    ? InputBuilder<T[K]> | T[K] | null
    : T[K] extends FormGroupGenericType
    ? FormGroupBuilder<T[K]> | FormGroup<T[K]>
    : never
}

export interface FormGroupGenericType {
  [key: string]: AvailableType | FormGroupGenericType | AvailableType[] | FormGroupGenericType[]
}

export type FormErrors<T extends FormGroupGenericType> = ComputedRef<{
  [K in keyof T]: T[K] extends AvailableType | undefined
    ? ValidationErrors
    : T[K] extends FormGroupGenericType
    ? FormGroup<T[K]>['errors']['value']
    : never
}>

function isInputBuilder(
  builder: FormGroupBuilder<FormGroupGenericType> | InputBuilder<AvailableType>
): builder is InputBuilder<AvailableType> {
  if (!builder) {
    return true
  }
  if (builder.constructor !== Object) {
    return true
  }
  if (
    Object.entries(builder).every(
      ([key, value]) => key === 'defaultValue' || (key === 'validators' && Array.isArray(value))
    )
  ) {
    return true
  }
  return false
}

function createFormRefs<T extends FormGroupGenericType>(
  controls: FormGroupControls<T>
): FormGroupRefs<T> {
  return Object.fromEntries(
    Object.entries(controls).map(([key, control]: [string, FormGroupControls<T>]) => {
      return control instanceof FormGroup ? [key, control.refs] : [key, control.ref]
    })
  ) as FormGroupRefs<T>
}

export default class FormGroup<T extends FormGroupGenericType> extends AbstractControl {
  controls: FormGroupControls<T>

  private removedFormControls: FormGroupControls<Partial<OptionalPropertiesObject<T>>> =
    {} as FormGroupControls<Partial<OptionalPropertiesObject<T>>>

  refs: FormGroupRefs<T>

  private removedRefs: FormGroupRefs<Partial<OptionalPropertiesObject<T>>> = {} as FormGroupRefs<
    Partial<OptionalPropertiesObject<T>>
  >

  values: ComputedRef<T> = computed(
    () =>
      Object.fromEntries(
        Object.entries(this.controls).map(([key, control]) => {
          if (control instanceof FormGroup) {
            return [key, control.values.value]
          }

          return [key, (control as FormControl<AvailableType>).ref.value]
        })
      ) as T
  )

  dirty: ComputedRef<boolean> = computed(() => {
    return Object.values(this.controls).some((control) => control.dirty.value)
  })

  constructor(private formGroupBuilder: FormGroupBuilder<T>) {
    super()
    this.controls = this.createFormControls<T>(formGroupBuilder)
    this.refs = createFormRefs(this.controls)
  }

  errors: FormErrors<T> = computed(() => {
    const formErrors = Object.fromEntries(
      Object.entries(this.controls)
        .map(
          ([key, control]: [
            string,
            FormControl<AvailableType> | FormGroup<FormGroupGenericType>
          ]) => [key, control.errors.value]
        )
        .filter(([, errors]) => errors)
    )

    return Object.keys(formErrors).length ? formErrors : null
  })

  markAsDirty(): void {
    Object.values(this.controls).forEach(
      (control: FormControl<AvailableType> | FormGroup<FormGroupGenericType>) =>
        control.markAsDirty()
    )
  }

  markAsPristine(): void {
    Object.values(this.controls).forEach(
      (control: FormControl<AvailableType> | FormGroup<FormGroupGenericType>) =>
        control.markAsPristine()
    )
  }

  reset(): void {
    Object.values(this.controls).forEach(
      (control: FormControl<AvailableType> | FormGroup<FormGroupGenericType>) => control.reset()
    )
  }

  private createFormControls<GenericType extends FormGroupGenericType>(
    formGroupBuilder: FormGroupBuilder<GenericType>
  ): FormGroupControls<GenericType> {
    return Object.fromEntries(
      Object.entries(formGroupBuilder).map(([key, builder]) => {
        if (this.removedFormControls[key]) {
          const formControl = this.removedFormControls[key]
          if (isObject(formGroupBuilder[key])) {
            formControl.ref.value = (
              formGroupBuilder[key] as InputBuilder<AvailableType>
            ).defaultValue
          }
          formControl.ref.value = formGroupBuilder[key]

          delete this.removedFormControls[key]

          return [key, formControl]
        }

        if (builder instanceof FormGroup) {
          return [key, builder]
        }
        if (isInputBuilder(builder)) {
          return [key, new FormControl(builder)]
        }
        return [key, new FormGroup(builder)]
      })
    ) as FormGroupControls<GenericType>
  }

  appendFormControl(formGroupBuilder: FormGroupBuilder<OptionalPropertiesObject<T>>): void {
    const newControls = this.createFormControls(formGroupBuilder)

    this.controls = { ...this.controls, ...newControls }
    this.refs = { ...this.refs, ...createFormRefs(newControls) }
  }

  removeFormControl(key: OptionalPropertyOf<T> | OptionalPropertyOf<T>[]): void {
    const keys = Array.isArray(key) ? key : [key]

    keys.forEach((keyToRemove) => {
      this.removedFormControls[keyToRemove] = this.controls[keyToRemove]
      delete this.controls[keyToRemove]

      this.removedRefs[keyToRemove] = this.refs[keyToRemove]
      delete this.refs[keyToRemove]
    })
  }
}
