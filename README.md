# vue-reactive-form

A reactive form library, which can help manage form data.
It can be use all kind of Form UI.
Besides, It uses TypeScript generics to manage the types of data.

## Warning

This is only supported in Vue3 with composition API.

## Install

```bash
npm i vue-reactive-form
```

```bash
yarn add vue-reactive-form
```

## Usage

```html
<template>
  <div class="container">
    <form>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input id="email" v-model="email" type="input" class="form-control" />
        has error: {{ formGroup.controls.email.errors.value ? 'Yes' : 'No' }}
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="form-control"
        />
      </div>
      <div class="mb-3 form-check">
        <input
          id="check"
          v-model="readMe"
          type="checkbox"
          class="form-check-input"
        />
        <label class="form-check-label" for="check">remember me</label>
      </div>
      <div class="mb-3">
        <label for="child" class="form-label">child test</label>
        <input id="child" v-model="child1" type="input" class="form-control" />
      </div>

      <button class="btn btn-primary me-3" @click.prevent="formGroup.reset()">
        Reset
      </button>

      <button
        type="submit"
        class="btn btn-primary"
        :disabled="!formGroup.valid"
        @click.prevent="handleClick()"
      >
        Submit
      </button>
    </form>
  </div>
</template>
```

```typescript
import { defineComponent } from 'vue'
import FormGroup, {
  emailValidator,
  requiredValidator,
} from '../../build/vue-reactive-form'

export default defineComponent({
  name: 'App',

  setup() {
    const formGroup = new FormGroup<{
      email: string
      password: string
      readMe?: boolean
      children: { child1: string }
    }>({
      email: {
        defaultValue: 'test@example.com',
        validators: [requiredValidator(), emailValidator()],
      },

      password: null,
      readMe: null,
      children: { child1: null },
    })

    const {
      email,
      password,
      readMe,
      children: { child1 },
    } = formGroup.refs

    function handleClick() {
      console.log({ formGroup, values: formGroup.values.value })
    }

    return { email, password, readMe, child1, formGroup, handleClick }
  },
})
```

The fallowing is the demo of this code.

## Demo

[Demo](https://ronny1020.github.io/vue-reactive-form//)

PS. I use Bootstrap CDN for this demo page. However, It's not required to use with this "vue-reactive-form" package.

## API

### Builder

---

#### **InputBuilder**

This is used to defined the input reference, which will be used in the fallowing FormGroup.

| Property     | type            | required | default | description                                                  |
| ------------ | --------------- | -------- | ------- | ------------------------------------------------------------ |
| defaultValue | `AvailableType` | false    | `null`  | default value                                                |
| validators   | `Validator[]`   | false    | `[]`    | Validators for the input, there are details in the fallowing |

```typescript
type AvailableType = boolean | number | string | boolean[] | number[] | string[]
```

AvailableType can also use as InputBuilder, which will stand for the defaultValue without validators.

#### **FormBuilder**

It's a Object with keys and values, and value could be the Fallowing types.

- [InputBuilder](#inputbuilder)

This will create a FormControl as the control of created FormGroup.

- [FormGroup](#formgroup)

This will create a FormGroup as the control of created FormGroup.

- [FormBuilder](#formbuilder)

This will use this FormGroup as the control of created FormGroup.

---

### Controls

The Classes, which are used to control the form.

#### **FormControl**

The Class used to control a input.

- ref

  type : `Ref` (Vue api)

  Vue refs api, which can be used in V-model.

- validators

type : `Validator`

The validator setted in the [InputBuilder](#inputbuilder), used to check the input validity.

- dirty

type : `Ref<boolean>` (Vue api)

It's false by default, after changing the value of the ref it would be marked as true

- errors

  type : `ComputedRef<ValidationErrors>` (Vue api)

  It's null by default, after changing the value of the ref it would be marked as the error setted in the validators.

- valid

  type : `ComputedRef<boolean>` (Vue api)

  It's false by default, if it's dirty and the error is null, it would be marked as true.

- markAsDirty()

  return : `void`

  Mark the property dirty as true.

- markAsPristine()

  return : `void`

  Mark the property dirty as false.

- appendValidators(validator)

  args : `Validator`

  return : `void`

  Append the validator to the validators.

- setValidators(validators)

  args : `Validator | Validator[]`

  return : `void`

  Set the validators.

- clearValidators()

  return : `void`

  Clear the validators.

- reset()

  return : `void`

  Reset the value, dirty and the errors.

#### **FormGroup**

The main class of this package. It's used to create a form group with not only inputs but also other form groups.

It's also the default export of this package.

To create a form group, you can use [FormBuilder](#formbuilder) object.

TypeScript generics is used to define the mapped types of the form controls.

The generic Type variables "T" is the type of the FormBuilder used to create the form group.

- dirty

  type : `Ref<boolean>` (Vue api)

  It's false by default, after changing any form control value it would be marked as true.

- errors

  type : `ComputedRef<FormErrors<T>>`

  It's an assembly of all the errors of the form controls. If there is no error, it would be null.

- valid

  type : `ComputedRef<boolean>` (Vue api)

  It's false by default, if it's dirty and the error is null, it would be marked as true.

- markAsDirty()

  return : `void`

  Mark the properties dirty in all the form controls as true.

- markAsPristine()

  return : `void`

  Mark the properties dirty in all the form controls as false.

- reset()

  return : `void`

  Reset the value, dirty and the errors of all the form controls.

- controls

  type : `FormControls<T>`

  It's an assembly of all the form controls or form groups.

- refs

  type : `FormRefs<T>`

  It's an assembly of all the refs of the form controls or form groups.

  It can be used in the V-model.

  - appendFormControl(formBuilder)

  args : `FormBuilder`

  return : `void`

  Append a group of form controls to the form group.

- removeFormControl(key)

  args : `string | string[]`

  return : `void`

  Remove one or more form controls from the form group by the key of the property.

### Validator

The function used to check the validity of the input.

Type of the validator is Validator, which is defined as the fallowing.

You can also use ValidatorFactory

```typescript
export type ValidationErrors = {
  [key: string]: any
}

export type Validator = (value: AvailableType) => ValidationErrors | null
```

This package also provide some validator factories to create validator as the fallowing, but you can also use your own validators or validator factories.

- requiredValidator()

  error type: `{required: true}`

  It's used to check if the input has a value.

- emailValidator()

  error type: `{email: 'email'}`

  It's to check if the value is an email.

- patternValidator(regex)

  args : `RegExp | string`

  error type: `{pattern: 'pattern'}`

  It's to check if the value is match the regex.

- maxLengthValidator(maxLength)

  args : `number`

  error type: `{maxLength: number}`

  It's to check if the value is less than the maxLength.

- maxLengthValidator(minLength)

  args : `number`

  error type: `{minLength: number}`

  It's to check if the value is greater than the minLength.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT © [ronny1020](https://github.com/ronny1020)
