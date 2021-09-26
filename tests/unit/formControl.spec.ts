import { FormControl } from '../../src'

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
