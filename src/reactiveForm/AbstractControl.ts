import { FormBuilder, FormErrors } from '@/interfaces/form'
import { ValidationErrors } from '@/interfaces/validator'
import { computed, ComputedRef, ref } from 'vue'

export default abstract class AbstractControl {
  errors: ComputedRef<FormErrors<FormBuilder> | ValidationErrors>

  dirty = ref(false)

  valid: ComputedRef<boolean> = computed(
    (): boolean => this.dirty.value && !Object.keys(this.errors.value).length
  )

  hasError(): boolean {
    return !!Object.keys(this.errors.value).length
  }
}
