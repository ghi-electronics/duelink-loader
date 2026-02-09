<template>
  <div class="page">
    <!-- Header -->
    <h1 class="title">DUELink Loader</h1>

    <img
      src="https://www.duelink.com/img/duelinklogo.webp"
      alt="DUELink Logo"
      class="logo"
    />

    <p class="subtitle">
      These pages will help you with updating your DUELink modules.
      Select the option that best suits your needs.
    </p>

    <!-- Two main options -->
    <div class="card-container">
      <div class="card">
        <img
          src="https://www.duelink.com/img/languages.webp"
          alt="Languages"
          class="card-image"
        />
        <p class="card-text">
          This is what Python, JavaScript and other tethered languages use.
          You will also use this with Standalone Scripts.
        </p>

        <a href="./official">
          <button class="outline-button">
            DUELink Update Steps
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
          MicroBlocks users will use this to update a single module
          or a chain of DUELink modules.
        </p>

        <a href="./microblocks">
          <button class="outline-button">
            MicroBlocks Update Steps
          </button>
        </a>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import tippy from 'tippy.js';
import useWebSerial from './js/useWebSerial.js';
import mitt from "mitt";


// Components



// Const
const GHI_VID = 0x1B9F;
const DL_PID = 0xF300;
const MB_PID = 0xF301;
// Refs

const $refs = { editor: null, filename: null, input: null, progress: null };

// Emitter
const emitter = mitt();

// Setup
const webSerial = useWebSerial($refs, emitter);


// Computed


// Watch

watch(() => webSerial.isConnected, (value) => {
    
});

// Created

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    theme.value = 'dark';
    tippyConfig.theme = 'dark';
}

// Methods




</script>

<style scoped>

</style>
