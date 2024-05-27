<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import '../app.css';
	import Navbar from '../lib/components/Navbar.svelte';
	import Notification from '../lib/components/Notification.svelte';
	import uiStore from '../store/uiStore';
</script>

<div class=" h-[100vh] flex flex-col">
	<Navbar />
	<slot />
</div>

{#if $uiStore.notification.show}
	<Notification />
{/if}
