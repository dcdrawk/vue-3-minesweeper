<template>
  <button
    class="app-button"
    :class="baseStyles"
  >
    <div
      class="app-button__inner"
      :class="innerStyles"
    >
      <slot />
    </div>
  </button>
</template>

<script>

const baseStyles = [
  'border border-gray-600',
  'focus:outline-none',
  'focus:shadow-outline'
]

const innerStyles = [
  'h-10',
  'px-4',
  'text-xl',
  'border-4',
  'border-gray-500',
  'bg-gray-500',
  'flex',
  'justify-center',
  'items-center'
]

export default {
  // Name
  name: 'AppButton',

  setup () {
    return {
      baseStyles,
      innerStyles
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

    &:active {
      border-top-color: theme('colors.gray.600');
      border-left-color: theme('colors.gray.600');
      border-right-color: theme('colors.white');
      border-bottom-color: theme('colors.white');
    }
  }
}
</style>
