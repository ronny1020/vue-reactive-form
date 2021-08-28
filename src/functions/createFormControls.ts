import { FormBuilder, FormControls, InputBuilder } from '../interfaces/form'
import AbstractFormGroup from '../reactiveForm/abstractFormGroup'
import FormControl from '../reactiveForm/formControl'

export default function createFormControls<T extends FormBuilder>(formBuilder: T): FormControls<T> {
  return Object.fromEntries(
    Object.entries(formBuilder).map(([key, builder]) => {
      return builder instanceof AbstractFormGroup
        ? [key, builder]
        : [key, new FormControl(builder as InputBuilder)]
    })
  )
}
