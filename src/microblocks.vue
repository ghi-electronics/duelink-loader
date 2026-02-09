<template>
  <div class="page">
    <h1 class="title">MicroBlocks Firmware Loader</h1>
  <hr class="divider" />
    <!-- STEP 1 -->
    <h2 class="section-title">Step 1 (Erase All)</h2>

    <p class="subtitle">
      Connect your module using a USB cable.
    </p>

    <img
          src="/img/catalog/mcduestem-b-1.webp"
          alt="Module with USB"
          class="card-image"
        />


    <p class="subtitle">
      Click the <strong>Erase All</strong> button, then select the device.
      You should only see one named <em>DUELink Official</em> or
      <em>DUELink MicroBlocks</em>.
    </p>

    <img
      src="/img/console-connect-dfu.webp"
      alt="Select DFU device"
      class="screenshot"
    />

    <div class="button-row">
      <button class="outline-button">
        Erase All
      </button>
    </div>

    <p class="subtitle">
      If <strong>Erase All</strong> failed, visit the
      <a href="https://www.duelink.com/docs/loader" target="_blank">
        loader documentation page
      </a>.
    </p>

    <hr class="divider" />

    <!-- STEP 2 -->
    <h2 class="section-title">Step 2 (Load Firmware)</h2>

    <p class="subtitle">
      This step will load MicroBlocks firmware on a single device
      or the first device in a chain.
    </p>

    <p class="subtitle">
      If you need to update the DUELink firmware on chained modules,
      do that first on the DUELink update page.
    </p>

    <img
      src="/img/arduino-uno-r4-daisylinked.webp"
      alt="Chained modules"
      class="screenshot"
    />

    <p class="subtitle">
      Click the button, then <strong>Connect</strong>. Select the
      <em>DFU in FS Mode</em> device.
      If using Windows, install the DFU driver first.
    </p>

    <img
      src="/img/console-connect-dfu.webp"
      alt="DFU selection"
      class="screenshot"
    />

    <div class="button-row">
      <button class="outline-button">
        Load MicroBlocks Firmware
      </button>
    </div>

    <p class="subtitle">
      Congratulations! You can now block-code using
      <a
        href="https://www.duelink.com/docs/language/microblocks"
        target="_blank"
      >
        MicroBlocks
      </a>.
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

<style scoped>

</style>