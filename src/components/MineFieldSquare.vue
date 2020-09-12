<template>
  <AppButton
    class="mine-field-tile"
    :class="[baseStyles, computedStyles]"
    :revealed="revealed || (mine && gameOver)"
    @click="$emit('click')"
    @click.middle="$emit('middle-click')"
    @contextmenu.prevent="$emit('right-click')"
  >
    <i
      v-if="flag"
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
  </AppButton>
</template>

<script>
import AppButton from './buttons/AppButton.vue'
import { ref } from 'vue'

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
    exploded: {
      type: Boolean,
      default: false
    }
  },

  emits: ['click', 'right-click', 'middle-click'],

  setup (props) {
    return {
      baseStyles,
      computedStyles: ref({
        [`adj-${props.adjacentMines}`]: (props.revealed || props.gameOver) && props.adjacentMines > 0,
        'bg-red': props.exploded,
        revealed: (props.revealed || props.gameOver) && !props.flag,
        flag: props.flag
      })
    }
  }
}
</script>

<style scoped>
.mine-field-tile {
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
