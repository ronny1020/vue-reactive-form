import FormGroup from './reactiveForm/formGroup'
import FormControl from './reactiveForm/formControl'
import requiredValidator from './validators/requiredValidator'
import emailValidator from './validators/emailValidator'
import patternValidator from './validators/patternValidator'
import maxLengthValidator from './validators/maxLengthValidator'
import minLengthValidator from './validators/minLengthValidator'
import { AvailableType } from './interfaces/availableType'
import { FormGroupGenericType, InputBuilder } from './interfaces/form'
import { Validator, ValidatorFactory } from './interfaces/validator'

export default FormGroup
export {
  FormControl,
  requiredValidator,
  emailValidator,
  patternValidator,
  maxLengthValidator,
  minLengthValidator,
  AvailableType,
  FormGroupGenericType,
  InputBuilder,
  Validator,
  ValidatorFactory,
}
