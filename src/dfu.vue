<template>
  <div class="page">
    <h1 class="title">DUELink Loader</h1>

    <img
      src="https://www.duelink.com/img/duelinklogo.webp"
      alt="DUELink Logo"
      class="logo"
    />

    <p class="subtitle">
      These steps will help you completely erase any DUELink module and place it
      in DFU (Device Firmware Update) mode. This is useful when loading custom
      firmware such as Arduino.
    </p>

    <p class="subtitle">
      Note that this will only erase and DFU a single module or the first module
      in a chain, ignoring the rest.
    </p>

    <img
      src="https://www.duelink.com/img/arduino-uno-r4-daisylinked.webp"
      alt="Chained modules"
      class="screenshot"
    />

    <p class="subtitle">
      Before starting, if you want to check whether your device is already in DFU
      mode <strong>on Windows</strong>, check Device Manager for a DFU device.
    </p>

    <img
      src="https://www.duelink.com/img/device-manager-dfu.webp"
      alt="Windows Device Manager DFU"
      class="screenshot"
    />

    <!-- Connection options -->
    <div class="card-container">
      <div class="card">
        <img
          src="https://www.duelink.com/img/catalog/mcduestem-b-1.webp"
          alt="USB module"
          class="card-image"
        />
        <p class="card-text">
          If your module has a USB connector, just plug it in!
        </p>
      </div>

      <div class="card">
        <img
          src="https://www.duelink.com/img/usbhook-rgb3.webp"
          alt="USB Hook"
          class="card-image"
        />
        <p class="card-text">
          If your module has a <code>U</code> Uplink connector, you need a USB
          adaptor, like USB Hook.
        </p>
      </div>
    </div>

    <p class="subtitle">
      In most cases, this automated <strong>Erase All</strong> function is all
      you need. Click the button and select the device. You should only see one
      named <em>DUELink Official</em> or <em>DUELink MicroBlocks</em>.
    </p>

    <img
      src="https://www.duelink.com/img/console-connect-dfu.webp"
      alt="Select DFU device"
      class="screenshot"
    />

    <div class="button-row">
      <button class="outline-button">
        Erase All and enter DFU
      </button>
    </div>

    <p class="subtitle">
      If this step succeeded, congratulations — your device is now erased and in
      DFU mode.
    </p>

    <p class="subtitle">
      If you did not see any device to connect to, your module might already be
      in DFU mode. Note that while <strong>Windows</strong> recognizes DFU, it
      requires a driver. Please download and install the DFU driver if needed.
    </p>

    <p class="subtitle">
      Try the <strong>Clear All Memory</strong> feature. The connect window should
      show <em>DFU in FS Mode</em>.
    </p>

    <img
      src="https://www.duelink.com/img/console-connect-dfu.webp"
      alt="DFU FS Mode"
      class="screenshot"
    />

    <div class="button-row">
      <button class="outline-button">
        Clear All Memory
      </button>
    </div>

    <hr class="divider" />

    <!-- FORCE DFU -->
    <h2 class="section-title">Force DFU Mode</h2>

    <h3 class="subsection-title">Step 1</h3>

    <p class="subtitle">
      Some DUELink modules have an <code>LDR</code> pin connected to a button,
      sometimes labeled <code>A</code>.
    </p>

    <img
      src="https://www.duelink.com/img/ldr-a-buttons.webp"
      alt="LDR / A buttons"
      class="screenshot"
    />

    <p class="subtitle">
      To force DFU mode, press and hold <code>LDR</code> or <code>A</code> and
      continue holding while clicking reset. Release the button after reset.
    </p>

    <p class="subtitle">
      If your module does not have a button, it may have two small pads instead.
    </p>

    <img
      src="https://www.duelink.com/img/module-loader-pads.webp"
      alt="Loader pads"
      class="screenshot"
    />

    <p class="subtitle">
      Place a small metal clip or wire between the two pads. Keep it in place
      while plugging in USB, then remove it once the device is powered.
    </p>

    <img
      src="https://www.duelink.com/img/boot-mode.webp"
      alt="Boot mode wiring"
      class="screenshot"
    />

    <img
      src="https://www.duelink.com/img/usbhook-rgb3.webp"
      alt="USB Hook"
      class="screenshot"
    />

    <h3 class="subsection-title">Step 2</h3>

    <p class="subtitle">
      Click <strong>Clear All Memory</strong> below. The connect window should
      show <em>DFU in FS Mode</em>. If it does not, the wiring may not be correct
      or Windows may require DFU drivers.
    </p>

    <img
      src="https://www.duelink.com/img/console-connect-dfu.webp"
      alt="DFU FS Mode"
      class="screenshot"
    />

    <div class="button-row">
      <button class="outline-button">
        Clear All Memory
      </button>
    </div>

    <p class="subtitle">
      The module is now blank and in DFU mode. You now have three options:
    </p>

    <!-- Final options -->
    <div class="card-container">
      <div class="card">
        <img
          src="https://www.duelink.com/img/languages.webp"
          alt="DUELink Official"
          class="card-image"
        />
        <p class="card-text">
          This is what Python, JavaScript and other tethered languages use.
          Standalone scripts also use this.
        </p>
        <a href="./official">
          <button class="outline-button">
            DUELink Official
          </button>
        </a>
      </div>

      <div class="card">
        <img
          src="https://www.duelink.com/img/microblocks.webp"
          alt="MicroBlocks"
          class="card-image"
        />
        <p class="card-text">
          MicroBlocks users will use this to update a single module or a chain of
          DUELink modules.
        </p>
        <a href="./microblocks">
          <button class="outline-button">
            MicroBlocks
          </button>
        </a>
      </div>

      <div class="card">
        <img
          src="https://www.duelink.com/img/arduino-logo.webp"
          alt="Arduino"
          class="card-image"
        />
        <p class="card-text">
          Build and load custom firmware. We recommend Arduino as we provide
          standalone samples for most modules.
        </p>
        <a
          href="https://www.duelink.com/docs/hw/arduino"
          target="_blank"
        >
          <button class="outline-button">
            Arduino (external link)
          </button>
        </a>
      </div>
    </div>
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