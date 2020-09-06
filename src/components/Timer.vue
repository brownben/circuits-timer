<template>
  <main
    class="flex flex-col items-center justify-around w-full min-h-full pb-4 text-center text-white"
    :class="{
      'bg-red-600': currentStage === 'pause',
      'bg-green-600': currentStage !== 'pause',
    }"
  >
    <div>
      <h1 class="pt-3 text-5xl select-none md:text-7xl font-display">
        <template v-if="currentStage !== 'pause'"> Go!</template>
        <template v-else> Rest </template>
      </h1>
      <h2 class="pb-4 text-3xl select-none md:text-4xl font-display">
        Activity {{ currentActivity }} of {{ noOfActivities }}
      </h2>
    </div>

    <div
      class="w-10/12 pt-6 pb-8 select-none sm:w-3/4 sm:w-2/3 md:pb-16 lg:w-1/2 xl:w-1/3 "
    >
      <svg class="flex-grow text-white fill-current" :viewBox="textViewBox">
        <text class="font-display" x="50%" y="12">
          {{ currentTime }}
        </text>
      </svg>
    </div>
    <div>
      <button
        class="mx-6 text-xl transition-all duration-500 rounded-full font-display outline-none focus:outline-none"
        :class="{
          'hover:bg-red-500': currentStage === 'pause',
          'hover:bg-green-500': currentStage !== 'pause',
        }"
        aria-label="Pause/ Play"
        @click="pause"
      >
        <Icons
          v-if="!paused"
          type="pause"
          class="transition-all duration-500 hover:p-1"
        />
        <Icons
          v-else
          type="play"
          class="transition-all duration-500 hover:p-1"
        />
      </button>
      <button
        class="mx-6 text-xl transition-all duration-500 rounded-full font-display outline-none focus:outline-none"
        :class="{
          'hover:bg-red-500': currentStage === 'pause',
          'hover:bg-green-500': currentStage !== 'pause',
        }"
        aria-label="Stop"
        @click="stop"
      >
        <Icons type="stop" class="transition-all duration-500 hover:p-1" />
      </button>
    </div>
  </main>
</template>
<script>
import Icons from './Icons.vue'

export default {
  components: {
    Icons,
  },

  props: {
    noOfActivities: { type: Number, default: 8 },
    lengthOfActivities: { type: Number, default: 30 },
    lengthOfPause: { type: Number, default: 15 },
  },

  data: () => ({
    paused: false,

    currentStage: 'pause',
    currentTime: 0,
    currentActivity: 0,

    interval: false,
    audio: false,
  }),

  computed: {
    textViewBox() {
      const numberOfDigits = this.currentTime.toString().length

      if (numberOfDigits === 1) return '0 0 25 13'
      else if (numberOfDigits === 2) return '0 0 20 13'
      else if (numberOfDigits === 3) return '0 0 30 13'
      else return '0 0 40 13'
    },
  },

  mounted() {
    this.currentTime = 3

    this.setThemeColor()

    if (window.AudioContext) this.audio = new AudioContext()

    if (this.interval) clearInterval(this.interval)
    this.interval = setInterval(this.tick, 1000)

    window.addEventListener('beforeunload', (event) => {
      event.returnValue = true
    })
  },

  beforeDestroy() {
    this.clearUp()
  },

  methods: {
    clearUp() {
      if (this.interval) clearInterval(this.interval)

      window.removeEventListener('beforeunload', (event) => {
        event.returnValue = true
      })
    },

    stop() {
      this.clearUp()

      this.$emit('stop')
    },

    tick() {
      this.currentTime -= 1

      if (this.currentTime < 0) this.resetCountdown()
    },

    resetCountdown() {
      this.beep(100, 520, 1000, 'penalty')

      if (this.currentStage === 'pause') {
        this.currentStage = 'go'
        this.currentTime = this.lengthOfActivities
        this.currentActivity += 1
      } else if (this.currentActivity >= this.noOfActivities) this.stop()
      else {
        this.currentStage = 'pause'
        this.currentTime = this.lengthOfPause
      }
      this.setThemeColor()
    },

    pause() {
      if (this.paused) this.interval = setInterval(this.tick, 1000)
      else clearInterval(this.interval)

      this.paused = !this.paused
    },

    setThemeColor() {
      const red = '#E53E3E'
      const green = '#38A169'

      let color = red
      if (this.currentStage !== 'pause') color = green

      const metaThemeColor = document.querySelector('meta[name=theme-color]')
      metaThemeColor.setAttribute('content', color)
    },

    beep(vol, freq, duration) {
      if (!this.audio) return

      navigator.vibrate(1000)
      const oscillator = this.audio.createOscillator()
      const gain = this.audio.createGain()
      oscillator.connect(gain)
      oscillator.frequency.value = freq
      oscillator.type = 'square'
      gain.connect(this.audio.destination)
      gain.gain.value = vol * 0.01
      oscillator.start(this.audio.currentTime)
      oscillator.stop(this.audio.currentTime + duration * 0.001)
    },
  },
}
</script>
