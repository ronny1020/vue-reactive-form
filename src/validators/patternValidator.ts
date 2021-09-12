import { ValidatorFactory } from '../interfaces/validator'

function patternCheck(regex: RegExp | string, value: string): boolean {
  const regularExpression: RegExp = typeof regex === 'string' ? new RegExp(regex) : regex
  return regularExpression.test(value)
}

const patternValidator: ValidatorFactory<string> =
  (regex: RegExp | string) => (value: string | null) => {
    if (!value || !patternCheck(regex, value)) {
      return { pattern: 'pattern' }
    }

    return null
  }

export default patternValidator
