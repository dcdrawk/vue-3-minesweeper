<template>
  <div
    class="mine-field-square"
    :class="baseStyles"
  />
</template>

<script>
const baseStyles = [
  'w-10',
  'h-10',
  'border-4',
  'border-top-gray-300',
  'border-gray-500',
  'bg-gray-400'
]
export default {
  // Name
  name: 'MineFieldSquare',

  setup () {
    return {
      baseStyles
    }
  }

  // Components
  // components: {},

  // // Mixins
  // mixins: [],

  // // Props
  // props: {},

  // // Data
  // data () {
  //   return {}
  // },

  // // Computed
  // computed: {
  //   computedProperty () {
  //     return 'something'
  //   }
  // },

  // // Watch
  // watch: {
  //   watchProperty (newValue, oldValue) {
  //     return newValue
  //   }
  // },

  // // Methods
  // methods: {
  //   myFunction () {
  //     return 'something'
  //   }
  // }
}
</script>

<style scoped>
.mine-field-square {
  border-top-color: theme('colors.gray.300');
  border-left-color: theme('colors.gray.300');
  border-right-color: theme('colors.gray.500');
  border-bottom-color: theme('colors.gray.500');
  margin: 40px;
}
</style>
