import { AvailableType } from '../interfaces/stringType'
import { ValidatorFactory } from '../interfaces/validator'

const requiredValidator: ValidatorFactory = () => (value: AvailableType | null) => {
  if (value === null || value === undefined || value === '') {
    return { required: true }
  }

  return {}
}

export default requiredValidator
