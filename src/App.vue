<template>
  <Home v-if="currentView === 'home'" @start="start" />
  <Timer
    v-if="currentView === 'timer'"
    :noOfActivities="settings.noOfActivities"
    :lengthOfActivities="settings.lengthOfActivities"
    :lengthOfPause="settings.lengthOfPause"
    @stop="stop"
  />
</template>

<script>
import Home from './components/Home.vue'
import Timer from './components/Timer.vue'

export default {
  components: {
    Home,
    Timer,
  },

  data: () => ({
    currentView: 'home',

    settings: {},
  }),

  methods: {
    start(settings) {
      this.currentView = 'timer'
      this.settings = settings
    },

    stop() {
      this.settings = {}
      this.currentView = 'home'
    },
  },
}
</script>
<style lang="postcss">
@font-face {
  font-family: 'MuseoModerno';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url(./assets/MuseoModerno.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215,
    U+FEFF, U+FFFD;
}

@tailwind base;

@tailwind components;

@tailwind utilities;

html,
body,
#app {
  @apply w-full h-full;
}

svg,
svg text {
  text-anchor: middle;
}
</style>
