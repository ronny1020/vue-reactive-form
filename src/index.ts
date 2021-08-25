import FormGroup from './reactiveForm/formGroup'
import FormControl from './reactiveForm/formControl'
import { AvailableStringType } from './interfaces/stringType'
import { Validator, ValidatorFactory } from './interfaces/validator'
import requiredValidator from './validators/requiredValidator'
import emailValidator from './validators/emailValidator'
import patternValidator from './validators/patternValidator'
import maxLengthValidator from './validators/maxLengthValidator'
import minLengthValidator from './validators/minLengthValidator'

export default FormGroup
export {
  FormControl,
  AvailableStringType,
  Validator,
  ValidatorFactory,
  requiredValidator,
  emailValidator,
  patternValidator,
  maxLengthValidator,
  minLengthValidator,
}
