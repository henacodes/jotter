<script>
	import { onMount } from 'svelte';
	import filesStore from '../../store/filesStore';
	import { browser } from '$app/environment';
	import Tabs from './Tabs.svelte';
	import { addNextNewLine, updateContent, removeCurrentLine } from '../fileStoreFuntions';

	const handleInput = (e, index) => {
		filesStore.update((curr) => {
			return {
				...curr,
				activeLine: parseInt(parseInt(index))
			};
		});

		updateContent(e.target.value, index);
	};

	const handleEnterClick = (e) => {
		const openFile = $filesStore.openFile;
		if (e.key === 'Enter') {
			if (openFile.id) {
				addNextNewLine($filesStore.activeLine);
				setTimeout(() => {
					document.getElementById(`input_${$filesStore.activeLine}`).focus();
				}, 20);
			}
		}
	};

	const handleBackspace = (e, index) => {
		const { value } = e.target;
		if (e.key === 'Backspace') {
			if (value.length === 0) {
				removeCurrentLine(index);
				setTimeout(() => {
					document.getElementById(`input_${index - 1}`).focus();
				}, 20);
			}
		}
	};
	onMount(() => {
		if (window) {
			document.addEventListener('keydown', handleEnterClick);
		}

		return () => {
			document.removeEventListener('keydown', handleEnterClick);
		};
	});
</script>

<div class="w-[90vw]">
	<Tabs />

	{#if $filesStore.openFile.id}
		{#each $filesStore.openFile.content as line, i}
			<div class=" flex w-full items-center justify-center">
				<p class=" flex-[0.03] text-center">{i + 1}</p>
				<input
					on:keydown={(e) => handleBackspace(e, i)}
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
