<template>
  <div>
    <label
      for="noOfActivities"
      class="block px-4 pb-2 text-2xl font-semibold text-center select-none"
    >
      {{ label }}:
    </label>
    <div class="flex flex-row flex-wrap items-center justify-center max-w-full">
      <input
        id="noOfActivities"
        :value="value"
        :style="`width: ${value.toString().length + 1}ch`"
        type="number"
        class="block h-32 max-w-full px-2 mx-4 mb-8 text-center transition-all duration-300 ease-in-out bg-transparent border-white outline-none appearance-none font-display text-10xl focus:border-b focus:outline-none"
        min="0"
        max="9999"
        @input="emit($event.target.value)"
      />

      <div class="block h-32">
        <button
          :aria-label="`${label} - Increase - (${increment})`"
          class="block h-12 outline-none focus:outline-none"
          tabindex="-1"
          @click.prevent="emit(value + increment)"
        >
          <svg
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-12"
            alt="Up"
          >
            <path d="M5 15l7-7 7 7"></path>
          </svg>
        </button>
        <button
          :aria-label="`${label} - Decrease - (${increment})`"
          class="block h-12 outline-none focus:outline-none"
          tabindex="-1"
          @click.prevent="emit(value - increment)"
        >
          <svg
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-12"
            alt="Down"
          >
            <path d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      default: '',
      type: String,
    },
    value: {
      default: 0,
      type: Number,
    },
    increment: {
      default: 0,
      type: Number,
    },
  },
  emits: ['update:value'],

  methods: {
    emit(value) {
      if (value < 0) this.$emit('update:value', 0)
      else if (value > 9999) this.$emit('update:value', 9999)
      else this.$emit('update:value', Number(value))
    },
  },
}
</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
