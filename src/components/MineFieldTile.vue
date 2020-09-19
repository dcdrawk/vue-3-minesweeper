<template>
  <AppButton
    class="mine-field-tile"
    :class="[baseStyles, computedStyles]"
    :flat="revealed || depressed || (mine && gameOver && !flag)"
    :button-styles="{ 'bg-red': exploded }"
    @click="$emit('click')"
    @click.middle="$emit('middle-click')"
    @mousedown.middle="$emit('mouse-down-middle')"
    @mouseup.middle="$emit('mouse-up-middle')"
    @mouseout="handleMouseOut"
    @mouseover="handleMouseOver"
    @contextmenu.prevent="$emit('right-click')"
  >
    <div class="pointer-events-none">
      <i
        v-if="flag || (victory && mine)"
        class="fas fa-flag text-xl text-red"
      />
      <i
        v-else-if="mine && revealed || mine && gameOver"
        class="fas fa-bomb text-xl"
      />

      <div
        v-else-if="adjacentMines > 0 && revealed"
        class="text-lg"
      >
        {{ adjacentMines }}
      </div>
    </div>
  </AppButton>
</template>

<script>
import AppButton from './buttons/AppButton.vue'
import { reactive, ref } from 'vue'

const baseStyles = [
  'w-10',
  'h-10'
]

export default {
  // Name
  name: 'MineFieldSquare',

  components: {
    AppButton
  },

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
    },
    gameOver: {
      type: Boolean,
      default: false
    },
    victory: {
      type: Boolean,
      default: false
    },
    exploded: {
      type: Boolean,
      default: false
    },
    depressed: {
      type: Boolean,
      default: false
    }
  },

  emits: ['click', 'right-click', 'middle-click', 'mouse-down-middle', 'mouse-up-middle', 'mouse-in-middle', 'mouse-out-middle'],

  setup (props, context) {
    function handleMouseOut (event) {
      if (event.buttons === 4) { // middle mouse
        context.emit('mouse-up-middle')
      }
      // console.dir(event)
    }
    function handleMouseOver (event) {
      if (event.buttons === 4) { // middle mouse
        context.emit('mouse-down-middle')
      }
      // console.dir(event)
    }
    return {
      baseStyles,
      computedStyles: ref({
        [`adj-${props.adjacentMines}`]: (props.revealed || props.gameOver) && props.adjacentMines > 0,
        'bg-red': props.exploded,
        revealed: (props.revealed || props.gameOver) && !props.flag,
        flag: props.flag
      }),
      handleMouseOut,
      handleMouseOver
    }
  }
}
</script>

<style scoped>
.mine-field-tile {
  user-select: none;

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
