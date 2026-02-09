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
      <button class="outline-button" @click="fn_erase_all_show_web_usb_connect()">
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
      <button class="outline-button" @click="fn_load_firmware">
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
    <!--Progress bar progressbar_erase_all-->
    <div v-if="progressbar_erase_all" class="overlay">
      <div class="dialog" style="width: 25vw;">
        <div class="dialog-title" :class="{ 'dialog-title-success': percent_tmp === 100 }">
          <!--<i class="fas fa-exclamation-triangle" style="color: yellow; margin-right: 8px;"></i>-->
          <!-- Show icon only while writing -->
          <i v-if="percent_tmp < 100" class="fas fa-exclamation-triangle" style="margin-right: 8px;"></i>
          {{ percent_tmp < 100 ? "Please wait..." : "Completed" }} </div>
            <div class="dialog-body">
              <!-- Progress bar -->
              <br>
              <div class="update-driver-progress-container">
                <div class="update-driver-progress-bar" :style="{
                  width: percent_tmp + '%'

                }">
                </div>
              </div>

              <!-- Percent text -->
              <div class="progress-text">
                {{ percent_tmp }}%
              </div>
            </div>
        </div>
      </div>
      <!--Progress bar progressbar_erase_all-->
      <div v-if="progressbar_dfu_load_fw" class="overlay">
        <div class="dialog" style="width: 25vw;">
          <div class="dialog-title" :class="{ 'dialog-title-success': percent_tmp === 100 }">
            <!--<i class="fas fa-exclamation-triangle" style="color: yellow; margin-right: 8px;"></i>-->
            <!-- Show icon only while writing -->
            <i v-if="percent_tmp < 100" class="fas fa-exclamation-triangle" style="margin-right: 8px;"></i>
            {{ percent_tmp < 100 ? state : state }} </div>
              <div class="dialog-body">
                <!-- Progress bar -->
                <br>
                <div class="update-driver-progress-container">
                  <div class="update-driver-progress-bar" :style="{
                    width: percent_tmp + '%'

                  }">
                  </div>
                </div>

                <!-- Percent text -->
                <div class="progress-text">
                  {{ percent_tmp }}%
                </div>
              </div>
          </div>
        </div>
      </div>
</template>

<script setup>
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import useWebSerial from './js/useWebSerial.js';
import mitt from "mitt";

const $refs = { editor: null, filename: null, input: null, progress: null };

const emitter = mitt();

const webSerial = useWebSerial($refs, emitter);

const status = ref('')
const state = ref('')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const GHI_VID = 0x1B9F;
const DL_PID = 0xF300;
const MB_PID = 0xF301;

// Erase all
const msg_box_erase_all_dms_confirm_final = ref(false);
const msg_box_erase_all_dms_finished = ref(false);
const progressbar_erase_all = ref(false);
const progressbar_dfu_load_fw = ref(false);



const percent_tmp = ref(0);
const sel_dev_addr = ref(1);

const ERASE_ALL_DMS_CONFIRM_FINAL_TEXT = "Firmware detected.\nAre you sure you want to erase all and enter DFU mode?";
const dms_confirm_final_text = ref(ERASE_ALL_DMS_CONFIRM_FINAL_TEXT);

//Erase all stuff
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

  percent_tmp.value = 0
  progressbar_erase_all.value = true
  
  
  await webSerial.eraseall_dms_execute();

  while (webSerial.eraseall_status_dms.value < 2) {
    await sleep(250);
    percent_tmp.value = 50
  }
  percent_tmp.value = 100
  await sleep(250);

  progressbar_erase_all.value = false
  msg_box_erase_all_dms_finished.value = true;

}

async function fn_erase_all_dms_final_no() {
  msg_box_erase_all_dms_confirm_final.value = false;

  if (webSerial.isConnected) {
    await webSerial.disconnect();
    await sleep(250);
  }


}



// DFU stuff
// ----- Configuration -----
const STM32_VID = 0x0483;           // STMicroelectronics
const STM32_PID = 0xDF11;           // STMicroelectronics
const DFU_INTERFACE_NUMBER = 0;
const DFU_TRANSFER_SIZE = 1024;
const DFU_PAGE_ERASE_SIZE = 2048;
const BASE_ADDRESS = 0x08000000;

let device;
const isDfuConnected = ref(false);
const progressbar_dfu = ref(false);
const availableDfu = reactive({});

loadDfu()

//await loadFirmwareForKey("DUELink")

async function loadDfu() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/ghi-electronics/duelink-website/refs/heads/dev/static/duelink-fw.json');
    const jsonData = await response.json();

    Object.keys(jsonData).forEach((key) => {
      availableDfu[key] = jsonData[key];
      availableDfu[key].isGlb = false;
      availableDfu[key].image = null;
    });
  } catch (error) {
    console.log(error);
  }
}

