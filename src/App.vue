<template>
  <div class="page">
    <!-- Header -->
    <h1>DUELink Loader</h1>

    <img
      src="/img/duelinklogo.webp"
      alt="DUELink Logo"
    />

    <p >
      These pages will help you with updating your DUELink modules.
      Select the option that best suits your needs.
    </p>

    <!-- Two main options -->
    <div class="card-container">
      <div class="card">
        <img
          src="/img/languages.webp"
          alt="Languages"
          class="card-image"
        />
        <p>
          This is what Python, JavaScript and other tethered languages use.
          You will also use this with Standalone Scripts.
        </p>

        <a href="./update">
          <button class="outline-button">
            DUELink Update Steps
          </button>
        </a>
      </div>

      <div class="card">
        <img
          src="/img/microblocks.webp"
          alt="MicroBlocks"
          class="card-image"
        />
        <p>
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
    <Footer />
  </div>
</template>

<script setup>
import Footer from './components/Footer.vue';
</script>

<style scoped>

</style>
