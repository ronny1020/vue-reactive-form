<template>
  <div class="container">
    <form>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input id="email" v-model="email" type="input" class="form-control" />
        {{ email }}
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input id="password" v-model="password" type="password" class="form-control" />
      </div>
      <div class="mb-3 form-check">
        <input id="check" v-model="readMe" type="checkbox" class="form-check-input" />
        <label class="form-check-label" for="check">remember me</label>
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
    })

    function handleClick() {
      console.log(form.value.value)

      console.log(form)
    }

    return { ...form.refs, handleClick }
  },
})
</script>

function handleClick() { throw new Error('Function not implemented.') }
