<script>
	import { onMount } from 'svelte';
	import filesStore from '../../store/filesStore';
	import { browser } from '$app/environment';
	import Tabs from './Tabs.svelte';
	const content = ['Hell world', 'second line', 'sdfsdfs', 'sdfsdf'];

	const handleInput = (e) => {};

	onMount(() => {
		if (window) {
			document.addEventListener('keydown', (e) => {
				if (e.key === 'Enter') {
					const { activeLine } = $filesStore;
					if (activeLine >= 0) {
						console.log('active');
						console.log($filesStore.openFile);
						const alreadyOpenFile = $filesStore.openFile;
						const openFile =
							alreadyOpenFile.content.length - 1 === activeLine
								? { ...alreadyOpenFile, content: [...alreadyOpenFile.content, ''] }
								: {
										...alreadyOpenFile,
										content: alreadyOpenFile.content
											.slice(0, activeLine)
											.concat('', alreadyOpenFile.content.slice(activeLine))
									};
						console.log('newllly', openFile);
						filesStore.update((curr) => {
							return {
								...curr,
								openFile: openFile,
								activeLine: activeLine === 0 ? activeLine + 2 : activeLine + 1
							};
						});
						console.log($filesStore);
						setTimeout(() => {
							document.getElementById(`input_${activeLine}`).focus();
						}, 20);
						//
					}
				}
			});
		}
	});

	/* $: {
		if ($filesStore.activeLine >= 0) {
			if (browser) {
				document.getElementById(`input_${$filesStore.activeLine}`).focus();
			}
		}
	} */
</script>

<div class="w-[90vw]">
	<Tabs />

	{#if $filesStore.openFile.id}
		{#each $filesStore.openFile.content as line, i}
			<div class=" flex w-full items-center justify-center">
				<p class=" flex-[0.03] text-center">{i + 1}</p>
				<input
					id={`input_${i}`}
					on:input={handleInput}
					type="text"
					class=" input focus:outline-none focus:border-none flex-[0.97] h-[1rem]"
					value={line}
				/>
			</div>
		{/each}
	{/if}
</div>
