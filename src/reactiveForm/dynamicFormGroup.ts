/* eslint-disable no-use-before-define */

import createFormControls from '../functions/createFormControls'
import createFormRefs from '../functions/createFormRefs'
import { FormBuilder } from '../interfaces/form'
import AbstractFormGroup from './abstractFormGroup'

export default class DynamicFormGroup<T extends FormBuilder> extends AbstractFormGroup<T> {
  constructor(private formBuilders: T) {
    super()
    this.controls = createFormControls(formBuilders)
    this.refs = createFormRefs(this.controls)
  }

  appendFormControl(formBuilder: FormBuilder): void {
    const newControls = createFormControls(formBuilder)

    this.controls = { ...this.controls, ...newControls }
    this.refs = { ...this.refs, ...createFormRefs(newControls) }
  }

  removeFormControl(key: string | string[]): void {
    const keys = Array.isArray(key) ? key : [key]

    keys.forEach((keyToRemove) => {
      delete this.controls[keyToRemove]
      delete this.refs[keyToRemove]
    })
  }
}
