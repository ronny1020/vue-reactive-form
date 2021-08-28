import { computed } from 'vue'
import { FormBuilder, FormRefs, InputBuilder } from '../interfaces/form'
import AbstractFormGroup from '../reactiveForm/abstractFormGroup'
import FormControl from '../reactiveForm/formControl'

export default function createFormRefs<T extends FormBuilder>(
  controls: Record<string, FormControl<InputBuilder> | AbstractFormGroup<FormBuilder>>
): FormRefs<T> {
  return Object.fromEntries(
    Object.entries(controls).map(
      ([key, control]: [string, FormControl<InputBuilder> | AbstractFormGroup<FormBuilder>]) => {
        return control instanceof AbstractFormGroup
          ? [key, control.refs]
          : [
              key,
              computed({
                get: () => control.ref.value,
                set(newValue) {
                  // eslint-disable-next-line no-param-reassign
                  control.ref.value = newValue
                },
              }),
            ]
      }
    )
  )
}
