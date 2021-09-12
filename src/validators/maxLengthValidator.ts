import { ValidatorFactory } from '../interfaces/validator'

const maxLengthValidator: ValidatorFactory<string | number> =
  (length: number) => (value: string | number | null) => {
    if (!value || value.toString().length > length) {
      return { maxLength: length }
    }

    return null
  }

export default maxLengthValidator
