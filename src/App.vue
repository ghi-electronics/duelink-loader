<template>
  <div class="page">
    <!-- Header -->
    <h1>DUELink Loader</h1>

    <img
      src="/img/duelinklogo.webp"
      alt="DUELink Logo"
      class="main-logo"
    />

    <p class="subtitle">
      These pages will help you with updating your DUELink modules.
      Select the option that best suits your needs.
    </p>

    <!-- Three main options -->
    <div class="card-container">

      <!-- DUELink Update -->
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

      <!-- MicroBlocks -->
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

      <!-- Discover (NEW) -->
      <div class="card">
        <div class="discover-icon">🔎</div>

        <p>
          Scan and identify all connected DUELink devices in a chain.
          View device details and export results.
        </p>

        <a href="./discover">
          <button class="outline-button">
            Discover Devices
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

/* Layout container */
.card-container {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
  flex-wrap: wrap;
}

/* Individual card */
.card {
  width: 350px;
  padding: 30px;
  border: 1px solid #d0d0d0;
  background: #f9f9f9;
  border-radius: 8px;
  text-align: center;
  transition: all 0.2s ease;
}

/* Subtle hover effect (professional feel) */
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}

/* Images */
.card-image {
  max-width: 100%;
  margin-bottom: 20px;
}

/* Discover icon style */
.discover-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

/* Logo */
.main-logo {
  max-width: 500px;
  margin: 20px 0;
}

/* Subtitle */
.subtitle {
  max-width: 700px;
  margin: 0 auto;
  font-size: 1rem;
  color: #555;
}

</style>