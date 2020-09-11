<template>
  <AppButton
    class="block my-5 mx-auto text-center"
    @click="generateMineField"
  >
    Generate
  </AppButton>

  <!-- {{ mineField }} -->
  <div class="mine-field">
    <div class="mine-field__grid flex">
      <MineFieldSquare
        v-for="(tile, index) in mineField"
        :key="Math.random(index)"
        class="mine-field__tile"
        :flag="tile.flag"
        :mine="tile.mine"
        :revealed="tile.revealed"
        :adjacent-mines="tile.adjacentMines"
        @click="handleTileClick(tile, index)"
        @right-click="handleTileRightClick(tile, index)"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
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
    const mineField = ref(
      Array(props.width * props.height)
        .fill()
        .map(item => {
          return {}
        })
    )
    const gameInitiated = ref(false)
    const revealed = true

    function handleTileClick (tile) {
      if (!gameInitiated.value) {
        generateMineField()
        tile.revealed = true
        gameInitiated.value = true
      } else {
        if (tile.flag) return

        tile.revealed = true
      }
    }

    function handleTileRightClick (tile) {
      tile.flag = !tile.flag
    }

    function generateMineField () {
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

      let field = Array(props.width * props.height)
        .fill()
        .map((item, index) => {
          return index < props.mines ? { ...mineSquare } : { ...defaultSquare }
        })
      field = shuffleArray(field)
      calculateAdjacentMines(field, props.width, props.height)
      mineField.value = field
    }

    function calculateAdjacentMines (field = [], width = 9, height = 9) {
      field.forEach((tile, index) => {
        if (tile.mine) return

        const isRightEdgeTile = (index + 1) % width === 0
        const isLeftEdgeTile = (index) % width === 0
        const isTopEdgeTile = (index + 1) < width
        const isBottomEdgeTile = index > width * (height - 1)

        // Right Tile Check
        if (!isRightEdgeTile) {
          if (field[index + 1]?.mine) tile.adjacentMines++
        }

        // Left Tile Check
        if (!isLeftEdgeTile) {
          if (field[index - 1]?.mine) tile.adjacentMines++
        }

        // Top Tile Check
        if (!isTopEdgeTile) { // If we're not on the top row...
          const prevRowIndex = index - width
          // Top-Left:
          if (!isLeftEdgeTile && field[prevRowIndex - 1]?.mine) tile.adjacentMines++

          // Top-Center:
          if (field[prevRowIndex]?.mine) tile.adjacentMines++

          // Top-Right:
          if (!isRightEdgeTile && field[prevRowIndex + 1]?.mine) tile.adjacentMines++
        }

        // Bottom Tile Check
        if (!isBottomEdgeTile) { // If we're not on the bottom row...
          const nextRowIndex = index + width
          // Bottom-Left:
          if (!isLeftEdgeTile && field[nextRowIndex - 1]?.mine) tile.adjacentMines++

          // Bottom-Center:
          if (field[nextRowIndex]?.mine) tile.adjacentMines++

          // Bottom-Right:
          if (!isRightEdgeTile && field[nextRowIndex + 1]?.mine) tile.adjacentMines++
        }
      })

      return field
    }

    return {
      revealed,
      mineField,
      handleTileRightClick,
      generateMineField,
      handleTileClick
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

  &__grid {
    flex-wrap: wrap;
  }

  &__tile {
    width: calc(100% / 9);
    flex-grow: 0;
    flex-shrink: 0;
  }
}
</style>
