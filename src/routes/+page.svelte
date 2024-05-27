<script>
	import Sidebar from '../lib/components/Sidebar.svelte';
	import TextArea from '../lib/components/TextArea.svelte';
	import { onDestroy, onMount } from 'svelte';
	let editorContainer = null;
	let editor;
	let monaco;

	onMount(async () => {
		// Import our 'monaco.ts' file here
		// (onMount() will only be executed in the browser, which is what we want)
		monaco = (await import('../lib/monaco')).default;

		// Your monaco instance is ready, let's display some code!
		const editor = monaco.editor.create(editorContainer, {
			theme: 'vs-dark'
		});
		const model = monaco.editor.createModel(
			"console.log('Hello from Monaco! (the editor, not the city...)')",
			'javascript'
		);

		editor.setModel(model);
	});

	onDestroy(() => {
		monaco?.editor.getModels().forEach((model) => model.dispose());
		editor?.dispose();
	});
</script>

<div class=" w-[100vw] flex flex-[0.96]">
	<Sidebar />
	<div bind:this={editorContainer} class="w-[90vw] h-[92vh]" />
</div>
