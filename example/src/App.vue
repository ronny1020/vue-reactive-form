<template>
  <div class="container">
    <form>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input id="email" v-model="refs.email.value" type="input" class="form-control" />
        {{ refs.email }}
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input id="password" v-model="refs.password.value" type="password" class="form-control" />
      </div>
      <div class="mb-3 form-check">
        <input id="check" v-model="refs.readMe.value" type="checkbox" class="form-check-input" />
        <label class="form-check-label" for="check">remember me</label>
      </div>
      <div class="mb-3">
        <label for="child" class="form-label">child test</label>
        <input id="child" v-model="refs.children.child1.value" type="input" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent="handleClick()">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FormGroup from '@/index'

export default defineComponent({
  name: 'App',

  setup() {
    const form = new FormGroup({
      email: { value: '' },
      password: { value: '' },
      readMe: { value: false },
      children: { child1: { value: '' } },
    })

    console.log(form)

    function handleClick() {
      console.log(form.values.value)
    }

    return { refs: form.refs, handleClick }
  },
})
</script>

function handleClick() { throw new Error('Function not implemented.') }
