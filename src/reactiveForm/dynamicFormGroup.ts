/* eslint-disable no-use-before-define */

import createFormControls from '@/functions/createFormControls'
import createFormRefs from '@/functions/createFormRefs'
import { FormBuilder } from '../interfaces/form'
import AbstractFormGroup from './abstractFormGroup'

export default class DynamicFormGroup<T extends FormBuilder> extends AbstractFormGroup<T> {
  constructor(private formBuilders: T) {
    super()
    this.controls = createFormControls(formBuilders)
    this.refs = createFormRefs(this.controls)
  }
}
