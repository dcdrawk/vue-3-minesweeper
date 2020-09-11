<template>
  <div class="app-shell">
    <div class="container mx-auto">
      <!-- <img
        alt="Vue logo"
        src="./assets/logo.png"
        class="mx-auto d-block"
      > -->
      <MineField />
    </div>
  </div>
</template>

<script>
import MineField from './components/MineField.vue'

export default {
  name: 'App',
  components: {
    MineField
  }
}
</script>

<style>
body {
  font-family: 'Roboto Mono', monospace;
}
.app-shell {
  @apply bg-gray-500;
  @apply min-h-screen;
  @apply pt-32;
}
</style>
