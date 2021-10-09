import FormGroup, { FormControl, requiredValidator } from '../../src'

describe('Formgroup', () => {
  const testFormGroup = new FormGroup<{ test: string }>({
    test: 'test',
  })

  it('Formgroup can be created with default values', () => {
    expect(testFormGroup.values.value.test).toMatch('test')
  })

  it('Controls of Formgroup should be FormControl', () => {
    expect(testFormGroup.controls.test).toBeInstanceOf(FormControl)
  })
})

describe('Nested Formgroup', () => {
  const testFormGroup = new FormGroup<{ test: { testChild: string } }>({
    test: { testChild: 'test' },
  })

  it('Nested Formgroup can be created', () => {
    expect(testFormGroup.values.value.test.testChild).toMatch('test')
  })
})

describe('Form Validator', () => {
  it('Formgroup property dirty should be false by default', () => {
    const testFormGroup = new FormGroup<{ test: string }>({
      test: { defaultValue: '', validators: [requiredValidator()] },
    })
    expect(testFormGroup.dirty.value).toBe(false)
  })

  it('Formgroup property valid should be false by default', () => {
    const testFormGroup = new FormGroup<{ test: string }>({
      test: { defaultValue: '', validators: [requiredValidator()] },
    })
    console.log('testFormGroup.valid.value', testFormGroup.valid.value)

    expect(testFormGroup.valid.value).toBe(false)
  })

  it('Formgroup property dirty should be true after control value change', () => {
    const testFormGroup = new FormGroup<{ test: string }>({
      test: { defaultValue: '', validators: [requiredValidator()] },
    })
    testFormGroup.refs.test.value = 'test'
    expect(testFormGroup.dirty.value).toBe(true)
  })

  it('Formgroup property valid should be true after control value change', () => {
    const testFormGroup = new FormGroup<{ test: string }>({
      test: { defaultValue: '', validators: [requiredValidator()] },
    })
    testFormGroup.refs.test.value = 'test'
    expect(testFormGroup.valid.value).toBe(true)
  })
})