async function loadFirmwareForKey(key) {
  const entry = availableDfu[key];

  if (!entry || !Array.isArray(entry.versions) || entry.versions.length === 0) {
    console.warn('No firmware versions found for', key);
    return;
  }

  // Pick latest version by highest id
  const latest = entry.versions.reduce((a, b) =>
    b.id > a.id ? b : a
  );

  const url = latest.url;

  // 👇 This is what you asked for
  console.log('Firmware URL:', url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const blob = await response.blob();
    const data = await blob.arrayBuffer();

    entry.image = data;

    console.log('Firmware downloaded and ready');
  } catch (err) {
    console.error('Failed to download firmware', err);
    entry.image = null;
  }
}

async function writeFirmware(key) {
  const entry = availableDfu[key];
  await performDfuFirmwareUpgrade(entry.image);
}


async function fn_load_firmware() {
  await connectDevice()


  if (isDfuConnected.value) {
    percent_tmp.value = 0
    progressbar_dfu_load_fw.value = true
    await loadFirmwareForKey("DUELink")
    await writeFirmware("DUELink")

    progressbar_dfu_load_fw.value = false
  }
}

function progress(current, total) {
  //operation.value = current < 3 ? "Erasing" : "Loading";
  percent_tmp.value = Math.round((current / total) * 100);
  if (percent_tmp.value >= 100) {

  }

  console.log(percent_tmp.value)
}

async function connectDevice() {
  try {
    isDfuConnected.value = false;
    device = await navigator.usb.requestDevice({
      filters: [
        {
          vendorId: STM32_VID,      // STMicroelectronics
          productId: STM32_PID      // STM32 DFU bootloader
        }
      ]
    });
    await device.open();
    if (!device.configuration) {
      await device.selectConfiguration(1);
    }
    await device.claimInterface(DFU_INTERFACE_NUMBER);
    //console.log("Device connected; DFU interface claimed.");
    //document.getElementById("startUpdate").disabled = false;
    isDfuConnected.value = true;
  } catch (error) {
    error.value = "Connection error: " + error;
    //console.log("Connection error: " + error);
    isDfuConnected.value = false;
  }
}

// ----- DFU Request Helpers -----
const DFU_DNLOAD = 1;       // DFU_DNLOAD request code
const DFU_GETSTATUS = 3;    // DFU_GETSTATUS request code
const DFU_CLRSTATUS = 4;    // DFU_CLRSTATUS request code

// Send a DFU_DNLOAD request with the given block number and data.
async function dfuDownloadBlock(blockNumber, dataBuffer) {
  const result = await device.controlTransferOut({
    requestType: 'class',
    recipient: 'interface',
    request: DFU_DNLOAD,
    value: blockNumber,
    index: DFU_INTERFACE_NUMBER
  }, dataBuffer);
  if (result.status !== "ok") {
    throw new Error("DNLOAD transfer failed at block " + blockNumber);
  }
  return result;
}

// Get DFU status (6-byte response)
async function dfuGetStatus() {
  const result = await device.controlTransferIn({
    requestType: 'class',
    recipient: 'interface',
    request: DFU_GETSTATUS,
    value: 0,
    index: DFU_INTERFACE_NUMBER
  }, 6);
  if (result.status === 'ok' && result.data && result.data.byteLength === 6) {
    const view = new DataView(result.data.buffer);
    return {
      status: view.getUint8(0),
      pollTimeout: view.getUint8(1) | (view.getUint8(2) << 8) | (view.getUint8(3) << 16),
      state: view.getUint8(4),
      iString: view.getUint8(5)
    };
  } else {
    throw new Error("Failed to read DFU status.");
  }
}

// Wait for DFU idle states 5 - dfuDNLOAD-IDLE or 2 - dfuIDLE
async function waitForDfuIdle() {
  while (true) {
    const status = await dfuGetStatus();
    console.log(`DFU state: ${status.state} - pollTimeout: ${status.pollTimeout}ms`);
    if (status.state === 5 || status.state === 2) break;
    await sleep(status.pollTimeout);
  }
}

// ----- Flash Erase Routine -----
// Erases the flash pages that will be programmed.
async function eraseTargetArea(totalSize) {
  // Calculate number of pages to erase.
  state.value = 'Erasing...';
  const pages = Math.ceil(totalSize / DFU_PAGE_ERASE_SIZE);
  console.log(`Erasing ${pages} flash page(s) starting at 0x${BASE_ADDRESS.toString(16)}...`);
  for (let i = 0; i < pages; i++) {
    const pageAddress = BASE_ADDRESS + i * DFU_PAGE_ERASE_SIZE;
    const eraseBlock = new Uint8Array(5);
    // Set up the erase command:
    // 0x41 Erase command.
    eraseBlock[0] = 0x41;
    // Next 4 bytes: flash page address (little-endian)
    eraseBlock[1] = pageAddress & 0xff;
    eraseBlock[2] = (pageAddress >> 8) & 0xff;
    eraseBlock[3] = (pageAddress >> 16) & 0xff;
    eraseBlock[4] = (pageAddress >> 24) & 0xff;
    console.log(`Erasing flash page at address 0x${pageAddress.toString(16)}`);
    await dfuDownloadBlock(0, eraseBlock);
    await waitForDfuIdle();
    progress(i, pages);
    //await sleep(200); // Allow time for erase to complete.
  }

  state.value = 'Erased.';
  progress(0, 100);  
  console.log("Erase complete.");
}

