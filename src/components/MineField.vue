<template>
  <AppButton
    class="block my-5 mx-auto text-center"
    @click="generateMineField"
  >
    Generate
  </AppButton>

  <!-- {{ mineField }} -->
  <div class="mine-field">
    <div class="grid grid-cols-9 gap-0">
      <MineFieldSquare
        v-for="(tile, index) in mineField"
        :key="Math.random(index)"
        :mine="tile.mine"
        :adjacent-mines="tile.adjacentMines"
      />
    </div>
  </div>
</template>

<script>
import AppButton from './buttons/AppButton.vue'
import MineFieldSquare from './MineFieldSquare.vue'

export default {
  // Name
  name: 'MineField',

  // Components
  components: {
    AppButton,
    MineFieldSquare
  },

  // Data
  data () {
    return {
      mineField: []
    }
  },

  // Methods
  methods: {
    generateMineField () {
      const width = 9
      const height = 9
      const defaultSquare = {
        adjacentMines: 0,
        mine: false
      }
      const mineSquare = {
        adjacentMines: 0,
        mine: true
      }
      const mines = 10

      let mineField = Array(width * height)
        .fill()
        .map((item, index) => {
          return index < mines ? { ...mineSquare } : { ...defaultSquare }
        })
      mineField = this.shuffleArray(mineField)
      this.calculateAdjacentMines(mineField)
      this.mineField = mineField
    },

    shuffleArray (arr) {
      return arr.map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1])
    },

    calculateAdjacentMines (mineField, width = 9, height = 9) {
      mineField.forEach((tile, index) => {
        if (tile.mine) return console.log('its a mine?', index)
        const isRightEdgeTile = (index + 1) % width === 0
        const isLeftEdgeTile = (index) % width === 0
        const isTopEdgeTile = (index + 1) < width
        const isBottomEdgeTile = index > width * (height - 1)

        // Right Tile Check
        if (!isRightEdgeTile) {
          if (mineField[index + 1].mine) tile.adjacentMines++
        }

        // Left Tile Check
        if (!isLeftEdgeTile) {
          if (mineField[index - 1]?.mine) tile.adjacentMines++
        }

        // Top Tile Check
        if (!isTopEdgeTile) { // If we're not on the top row...
          const prevRowIndex = index - width
          // Top-Left:
          if (!isLeftEdgeTile && mineField[prevRowIndex - 1]?.mine) tile.adjacentMines++
          // Top-Center:
          if (mineField[prevRowIndex]?.mine) tile.adjacentMines++
          // Top-Right:
          if (!isRightEdgeTile && mineField[prevRowIndex + 1]?.mine) tile.adjacentMines++
        }

        // Bottom Tile Check
        if (!isBottomEdgeTile) { // If we're not on the bottom row...
          const nextRowIndex = index + width
          // Bottom-Left:
          if (!isLeftEdgeTile && mineField[nextRowIndex - 1]?.mine) tile.adjacentMines++
          // Bottom-Center:
          if (mineField[nextRowIndex]?.mine) tile.adjacentMines++
          // Bottom-Right:
          if (!isRightEdgeTile && mineField[nextRowIndex + 1]?.mine) tile.adjacentMines++
        }
      })
      return mineField
    }
  }
}
</script>

<style scoped>
.mine-field {
  width: 360px;
  margin: auto;
}
</style>
