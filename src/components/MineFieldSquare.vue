<template>
  <div
    class="mine-field-square"
    :class="[baseStyles, computedStyles]"
  >
    <i
      v-if="mine"
      class="fas fa-bomb text-xl"
    />

    <div
      v-else-if="adjacentMines > 0"
      class="text-lg"
    >
      {{ adjacentMines }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

const baseStyles = [
  'w-10',
  'h-10',
  'border-4',
  'border-top-gray-300',
  'border-gray-500',
  'bg-gray-500',
  'flex',
  'justify-center',
  'items-center'
]
export default {
  // Name
  name: 'MineFieldSquare',

  props: {
    mine: {
      type: Boolean,
      default: false
    },
    revealed: {
      type: Boolean,
      default: false
    },
    adjacentMines: {
      type: Number,
      default: 0
    }
  },

  setup (props) {
    return {
      baseStyles,
      computedStyles: ref({
        [`adj-${props.adjacentMines}`]: props.adjacentMines
      })
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
  border-top-color: theme('colors.white');
  border-left-color: theme('colors.white');
  border-right-color: theme('colors.gray.600');
  border-bottom-color: theme('colors.gray.600');
  /* margin: 40px; */

  &.adj {
    &-1 {
      color: theme('colors.blue')
    }
    &-2 {
      color: theme('colors.green')
    }
    &-3 {
      color: theme('colors.red')
    }
    &-4 {
      color: theme('colors.darkBlue')
    }
    &-5 {
      color: theme('colors.darkRed')
    }
    &-6 {
      color: theme('colors.cyan')
    }
    &-7 {
      color: theme('colors.black')
    }
    &-8 {
      color: theme('colors.gray.600')
    }
  }
}
</style>
