<template>
  <div
    class="mine-field-tile"
    :class="[baseStyles, computedStyles]"
    @click="$emit('click')"
    @contextmenu.prevent="$emit('right-click')"
  >
    <i
      v-if="flag"
      class="far fa-flag text-xl text-red"
    />
    <i
      v-else-if="mine"
      class="fas fa-bomb text-xl"
    />

    <div
      v-else-if="adjacentMines > 0 && revealed"
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
    flag: {
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

  emits: ['click', 'right-click'],

  setup (props) {
    return {
      baseStyles,
      computedStyles: ref({
        [`adj-${props.adjacentMines}`]: props.revealed && props.adjacentMines > 0,
        revealed: props.revealed,
        flag: props.flag
      })
    }
  }
}
</script>

<style scoped>
.mine-field-tile {
  border-top-color: theme('colors.white');
  border-left-color: theme('colors.white');
  border-right-color: theme('colors.gray.600');
  border-bottom-color: theme('colors.gray.600');
  backface-visibility: hidden;
  overflow: visible;
  @apply cursor-pointer;

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

  &.revealed {
    /* display: block; */
    border-width: 0px;
    border-width: 0px 1px 1px 0px;
    border-color: theme('colors.gray.600');
    @apply cursor-auto;
    /* box-shadow: inset 0px 0px 0px 1px theme('colors.gray.600'); */
  }
}
</style>
