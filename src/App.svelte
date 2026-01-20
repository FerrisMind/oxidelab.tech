<script lang="ts">
	import './app.css';
	import { i18n } from './lib/i18n.svelte';
	import Navbar from './lib/Navbar.svelte';
	import Hero from './lib/Hero.svelte';
	import Features from './lib/Features.svelte';
	import Models from './lib/Models.svelte';
	import Privacy from './lib/Privacy.svelte';
	import Download from './lib/Download.svelte';
	import Footer from './lib/Footer.svelte';

	$effect(() => {
		document.title = i18n.t.hero.windowTitle;
	});
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
