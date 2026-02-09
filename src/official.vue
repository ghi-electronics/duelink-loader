<template>
  <div class="page">
    <h1 class="title">DUELink Loader</h1>

    <p class="subtitle">
      This page will help in updating DUELink firmware on a single module
      or on the entire chain of modules.
    </p>

    <p class="subtitle">
      If you are using MicroBlocks or Arduino on the first module in a chain,
      you need to update all modules first and then upload the first module
      with a different firmware.
    </p>

    <img src="https://www.duelink.com/img/arduino-uno-r4-daisylinked.webp" alt="Chained modules" class="screenshot" />

    <hr class="divider" />

    <!-- STEP 1 -->
    <h2 class="section-title">Step 1 (Erase All)</h2>

    <p class="subtitle">
      Erase the module and enter DFU (Device Firmware Update) mode.
    </p>

    <div class="card-container">
      <div class="card">
        <img src="https://www.duelink.com/img/catalog/mcduestem-b-1.webp" alt="Module with USB" class="card-image" />
        <p class="card-text">
          If your module has a USB connector, just plug it in!
        </p>
      </div>

      <div class="card">
        <img src="https://www.duelink.com/img/usbhook-rgb3.webp" alt="USB Hook" class="card-image" />
        <p class="card-text">
          If your module has a <code>U</code> Uplink connector,
          you need a USB adaptor, like USB Hook.
        </p>
      </div>
    </div>

    <p class="subtitle">
      Click the <strong>Erase All</strong> button, then select the device.
      You should only see one named
      <em>DUELink Official</em> or <em>DUELink MicroBlocks</em>.
    </p>

    <img src="https://www.duelink.com/img/console-connect-dfu.webp" alt="Select DFU device" class="screenshot" />

    <div class="button-row">
      <button class="outline-button" @click="msg_box_erase_all_confirm_pre = true">
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
      This step will update the firmware on a single device,
      or on the first device in a chain.
    </p>

    <p class="subtitle">
      Click the button, then <strong>Connect</strong>.
      Select the <em>DFU in FS Mode</em> device.
      If using Windows, install the DFU driver first.
    </p>

    <img src="https://www.duelink.com/img/console-connect-dfu.webp" alt="DFU selection" class="screenshot" />

    <div class="button-row">
      <button class="outline-button">
        Load DUELink Firmware
      </button>
    </div>

    <hr class="divider" />

    <!-- STEP 3 -->
    <h2 class="section-title">Step 3 (Load Drivers)</h2>

    <p class="subtitle">
      This step will automatically detect the connected module
      and load the appropriate Driver Script.
    </p>

    <p class="subtitle">
      Click the <strong>Load Driver Script</strong> button,
      then select the device. You should only see one named
      <em>DUELink Official</em>.
    </p>

    <img src="https://www.duelink.com/img/console-connect-dfu.webp" alt="Driver selection" class="screenshot" />

    <div class="button-row">
      <button class="outline-button">
        Load Driver Script
      </button>
    </div>

    <!-- Custom MessageBox-->
    <div v-if="msg_box_erase_all_confirm_pre" class="overlay">
      <div class="dialog">
        <div class="dialog-title">
          <i class="fas fa-exclamation-triangle" style="color: yellow; margin-right: 8px;"></i>
          Warning
        </div>
        <div class="dialog-body">
          <p v-if="sel_dev_addr === 1">
            This feature only works on modules loaded with either DUELink official firmware or MicroBlocks firmware. It
            will completely erase the device and put it in DFU (Device Firmware Update) mode.<br><br>Note: The following
            <strong>Connect</strong> window will be empty if the device is already in DFU mode or it has an uncompatible
            firmware, see <a target="_blank" href="https://www.duelink.com/docs/loader">Loader page</a>.
          </p>
          <p v-else>
            This feature is only allowed on <strong>Sel(1)</strong>,
            you have <strong>Sel({{ sel_dev_addr }})</strong>.
          </p>
        </div>

        <div class="dialog-buttons">
          <button v-if="sel_dev_addr === 1" class="yes" @click="fn_erase_all_confirm_yes">
            Continue
          </button>
          <button :class="sel_dev_addr === 1 ? 'no' : 'yes'" @click="msg_box_erase_all_confirm_pre = false">
            Abort
          </button>

        </div>
      </div>
      <!--Erase all final confirmation-->
    </div>
    <div v-if="msg_box_erase_all_dms_confirm_final" class="overlay">
      <div class="dialog">
        <div class="dialog-title">
          <i class="fas fa-exclamation-triangle" style="color: yellow; margin-right: 8px;"></i>
          Warning
        </div>
        <div class="dialog-body">
          <p>{{ dms_confirm_final_text }}<br><br></p>
        </div>

        <div class="dialog-buttons">
          <button class="yes" @click="fn_erase_all_dms_final_yes">Yes</button>
          <button class="no" @click="fn_erase_all_dms_final_no">No</button>
        </div>
      </div>
    </div>
    <!--Erase all completed-->
    <div v-if="msg_box_erase_all_dms_finished" class="overlay">
      <div class="dialog">
        <div class="dialog-title-success">
          <i class="fas fa-check-circle" style="color: green; margin-right: 8px;"></i>
          Success
        </div>
        <div class="dialog-body">
          <p>"Erase All" operation completed. You are in DFU Mode now!<br><br>Click the Connect button on the next
            window.</p>
        </div>

        <div class="dialog-buttons">
          <button class="no" @click="
            msg_box_erase_all_dms_finished = false;
          webSerial.isBusy = false;
          ">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useWebSerial from './js/useWebSerial.js';
