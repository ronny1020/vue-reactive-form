import { AvailableType } from '@/interfaces/stringType'
import { ValidatorFactory } from '@/interfaces/validator'

const minLengthValidator: ValidatorFactory = (length: number) => (value: AvailableType | null) => {
  if (length > value.length) {
    return { minLength: length }
  }

  return null
}

export default minLengthValidator
