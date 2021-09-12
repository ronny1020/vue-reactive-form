import { ValidatorFactory } from '../interfaces/validator'

const minLengthValidator: ValidatorFactory<string | number> =
  (length: number) => (value: string | number | null) => {
    if (!value || length > value.toString().length) {
      return { minLength: length }
    }

    return null
  }

export default minLengthValidator
