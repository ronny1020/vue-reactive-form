import { ValidatorFactory } from '../interfaces/validator'

function isEmail(email: string): boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

const emailValidator: ValidatorFactory<string> = () => (value: string) => {
  if (!value || !isEmail(value)) {
    return { email: 'email' }
  }

  return null
}

export default emailValidator
