<template>
  <!-- Smiley Reset Button -->
  <AppButton
    class="block my-5 mx-auto text-center h-12 w-12"
    @click="resetMinefield"
  >
    <i
      class="reset__icon text-yellow rounded-full"
      :class="resetIconStyles"
    />
  </AppButton>

  <div class="text-center">
    Game Initiated: {{ game.initialized }}<br>
    Game Over: {{ game.over }}<br>
    <!-- Victory: {{ gameVictory }}<br> -->
  </div>

  <div class="mine-field">
    <div
      class="mine-field__grid flex"
      @mousedown.middle="handleMouseDownMiddleClick"
      @mouseup.middle="handleMouseUpMiddleClick"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseUpMiddleClick"
    >
      <!-- @mouseover.prevent.stop="handleMouseOver"
      @mouseout.prevent.stop="handleMouseUpMiddleClick" -->
      <!-- @mouseup.middle="$emit('mouse-up-middle')" -->
      <MineFieldTile
        v-for="(tile, index) in game.minefield"
        :key="Math.random(index)"
        :data-index="index"
        class="mine-field__tile"
        :flag="tile.flag"
        :mine="tile.mine"
        :game-over="game.over"
        :victory="gameVictory"
        :exploded="tile.exploded"
        :depressed="tile.depressed"
        :revealed="tile.revealed"
        :adjacent-mines="tile.adjacentMines"
        @click="handleTileClick(tile, index)"
        @right-click="handleTileRightClick(tile, index)"
      />
      <!-- @middle-click="handleTileMiddleClick(tile, index)" -->
      <!-- @mouse-down-middle="handleMouseDownMiddleClick(tile, index)" -->
      <!-- @mouse-up-middle="handleMouseUpMiddleClick(tile, index)"
        @mouse-out-middle="handleMouseUpMiddleClick(tile, index)" -->
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import AppButton from './buttons/AppButton.vue'
import MineFieldTile from './MineFieldTile.vue'

/**
 * Shuffle Array
 * credit: https://gist.github.com/guilhermepontes/17ae0cc71fa2b13ea8c20c94c5c35dc4
 */
function shuffleArray (arr) {
  return arr.map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1])
}

