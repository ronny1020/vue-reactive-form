import { computed, ComputedRef, ref } from 'vue'
import { FormBuilder, FormErrors } from '../interfaces/form'
import { ValidationErrors } from '../interfaces/validator'

export default abstract class AbstractControl {
  errors: ComputedRef<FormErrors<FormBuilder> | ValidationErrors>

  dirty = ref(false)

  valid: ComputedRef<boolean> = computed((): boolean => this.dirty.value && !this.errors.value)

  hasError(): boolean {
    return !!this.errors.value
  }
}
