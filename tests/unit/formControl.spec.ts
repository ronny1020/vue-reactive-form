import { FormControl, requiredValidator } from '../../src'

describe('FormControl', () => {
  it('FormControl can be created with default values', () => {
    const testFormControl = new FormControl<string>('test')

    expect(testFormControl.ref.value).toMatch('test')
  })

  it('FormControl can be created with inputBuilder', () => {
    const testFormControl = new FormControl<string>({ defaultValue: 'test' })

    expect(testFormControl.ref.value).toMatch('test')
  })
})

describe('FormControl Validator', () => {
  it('FormControl property dirty should be false by default', () => {
    const testFormControl = new FormControl<string>({
      defaultValue: '',
      validators: [requiredValidator()],
    })

    expect(testFormControl.dirty.value).toBe(false)
  })

  it('FormControl property valid should be false by default', () => {
    const testFormControl = new FormControl<string>({
      defaultValue: '',
      validators: [requiredValidator()],
    })

    expect(testFormControl.valid.value).toBe(false)
  })

  it('FormControl property dirty should be true after control value change', () => {
    const testFormControl = new FormControl<string>({
      defaultValue: '',
      validators: [requiredValidator()],
    })

    testFormControl.ref.value = 'test'

    expect(testFormControl.dirty.value).toBe(true)
  })

  it('FormControl property valid should be true after control value change', () => {
    const testFormControl = new FormControl<string>({
      defaultValue: '',
      validators: [requiredValidator()],
    })

    testFormControl.ref.value = 'test'

    expect(testFormControl.valid.value).toBe(true)
  })
})
