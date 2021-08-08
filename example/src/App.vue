<template>
  <div class="container">
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input id="exampleInputEmail1" v-model="email" type="input" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input id="exampleInputPassword1" type="password" class="form-control" />
      </div>
      <div class="mb-3 form-check">
        <input id="exampleCheck1" type="checkbox" class="form-check-input" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent="handleClick()">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import inputTest from '../../src'

export default defineComponent({
  name: 'App',

  setup() {
    const email = ref<string>(inputTest)

    function handleClick() {
      console.log(email.value)
    }

    return { email, handleClick }
  },
})
</script>

function handleClick() { throw new Error('Function not implemented.') }
