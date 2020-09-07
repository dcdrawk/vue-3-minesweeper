<template>
  <div class="app-shell">
    <div class="container mx-auto">
      <img alt="Vue logo" src="./assets/logo.png" class="mx-auto d-block"/>
      <HelloWorld msg="Hello Vue 3.0 + Vite + Tailwind" />
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
.app-shell {
  @apply bg-gray-300;
  @apply min-h-screen;
  @apply pt-32;
}
</style>