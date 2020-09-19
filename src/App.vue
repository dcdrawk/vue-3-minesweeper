<template>
  <div class="app-shell">
    <div class="container mx-auto">
      <Minefield />
    </div>
  </div>
</template>

<script>
import Minefield from './components/Minefield.vue'

export default {
  name: 'App',
  components: {
    Minefield
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
