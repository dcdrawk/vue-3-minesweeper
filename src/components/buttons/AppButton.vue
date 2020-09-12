<template>
  <button
    class="app-button"
    :class="[baseStyles, baseStylesComputed]"
  >
    <div
      class="app-button__inner h-full w-full"
      :class="[innerStyles, innerStylesComputed, buttonStyles]"
    >
      <slot />
    </div>
  </button>
</template>

<script>
import { ref } from 'vue'

const baseStyles = [
  'focus:outline-none',
  'bg-gray-500',
  'flex',
  'justify-center',
  'items-center'
]

const innerStyles = [
  'text-xl',
  // 'border-2',
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
    }
  },

  setup (props) {
    return {
      baseStyles,
      baseStylesComputed: ref({
        // 'pointer-events-none': props.revealed
      }),
      innerStyles,
      innerStylesComputed: ref({
        'app-button-inner__revealed border-r border-b border-gray-600': props.revealed,
        'border-4': !props.revealed
      })
    }
  }
}
</script>

<style scoped>
.app-button {
  &__inner {
    border-top-color: theme('colors.white');
    border-left-color: theme('colors.white');
    border-right-color: theme('colors.gray.600');
    border-bottom-color: theme('colors.gray.600');

    &--revealed,
    &--revealed:active {
      border-width: 0px 1px 1px 0px !important;
      border-color: theme('colors.gray.600');
      @apply cursor-auto;
    }

    &:active {
      border-color: theme('colors.gray.600');
      border-width: 2px 1px 1px 2px;
    }
  }

}
</style>
