<template>
  <div class="app-shell">
    <div class="container mx-auto">
      <img
        alt="Vue logo"
        src="./assets/logo.png"
        class="mx-auto d-block"
      >
      <HelloWorld msg="Hello Vue 3.0 + Vite + Tailwind" />
      <MineField />
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MineField from './components/MineField.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    MineField
  }
}
</script>

<style>
.app-shell {
  @apply bg-gray-400;
  @apply min-h-screen;
  @apply pt-32;
}
</style>
