<template>
  <main
    class="flex flex-col items-center justify-around w-full min-h-full pb-4 text-center text-white bg-red-600 md:justify-center"
  >
    <h1 class="pt-3 pb-6 text-5xl select-none font-display">Circuits Timer</h1>

    <NumberInput
      v-model:value="noOfActivities"
      label="Number of Activities"
      :increment="1"
    />
    <NumberInput
      v-model:value="lengthOfActivities"
      label="Length of Activities (s)"
      :increment="5"
    />
    <NumberInput
      v-model:value="lengthOfPause"
      label="Length of Rest (s)"
      :increment="5"
    />

    <button
      class="mb-4 text-xl transition-all duration-500 rounded-full font-display hover:bg-red-500 focus:bg-red-500 outline-none focus:outline-none"
      aria-label="Start"
      @click="start"
    >
      <Icons type="play" class="transition-all duration-500 hover:p-1" />
    </button>
  </main>
</template>
<script>
import NumberInput from './NumberInput.vue'
import Icons from './Icons.vue'

export default {
  components: {
    NumberInput,
    Icons,
  },

  emits: ['start'],

  data: () => ({
    noOfActivities: 8,
    lengthOfActivities: 30,
    lengthOfPause: 15,
  }),

  mounted() {
    this.setThemeColor()
  },

  methods: {
    start() {
      this.$emit('start', {
        noOfActivities: this.noOfActivities,
        lengthOfActivities: this.lengthOfActivities,
        lengthOfPause: this.lengthOfPause,
      })
    },

    setThemeColor() {
      const red = '#E53E3E'

      const metaThemeColor = document.querySelector('meta[name=theme-color]')
      metaThemeColor.setAttribute('content', red)
    },
  },
}
</script>
