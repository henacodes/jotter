<script>
	import { onMount } from 'svelte';
	import filesStore from '../../store/filesStore';
	import Tabs from './Tabs.svelte';
	let textInput = '';

	let textarea;
	let lineNumbers;

	function updateLineNumbers() {
		const lines = textarea.value.split('\n');
		const lineCount = lines.length;

		let lineNumbersContent = '';
		for (let i = 1; i <= lineCount; i++) {
			lineNumbersContent += i + '<br>';
		}

		lineNumbers.innerHTML = lineNumbersContent;
	}

	onMount(() => {
		if (window) {
			textarea.addEventListener('input', updateLineNumbers);
			textarea.addEventListener('scroll', updateLineNumbers);
		}
	});
</script>

<div class=" flex-[0.8]">
	<Tabs />

	<div class="flex">
		<div class="w-12 bg-base-300 text-center text-gray-500">
			<div class="h-full flex flex-col justify-start">
				<span class="flex-grow" bind:this={lineNumbers}></span>
			</div>
		</div>
		<textarea
			bind:this={textarea}
			id="myTextarea"
			class="flex-grow px-4 py-2 resize-none bg-base-300 focus:outline-none"
		></textarea>
	</div>
</div>
