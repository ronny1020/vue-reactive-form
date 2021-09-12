import { AvailableType } from '../interfaces/availableType'
import { ValidatorFactory } from '../interfaces/validator'

const requiredValidator: ValidatorFactory<AvailableType> = () => (value: AvailableType | null) => {
  if (value === null || value === undefined || value === '') {
    return { required: true }
  }

  return null
}

export default requiredValidator
