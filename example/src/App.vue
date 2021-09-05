<template>
  <div class="container">
    <form>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input id="email" v-model="formGroup.refs.email.value" type="input" class="form-control" />
        has error: {{ formGroup.controls.email.errors.value ? 'Yes' : 'No' }}
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          id="password"
          v-model="formGroup.refs.password.value"
          type="password"
          class="form-control"
        />
      </div>
      <div class="mb-3 form-check">
        <input
          id="check"
          v-model="formGroup.refs.readMe.value"
          type="checkbox"
          class="form-check-input"
        />
        <label class="form-check-label" for="check">remember me</label>
      </div>
      <div class="mb-3">
        <label for="child" class="form-label">child test</label>
        <input
          id="child"
          v-model="formGroup.refs.children.child1.value"
          type="input"
          class="form-control"
        />
      </div>

      <button class="btn btn-primary me-3" @click.prevent="formGroup.reset()">Reset</button>

      <button
        type="submit"
        class="btn btn-primary"
        :disabled="!formGroup.valid.value"
        @click.prevent="handleClick()"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FormGroup, { emailValidator, requiredValidator } from '../../build/vue-reactive-form'

export default defineComponent({
  name: 'App',

  setup() {
    const formGroup = new FormGroup({
      email: {
        type: 'string',
        defaultValue: 'test@example.com',
        validators: [requiredValidator(), emailValidator()],
      },

      password: { type: 'string' },
      readMe: { type: 'boolean' },
      children: new FormGroup({ child1: {} }),
    })

    function handleClick() {
      console.log(formGroup)
    }

    return { formGroup, handleClick }
  },
})
</script>
