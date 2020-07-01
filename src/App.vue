<template>
  <main class="w-full h-full">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Hello Vue 3.0 + Vite" />
  </main>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
  },

  data: () => ({
    currentStage: 'pause',
  }),
}
</script>
<style lang="postcss">
@tailwind base;

@tailwind components;

@tailwind utilities;

html,
body {
  @apply w-full h-full;
}
</style>
