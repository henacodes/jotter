<script>
	import '../app.css';
	import Navbar from '../lib/components/Navbar.svelte';
</script>

<div class=" h-[100vh] flex flex-col">
	<Navbar />
	<slot />
</div>
