<template>
  <div>Component</div>
  <MineFieldSquare />
</template>

<script>
import MineFieldSquare from './MineFieldSquare.vue'

export default {
  // Name
  name: 'MineField',

  // Components
  components: {
    MineFieldSquare
  },

  // Mixins
  mixins: [],

  // Props
  props: {},

  // Data
  data () {
    return {}
  },

  // Computed
  computed: {
    computedProperty () {
      return 'something'
    }
  },

  // Watch
  watch: {
    watchProperty (newValue, oldValue) {
      return newValue
    }
  },

  // Methods
  methods: {
    myFunction () {
      return 'something'
    }
  }
}
</script>

<style scoped>
</style>
