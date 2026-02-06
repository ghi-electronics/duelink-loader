<template>
    <div id="progress-bar">
        <div
            :ref="(el) => $refs.progress = el"
            class="h-1 bg-sky-500 dark:bg-lime-500 transition duration-1000 ease-linear opacity-0"
        ></div>
    </div>
    <div class="min-h-screen flex flex-col space-y-0.5">
    
        
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