// ----- DFU Go command (Single-Session, DFU 1.1) -----
async function Go() {
  console.log(`Sending final zero-length packet  to complete DFU transfer...`);
  let cmdBlock = new Uint8Array(5);
  try {
    cmdBlock[0] = 0x21; // "Download Memory" command
    cmdBlock[1] = BASE_ADDRESS & 0xff;
    cmdBlock[2] = (BASE_ADDRESS >> 8) & 0xff;
    cmdBlock[3] = (BASE_ADDRESS >> 16) & 0xff;
    cmdBlock[4] = (BASE_ADDRESS >> 24) & 0xff;
    console.log(`Sending address command block (block 0): write pointer set to 0x${BASE_ADDRESS.toString(16)}`);
    await dfuDownloadBlock(0, cmdBlock);
    await waitForDfuIdle();


    await dfuDownloadBlock(0, new ArrayBuffer(0));

    await waitForDfuIdle();

    return 1;
  } catch (e) {
    // STM32 DFU bootloader can return an error (e.g. status error 10)
    // when the final packet triggers the manifest phase (reset).
    console.log(`Finalization error (expected during manifest/reset): ${e.message}`);
  }

  return 0;
}


// ----- DFU Erase all Process (Single-Session, DFU 1.1) -----
async function performEraseAll() {
  try {
    let status = await dfuGetStatus();

    if (status.status !== 0) {
      console.log("Clearing DFU error status...");
      await device.controlTransferOut({
        requestType: 'class',
        recipient: 'interface',
        request: DFU_CLRSTATUS,
        value: 0,
        index: DFU_INTERFACE_NUMBER
      });
      await sleep(100);
    }

    const totalSize = 128 * 1024; // max size is 128k
    await eraseTargetArea(totalSize);

    // await this.Go();

    //state.value = "erase_complete";
  }
  catch (err) {
    console.log("Erase all failed: " + err.message);
    //state.value = "erase_complete";
  }
}

// ----- DFU Firmware Upgrade Process (Single-Session, DFU 1.1) -----
async function performDfuFirmwareUpgrade(firmwareBuffer) {
  try {
    // Clear any previous DFU error status.
    let status = await dfuGetStatus();
    if (status.status !== 0) {
      console.log("Clearing DFU error status...");
      await device.controlTransferOut({
        requestType: 'class',
        recipient: 'interface',
        request: DFU_CLRSTATUS,
        value: 0,
        index: DFU_INTERFACE_NUMBER
      });
      await sleep(100);
    }

    const totalSize = firmwareBuffer.byteLength;
    console.log(`Firmware size: ${totalSize} bytes`);

    // -------- Step 0: Erase flash pages --------
    await eraseTargetArea(totalSize);

    // this to make sure we don't see progress bar runs backward.
    percent_tmp.value = 0
    progressbar_dfu_load_fw.value = false

    await sleep(250);

    progressbar_dfu_load_fw.value = true

    state.value = 'Writing...';
    // -------- Step 1: Set the flash write pointer --------
    // Send block 0 with the "Download Memory" command (0x21)
    // Using the intended flash base address.
    let cmdBlock = new Uint8Array(5);
    cmdBlock[0] = 0x21; // "Download Memory" command
    cmdBlock[1] = BASE_ADDRESS & 0xff;
    cmdBlock[2] = (BASE_ADDRESS >> 8) & 0xff;
    cmdBlock[3] = (BASE_ADDRESS >> 16) & 0xff;
    cmdBlock[4] = (BASE_ADDRESS >> 24) & 0xff;
    console.log(`Sending address command block (block 0): write pointer set to 0x${BASE_ADDRESS.toString(16)}`);
    await dfuDownloadBlock(0, cmdBlock);
    await waitForDfuIdle();

    // -------- Step 2: Send firmware data blocks --------
    // The fix: start the firmware data at block number 2 (skip block 1).
    // This ensures that the first 1024 bytes of the file are written starting at BASE_ADDRESS.
    let offset = 0;
    let blockNumber = 2;
    while (offset < totalSize) {
      const chunk = firmwareBuffer.slice(offset, offset + DFU_TRANSFER_SIZE);
      console.log(`Transferring block ${blockNumber} (size: ${chunk.byteLength} bytes)...`);
      await dfuDownloadBlock(blockNumber, chunk);
      await waitForDfuIdle();
      offset += chunk.byteLength;
      blockNumber++;
      progress(offset, totalSize);
    }

    // -------- Step 3: Finalize DFU download --------
    console.log(`Sending final zero-length packet (block ${blockNumber}) to complete DFU transfer...`);
    await Go();
    console.log("Firmware update complete. The device should now program the firmware and reset.");
    //state.value = "complete";
  } catch (err) {
    console.log("Firmware upgrade failed: " + err.message);
    //state.value = "complete";
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