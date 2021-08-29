/* eslint-disable no-use-before-define */

import createFormControls from '../functions/createFormControls'
import createFormRefs from '../functions/createFormRefs'
import { FormBuilder, FormControls, FormRefs } from '../interfaces/form'
import AbstractFormGroup from './abstractFormGroup'

export default class FormGroup<T extends FormBuilder> extends AbstractFormGroup<T> {
  declare controls: FormControls<T>

  declare refs: FormRefs<T>

  constructor(private formBuilders: T) {
    super()
    this.controls = createFormControls(formBuilders)
    this.refs = createFormRefs(this.controls)
  }
}
