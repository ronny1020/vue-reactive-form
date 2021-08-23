<template>
  <div class="container">
    <form>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input id="email" v-model="form.refs.email.value" type="input" class="form-control" />
        has error: {{ form.controls.email.errors.value ? 'Yes' : 'No' }}
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          id="password"
          v-model="form.refs.password.value"
          type="password"
          class="form-control"
        />
      </div>
      <div class="mb-3 form-check">
        <input
          id="check"
          v-model="form.refs.readMe.value"
          type="checkbox"
          class="form-check-input"
        />
        <label class="form-check-label" for="check">remember me</label>
      </div>
      <div class="mb-3">
        <label for="child" class="form-label">child test</label>
        <input
          id="child"
          v-model="form.refs.children.child1.value"
          type="input"
          class="form-control"
        />
      </div>
      {{ form.errors }}
      {{ form.valid }}
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="!form.valid.value"
        @click.prevent="handleClick()"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FormGroup, { emailValidator, requiredValidator } from '@/index'

export default defineComponent({
  name: 'App',

  setup() {
    const form = new FormGroup({
      email: {
        type: 'string',
        defaultValue: 'test@example.com',
        validators: [requiredValidator(), emailValidator()],
      },

      password: { type: 'string' },
      readMe: { type: 'boolean' },
      children: { child1: { type: 'string' } },
    })

    function handleClick() {
      console.log(form)
    }

    return { form, handleClick }
  },
})
</script>

function handleClick() { throw new Error('Function not implemented.') }
