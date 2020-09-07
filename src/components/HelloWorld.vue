<template>
  <div class="flex flex-col text-center">
    <h1 class="text-4xl">
      {{ msg }}
    </h1>
    <button
      class="w-40 mx-auto my-4 border-2 border-blue-900 bg-blue-400 hover:bg-blue-300 rounded"
      @click="count++"
    >
      count is: {{ count }}
    </button>
    <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',

  props: {
    msg: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      count: 0
    }
  }
}
</script>
