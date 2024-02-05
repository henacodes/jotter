<script>
	import { onMount } from 'svelte';
	import filesStore from '../../store/filesStore';
	import { browser } from '$app/environment';
	import Tabs from './Tabs.svelte';
	const content = ['Hell world', 'second line', 'sdfsdfs', 'sdfsdf'];

	const handleInput = (e, index) => {};

	onMount(() => {
		if (window) {
			document.addEventListener('keydown', (e) => {
				if (e.key === 'Enter') {
				}
			});
		}
	});
</script>

<div class="w-[90vw]">
	<Tabs />

	{#if $filesStore.openFile.id}
		{#each $filesStore.openFile.content as line, i}
			<div class=" flex w-full items-center justify-center">
				<p class=" flex-[0.03] text-center">{i + 1}</p>
				<input
					id={`input_${i}`}
					on:input={(e) => handleInput(e, i)}
					type="text"
					class=" input focus:outline-none focus:border-none flex-[0.97] h-[1rem]"
					value={line}
				/>
			</div>
		{/each}
	{/if}
</div>