import mitt from "mitt";

const $refs = { editor: null, filename: null, input: null, progress: null };

const emitter = mitt();

const webSerial = useWebSerial($refs, emitter);

const status = ref('')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const GHI_VID = 0x1B9F;
const DL_PID = 0xF300;
const MB_PID = 0xF301;

// Erase all
const msg_box_erase_all_confirm_pre = ref(false);
const msg_box_erase_all_dms_confirm_final = ref(false);
const msg_box_erase_all_dms_finished = ref(false);

const sel_dev_addr = ref(1);

const ERASE_ALL_DMS_CONFIRM_FINAL_TEXT = "Firmware detected.\nAre you sure you want to erase all and enter DFU mode?";
const dms_confirm_final_text = ref(ERASE_ALL_DMS_CONFIRM_FINAL_TEXT);


async function fn_erase_all_confirm_yes() {
  msg_box_erase_all_confirm_pre.value = false
  fn_erase_all_show_web_usb_connect()
}

async function fn_erase_all_show_web_usb_connect() {

  webSerial.eraseall_status_dms.value = 0;


  if (webSerial.isConnected.value == false) {
    webSerial.eraseall_vid_dms.value = 0;

    webSerial.connection_mode.value = 2; // erase all
    await webSerial.eraseall_dms_connect();

    while (webSerial.eraseall_status_dms.value == 0) {
      await sleep(100);
    }

    await sleep(100);
  }

  if (webSerial.eraseall_vid_dms.value != 0) {
    let pid = webSerial.eraseall_vid_dms.value & 0xFFFF
    if (pid == DL_PID) {
      dms_confirm_final_text.value = "DUELink " + ERASE_ALL_DMS_CONFIRM_FINAL_TEXT;
    }
    else {
      dms_confirm_final_text.value = "MicroBlocks " + ERASE_ALL_DMS_CONFIRM_FINAL_TEXT;
    }

    msg_box_erase_all_dms_confirm_final.value = true;
  }
}

async function fn_erase_all_dms_final_yes() {
  msg_box_erase_all_dms_confirm_final.value = false;

  await webSerial.eraseall_dms_execute();

  while (webSerial.eraseall_status_dms.value < 2) {
    await sleep(250);
  }

  await sleep(250);
  msg_box_erase_all_dms_finished.value = true;

}

async function fn_erase_all_dms_final_no() {
  msg_box_erase_all_dms_confirm_final.value = false;

  if (webSerial.isConnected) {
    await webSerial.disconnect();
    await sleep(250);
  }


}

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

<style scoped></style>