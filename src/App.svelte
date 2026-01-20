<script lang="ts">
  import Navbar from './lib/Navbar.svelte';
  import Hero from './lib/Hero.svelte';
  import Features from './lib/Features.svelte';
  import Models from './lib/Models.svelte';
  import Privacy from './lib/Privacy.svelte';
  import Download from './lib/Download.svelte';
  import Footer from './lib/Footer.svelte';
</script>

<Navbar />

<main>
  <Hero />
  <Features />
  <Models />
  <Privacy />
  <Download />
</main>

<Footer />

<style>
  main {
    min-height: 100vh;
  }
</style>
