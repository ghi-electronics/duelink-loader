<template>
  <div>
    <h1>MicroBlocks</h1>

    <button @click="connect">
      Connect Device
    </button>

    <p v-if="status">
      {{ status }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// later you will import your real logic here
// import { connectSerial } from './useWebSerial.js'

const status = ref('')

async function connect() {
  try {
    status.value = 'Connecting...'

    // await connectSerial()
    // placeholder for now
    await new Promise(r => setTimeout(r, 500))

    status.value = 'Connected'
  } catch (e) {
    status.value = 'Connection failed'
    console.error(e)
  }
}
</script>