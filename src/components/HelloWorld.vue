<template>
  <h1 class="text-4xl">{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>HelloWorld</p>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    }
  },
}
</script>
