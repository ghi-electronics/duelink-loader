<template>
  <div class="page">
    <h1>Discover</h1>

    <p>
      This page will discovery devices in chain
    </p>

    <div>
      <button class="outline-button" @click="fn_discover" :disabled="is_doing_discover">
        {{ button_text }}
      </button>
    </div>
    <hr />
    <div class="devices-wrapper">
      <div v-for="device in webSerial.devicesChainList.value" :key="device.address" class="device-card">
        <div class="image-box">
          <img :src="device.image" class="device-image" />
        </div>

        <div class="device-info">
          <div><strong>Device Name:</strong> {{ device.name }}</div>
          <div><strong>Device Address:</strong> {{ device.address }}</div>
          <div><strong>Firmware Version:</strong> {{ device.firmwareVersion }}</div>
          <div>
            <a :href="device.detail" target="_blank" rel="noopener noreferrer">
              View Product Details
            </a>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import useWebSerial from './js/useWebSerial.js';
import mitt from "mitt";
import Footer from './components/Footer.vue';

const $refs = { editor: null, filename: null, input: null, progress: null };

const emitter = mitt();

const webSerial = useWebSerial($refs, emitter);


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const GHI_VID = 0x1B9F;
const DL_PID = 0xF300;
const MB_PID = 0xF301;

const msg_box_success = ref(false);
const msg_box_failed = ref(false);
const progressbar_standard = ref(false);

const progressbar_body_text = ref('')
const progressbar_title_text = ref('')
const msg_box_success_body_text = ref('')
const msg_box_failed_body_text = ref('')

const percent_tmp = ref(0);
const button_text = ref('Discover')

async function do_connect() {
  webSerial.connect_status.value = 0;
  webSerial.connection_mode.value = 0; // regular mode
  percent_tmp.value = 0;
  webSerial.progress_percent.value = 0;
  const ret = await webSerial.connect(); // this just send a message, await or no, not really care

  if (ret) {
    progressbar_body_text.value = "Connecting to devices..."
    //progressbar_standard.value = true;
    percent_tmp.value = 0;

    while (webSerial.connect_status.value == 0) {
      await sleep(100);

      percent_tmp.value = webSerial.progress_percent.value;
      button_text.value = "Connecting..." + percent_tmp.value + "%"

      // when percent_tmp.value is 65, get version() then 100
      // if 71 then failed
      if (percent_tmp.value == 71) { // make sure it is stop
        break;
      }
    }

    if (webSerial.connect_status.value > 0) {
      percent_tmp.value = 99;
      await sleep(100);
    }


    //progressbar_standard.value = false;
    percent_tmp.value = 0;
    await sleep(100); // make sure connect_msgbox_progress is off

    if (webSerial.connect_status.value < 0) {

      msg_box_failed_body_text.value = "Connection failed"
      msg_box_failed.value = true;

    }
  }

  return webSerial.connect_status.value > 0

}

const is_doing_discover = ref(false)
async function fn_discover() {
  is_doing_discover.value = true
  button_text.value = "Please wait..."

  try {

    webSerial.devicesChainList.value = []

    await sleep(250);

    let conn = 0

    if (webSerial.isConnected) {
      await webSerial.disconnect();
      await sleep(250);
    }

    conn = await do_connect()


    if (conn) {
      webSerial.add_device_chain_status.value = -1

      button_text.value = "Discovering device..." + percent_tmp.value + "%"
      await webSerial.do_discover()

      percent_tmp.value = 0
      while (webSerial.add_device_chain_status.value == -1) {
        button_text.value = "Discovering device..." + percent_tmp.value + "%"
        await sleep(250)

        percent_tmp.value++

        if (percent_tmp.value > 99)
          percent_tmp.value = 99

      }

      // if (webSerial.add_device_chain_status.value > 0) {
      //   for (let i = 0; i < webSerial.add_device_chain_status.value; i++) {
      //     console.log(`Device ${i}: ${webSerial.devicesChainList.value[i].name}`)
      //     console.log(`Device ${i}: ${webSerial.devicesChainList.value[i].address}`)
      //     console.log(`Device ${i}: ${webSerial.devicesChainList.value[i].firmwareVersion}`)
      //     console.log(`Device ${i}: ${webSerial.devicesChainList.value[i].image}`) // link
      //     console.log(`Device ${i}: ${webSerial.devicesChainList.value[i].detail}`) // link
      //   }
      // }
      // else {
      //   console.log("not detect any")
      // }

      await webSerial.disconnect();
      await sleep(250);

      button_text.value = "Finishing..."
      await sleep(500);

    }
  }

  finally {
    is_doing_discover.value = false
    button_text.value = "Discover"
  }
}


</script>

<style scoped>
.page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.devices-wrapper {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 🔥 Important change: remove width:100% */
.device-card {
  display: flex;
  align-items: center;
  gap: 60px;

  padding: 20px 40px;
  /* horizontal padding */

  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.06);

  margin-bottom: 20px;

  width: fit-content;
  /* 🔥 shrink to content */
  max-width: 900px;
}

/* IMAGE BOX */
.image-box {
  width: 220px;
  height: 170px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #f4f4f4;
  border-radius: 12px;
  overflow: hidden;
}

.device-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* RIGHT SIDE */
.device-info {
  text-align: left;
  font-size: 16px;
  line-height: 2;
  min-width: 320px;
}

.device-info a {
  color: #2563eb;
  text-decoration: none;
}

.device-info a:hover {
  text-decoration: underline;
}
</style>