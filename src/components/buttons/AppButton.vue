<template>
  <button
    class="app-button"
    :class="[baseStyles, baseStylesComputed, buttonStyles]"
  >
    <slot />
  </button>
</template>

<script>
import { ref } from 'vue'

const baseStyles = [
  'focus:outline-none',
  'bg-gray-500',
  'flex',
  'justify-center',
  'items-center',
  'border-gray-500',
  'bg-gray-500',
  'flex',
  'justify-center',
  'items-center'
]

export default {
  // Name
  name: 'AppButton',

  props: {
    revealed: {
      type: Boolean,
      default: false
    },
    buttonStyles: {
      type: Object,
      default: () => {}
    },
    raised: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    },
    depressed: {
      type: Boolean,
      default: false
    }
  },

  setup (props) {
    return {
      baseStyles,
      baseStylesComputed: ref({
        'app-button--depressed': props.depressed && !props.flat,
        'app-button--flat border-r border-b border-gray-600': props.flat,
        'border-4': !props.flat
      })
    }
  }
}
</script>

<style scoped>
.app-button {
  /* &__inner { */
  border-top-color: theme('colors.white');
  border-left-color: theme('colors.white');
  border-right-color: theme('colors.gray.600');
  border-bottom-color: theme('colors.gray.600');

  /* } */
  &:active:not(.app-button--flat),
  &--depressed {
    border-color: theme('colors.gray.600');
    border-width: 2px 1px 1px 2px;
  }

  &--flat {
    /* border-width: 0 1px 1px 0 !important; */
  }

}
</style>
