import FormGroup, { FormControl } from '../../src'

describe('Formgroup', () => {
  const testFormGroup = new FormGroup({
    test: 'test',
  })

  it('Formgroup can be created with default values', () => {
    expect(testFormGroup.values.value.test).toMatch('test')
  })

  it('controls of Formgroup should be FormControl', () => {
    expect(testFormGroup.controls.test).toBeInstanceOf(FormControl)
  })
})