export default {
  // Name
  name: 'Minefield',

  // Components
  components: {
    AppButton,
    MineFieldTile
  },

  // Props
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

  // Setup
  setup (props) {
    /**
     * Reactive Game State
     */
    const game = reactive({
      initialized: false,
      over: false,
      minefield: Array(props.width * props.height)
        .fill()
        .map(item => { return {} })
    })

    /**
     * Game Victory
     * @type {boolean}
     * @desc If the number of non-revealed tiles is equal to
     * the number of mines, the player is victorious
     */
    const gameVictory = computed(
      () => game.minefield.filter(
        (tile) => !tile.revealed
      ).length === props.mines
    )

    /**
     * Reset Minefield
     * @desc reset game state, empty field
     */
    function resetMinefield () {
      game.over = false
      game.initialized = false
      game.minefield = Array(props.width * props.height)
        .fill()
        .map(item => { return {} })
    }

    /**
     * Generate Minefield
     * @desc creates a randomized minefield based on the props, ensures the safeIndex is mine-free
     * @param {number} safeIndex
     */
    function generateMinefield (safeIndex = 0) {
      // Define the tiles for our minefield
      const defaultTile = {
        adjacentMines: 0,
        mine: false,
        flag: false
      }

      const mineTile = {
        ...defaultTile,
        mine: true
      }

      // Fill the field with tiles, but subtract one for the 'safe tile'
      let field = Array((props.width * props.height) - 1)
        .fill()
        .map((item, index) => index < props.mines ? { ...mineTile } : { ...defaultTile })

      // Shuffle the field
      field = shuffleArray(field)

      // Insert the 'safe tile'
      field.splice(safeIndex, 0, {
        ...defaultTile
      })

      // Calculate the # of adjacent mines
      calculateAdjacentMines(field, props.width, props.height)

      // Set the reactive minefield value
      game.minefield = field

      // Reveal the safe tile
      revealTile(game.minefield[safeIndex], safeIndex)
    }

    /**
     * Calculate Adjacent Mines
     * @desc calculate and set the number of adjacent mines for all tiles in a field
     * @param {Array} field
     * @returns {Array}
     */
    function calculateAdjacentMines (field = []) {
      field.forEach((tile, index) => {
        if (tile.mine) return

        const adjacentMines = getAdjacentTiles(index, field)
          .filter((tile) => tile?.mine).length
        tile.adjacentMines = adjacentMines
      })

      return field
    }

    /**
     * Get Adjacent Tiles
     * @desc For any index, returns all of the adjacent tiles
     * @param {number} index
     * @param {Array} field
     * @returns {Array} list of adjacent tiles
     */
    function getAdjacentTiles (index, field = game.minefield) {
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

      return adjacentTiles
        .filter((item) => item.condition)
        .map((item) => {
          item.tile.index = item.index
          return item.tile
        })
    }

    /**
     * Reveal Tile
     * @desc reveals a tile, if it's a mine, game over!
     * @param {Object} tile
     * @param {number} index
     */
    function revealTile (tile, index) {
      if (game.over || gameVictory.value) return
      tile.revealed = true
      if (tile.mine) {
        game.over = true
        tile.exploded = true
      } else if (tile.adjacentMines === 0) {
        revealAdjacentTiles(index)
      }
    }

    /**
     * Reveal Adjacent Tiles
     * @desc reveals all tiles around an index, recursively reveals 'empty' tiles
     * @param {number} index
     * @param {Array} recursiveTiles
     */
    function revealAdjacentTiles (index, recursiveTiles = []) {
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
        revealAdjacentTiles(item.index, recursiveTiles)
      })
    }

    /**
     * Handle Tile Click
     * @desc if the game is not initiated, generate the field.
     * otherwise reveal the tile if it's not flagged or already revealed
     * @param {Object} tile
     * @param {number} index
     */
    function handleTileClick (tile, index) {
      if (!game.initialized) {
        game.initialized = true
        generateMinefield(index)
        // tile.revealed = true
      } else {
        if (tile.flag || tile.revealed) return
        revealTile(tile, index)
      }
    }

    /**
     * Handle Tile Right-Click
     * @desc adds a flag to the tile when right-clicking
     * @param {Object} tile
     */
    function handleTileRightClick (tile) {
      if (tile.revealed || game.over || gameVictory.value) return

      tile.flag = !tile.flag
    }

    /**
     * Handle Tile Middle-Click
     * @desc if the number of flags is equal to the number of adjacent mines, reveal all surrounding mines
     */
    function handleTileMiddleClick (tile, index) {
      if (!tile.revealed || game.over || gameVictory.value) return

      const adjacentTiles = getAdjacentTiles(index)
      const adjacentFlags = adjacentTiles.filter((tile) => tile.flag).length

      if (tile.adjacentMines !== adjacentFlags) return

      const adjacentUnrevealedTiles = adjacentTiles.filter((tile) => !tile.revealed && !tile.flag)
      adjacentUnrevealedTiles.forEach((tile) => {
        tile.depressed = false
        revealTile(tile, tile.index)
      })
    }

    // function handleMouseDownMiddleClick (tile, index) {
    function handleMouseDownMiddleClick (event) {
      console.log('mouse down middle...', event)
      const index = +event.target.dataset.index

      if (!index) return

      const tile = game.minefield[index]
      // console.log(tile)

      if (game.over || gameVictory.value) return

      const adjacentTiles = getAdjacentTiles(index)
      const adjacentUnrevealedTiles = adjacentTiles.filter((tile) => !tile.revealed && !tile.flag)
      // console.dir(adjacentTiles)
      tile.depressed = true
      adjacentUnrevealedTiles.forEach((tile) => {
        tile.depressed = true
        // revealTile(tile, tile.index)
      })
    }

    function handleMouseUpMiddleClick () {
      // console.log('mouse up...')
      // const adjacentTiles = getAdjacentTiles(index)
      // const adjacentUnrevealedTiles = adjacentTiles.filter((tile) => !tile.revealed && !tile.flag)
      game.minefield.forEach((tile) => {
        tile.depressed = false
      })
    }
    function handleMouseOutMiddleClick (tile, index) {
      console.log('mouse out middle')
    }

    function handleMouseOver (event) {
      if (event.buttons !== 4) return

      const index = +event.target.dataset.index
      if (!index) return

      handleMouseUpMiddleClick()
      handleMouseDownMiddleClick(event)
    }

    function handleMouseMove (event) {
      if (event.buttons !== 4) return

      const index = +event.target.dataset.index
      if (!index) return
      console.log('event', event)
    }

    // function handleMouseOut () {
    //   game.minefield.forEach((tile) => {
    //     tile.depressed = false
    //   })
    // }

    resetMinefield()

    return {
      game,
      gameVictory,
      resetMinefield,
      generateMinefield,
      handleTileClick,
      handleTileRightClick,
      handleTileMiddleClick,
      handleMouseDownMiddleClick,
      handleMouseUpMiddleClick,
      handleMouseOutMiddleClick,
      handleMouseOver,
      handleMouseMove,
      resetIconStyles: computed(() => {
        return {
          'fas fa-smile': !game.over && !gameVictory.value,
          'fas fa-dizzy': game.over && !gameVictory.value,
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
