<template>
  <!-- Smiley Reset Button -->
  <AppButton
    class="block my-5 mx-auto text-center h-12 w-12"
    @click="resetMineField"
  >
    <i
      class="reset__icon text-yellow rounded-full"
      :class="resetIconStyles"
    />
  </AppButton>

  Game Initiated: {{ gameInitiated }}<br>
  Game Over: {{ gameOver }}<br>
  Victory: {{ gameVictory }}<br>
  {{ resetIconStyles }}

  <div class="mine-field">
    <div class="mine-field__grid flex">
      <MineFieldSquare
        v-for="(tile, index) in mineField"
        :key="Math.random(index)"
        class="mine-field__tile"
        :flag="tile.flag"
        :mine="tile.mine"
        :game-over="gameOver"
        :exploded="tile.exploded"
        :revealed="tile.revealed"
        :adjacent-mines="tile.adjacentMines"
        @click="handleTileClick(tile, index)"
        @right-click="handleTileRightClick(tile, index)"
        @middle-click="handleTileMiddleClick(tile, index)"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import AppButton from './buttons/AppButton.vue'
import MineFieldSquare from './MineFieldSquare.vue'

function shuffleArray (arr) {
  return arr.map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1])
}

export default {
  // Name
  name: 'MineField',

  // Components
  components: {
    AppButton,
    MineFieldSquare
  },

  props: {
    width: {
      type: Number,
      default: 9
    },
    height: {
      type: Number,
      default: 9
    },
    mines: {
      type: Number,
      default: 10
    }
  },

  setup (props) {
    const mineField = ref([])
    const gameInitiated = ref(false)
    const gameOver = ref(false)
    const gameVictory = computed(
      () => mineField.value.filter((tile) => !tile.revealed).length === props.mines
    )
    const revealed = true

    function resetMineField () {
      gameOver.value = false
      mineField.value = Array(props.width * props.height)
        .fill()
        .map(item => {
          return {}
        })
      gameInitiated.value = false
    }

    function generateMineField (safeIndex = 0) {
      const defaultSquare = {
        adjacentMines: 0,
        mine: false,
        flag: false
      }
      const mineSquare = {
        adjacentMines: 0,
        mine: true,
        flag: false
      }

      let field = Array((props.width * props.height) - 1)
        .fill()
        .map((item, index) => {
          return index < props.mines ? { ...mineSquare } : { ...defaultSquare }
        })
      field = shuffleArray(field)
      field.splice(safeIndex, 0, {
        ...defaultSquare
        // revealed: true
      })
      calculateAdjacentMines(field, props.width, props.height)
      mineField.value = field
      revealTile(mineField.value[safeIndex], safeIndex)
    }

    function calculateAdjacentMines (field = [], width = 9, height = 9) {
      field.forEach((tile, index) => {
        if (tile.mine) return

        const adjacentMines = getAdjacentTiles(index, field)
          .filter((tile) => tile?.mine).length
        tile.adjacentMines = adjacentMines
      })

      return field
    }

    function getAdjacentTiles (index, field = mineField.value) {
      const prevRowIndex = index - props.width
      const nextRowIndex = index + props.width

      const isRightEdgeTile = (index + 1) % props.width === 0
      const isLeftEdgeTile = (index) % props.width === 0
      const isTopEdgeTile = (index + 1) <= props.width
      const isBottomEdgeTile = index >= props.width * (props.height - 1)

      const leftTile = index - 1
      const rightTile = index + 1
      const topLeftTile = prevRowIndex - 1
      const topRightTile = prevRowIndex + 1
      const bottomLeftTile = nextRowIndex - 1
      const bottomRightTile = nextRowIndex + 1
      // debugger

      const adjacentTiles = [
        // Left:
        {
          condition: !isLeftEdgeTile,
          tile: field[leftTile],
          index: leftTile
        },
        // Right:
        {
          condition: !isRightEdgeTile,
          tile: field[rightTile],
          index: rightTile
        },
        // Top-Left:
        {
          condition: !isTopEdgeTile && !isLeftEdgeTile,
          tile: field[topLeftTile],
          index: topLeftTile
        },
        // Top-Center
        {
          condition: !isTopEdgeTile,
          tile: field[prevRowIndex],
          index: prevRowIndex
        },
        // Top-Right
        {
          condition: !isTopEdgeTile && !isRightEdgeTile,
          tile: field[topRightTile],
          index: topRightTile
        },
        // Bottom-Left:
        {
          condition: !isBottomEdgeTile && !isLeftEdgeTile,
          tile: field[bottomLeftTile],
          index: bottomLeftTile
        },
        // Bottom-Center
        {
          condition: !isBottomEdgeTile,
          tile: field[nextRowIndex],
          index: nextRowIndex
        },
        // Bottom-Right
        {
          condition: !isBottomEdgeTile && !isRightEdgeTile,
          tile: field[bottomRightTile],
          index: bottomRightTile
        }
      ]

      return adjacentTiles.filter((item) => item.condition).map((item) => {
        item.tile.index = item.index
        return item.tile
      })
    }

    function revealTile (tile, index) {
      if (gameOver.value || gameVictory.value) return
      tile.revealed = true
      if (tile.mine) {
        gameOver.value = true
        tile.exploded = true
      } else if (tile.adjacentMines === 0) {
        revealAdjacentMines(index)
      }
    }

    function revealAdjacentMines (index, recursiveTiles = []) {
      if (recursiveTiles.length) recursiveTiles.shift()

      const adjacentHiddenTiles = getAdjacentTiles(index)
        .filter((tile) => !tile?.revealed)

      adjacentHiddenTiles.forEach(tile => {
        if (!tile?.revealed && tile?.adjacentMines === 0) {
          recursiveTiles.push(tile)
        }
        tile.revealed = true
      })

      recursiveTiles.forEach((item) => {
        revealAdjacentMines(item.index, recursiveTiles)
      })
    }

    function handleTileClick (tile, index) {
      if (!gameInitiated.value) {
        gameInitiated.value = true
        generateMineField(index)
        tile.revealed = true
      } else {
        if (tile.flag || tile.revealed) return
        revealTile(tile, index)
      }
    }

    function handleTileRightClick (tile) {
      tile.flag = !tile.flag
    }

    function handleTileMiddleClick (tile, index) {
      if (!tile.revealed) return

      const adjacentTiles = getAdjacentTiles(index)
      const adjacentFlags = adjacentTiles.filter((tile) => tile.flag).length

      if (tile.adjacentMines !== adjacentFlags) return

      const adjacentUnrevealedTiles = adjacentTiles.filter((tile) => !tile.revealed && !tile.flag)
      adjacentUnrevealedTiles.forEach((tile) => {
        revealTile(tile, tile.index)
      })
    }

    resetMineField()

    return {
      gameInitiated,
      gameOver,
      gameVictory,
      revealed,
      mineField,
      resetMineField,
      generateMineField,
      handleTileClick,
      handleTileRightClick,
      handleTileMiddleClick,
      resetIconStyles: computed(() => {
        return {
          'fas fa-smile': !gameOver.value && !gameVictory.value,
          'fas fa-dizzy': gameOver.value && !gameVictory.value,
          'fas fa-grin-stars': gameVictory.value
        }
      })
    }
  }
}
</script>

<style scoped>
.mine-field {
  width: 360px;
  margin: auto;
  @apply border;
  @apply border-gray-600;
  border-width: 1px 0 0 1px;

  &__grid {
    flex-wrap: wrap;
  }

  &__tile {
    width: calc(100% / 9);
    flex-grow: 0;
    flex-shrink: 0;
  }
}

.reset__icon {
  font-size: 32px;
  backface-visibility: hidden;
}
</style>
