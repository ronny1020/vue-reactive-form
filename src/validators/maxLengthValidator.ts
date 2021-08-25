import { AvailableType } from '@/interfaces/stringType'
import { ValidatorFactory } from '@/interfaces/validator'

const maxLengthValidator: ValidatorFactory = (length: number) => (value: AvailableType | null) => {
  if (value.length > length) {
    return { maxLength: length }
  }

  return null
}

export default maxLengthValidator
