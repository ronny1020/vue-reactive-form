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
        <input id="password" v-model="password" type="password" class="form-control" />
      </div>
      <div class="mb-3 form-check">
        <input id="check" v-model="readMe" type="checkbox" class="form-check-input" />
        <label class="form-check-label" for="check">remember me</label>
      </div>
      <div class="mb-3">
        <label for="child" class="form-label">child test</label>
        <input id="child" v-model="child1" type="input" class="form-control" />
      </div>

      <button class="btn btn-primary me-3" @click.prevent="formGroup.reset()">Reset</button>

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

<script lang="ts">
import { defineComponent } from 'vue'

import FormGroup, { emailValidator, requiredValidator } from '../../src'

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
</script>
