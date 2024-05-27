<script>
	import Sidebar from '../lib/components/Sidebar.svelte';
	import Tabs from '../lib/components/Tabs.svelte';
	import TextArea from '../lib/components/TextArea.svelte';
	import { onDestroy, onMount } from 'svelte';
	import filesStore from '../store/filesStore';
	import { getMimeType } from '../lib/helpers';
	import { persistOpenFileWithFile } from '../lib/fileStoreFuntions';
	let editorContainer = null;
	let editor;
	let monaco;

	function newFileModel(file) {
		// check if a monaco model for this file extension exists
		let monacoModelExists = $filesStore.monacoModels.filter(
			(x) => x.extension === file.extension
		)[0];
		if (!monacoModelExists) {
			console.log('monaco model doesnt exits');
			let newMonacoModel = monaco?.editor.createModel('', getMimeType(file.extension));
			filesStore.update((curr) => {
				return {
					...curr,
					monacoModels: [...curr.monacoModels, { model: newMonacoModel, extension: file.extension }]
				};
			});
		}

		openEditorForCurrentFile();
	}

	function openEditorForCurrentFile() {
		if ($filesStore.tabs.length < 2) {
			console.log('tabs dont exist');
			editor = monaco.editor.create(editorContainer, {
				theme: 'vs-dark'
			});
		}

		let model = $filesStore.monacoModels.filter(
			(x) => x.extension === $filesStore.openFile.extension
		)[0].model;

		model.setValue($filesStore.openFile.content.join('\n'));

		editor.setModel(model);

		editor.onDidChangeModelContent(function (e) {
			console.log('changed');
			let changedFileContent = editor.getModel().getValue().split('\n');

			filesStore.update((curr) => {
				return {
					...curr,
					openFile: {
						...curr.openFile,
						content: changedFileContent
					}
				};
			});
			persistOpenFileWithFile($filesStore.openFile);
			console.log($filesStore.openFile.content);
		});
	}

	function destroyEditor() {
		monaco?.editor.getModels().forEach((model) => model.dispose());
		editor?.dispose();
	}

	onMount(async () => {
		// Import our 'monaco.ts' file here
		// (onMount() will only be executed in the browser, which is what we want)
		monaco = (await import('../lib/monaco')).default;

		// Your monaco instance is ready, let's display some code!
		/*const editor = monaco.editor.create(editorContainer, {
			theme: 'vs-dark'
		});
		const model = monaco.editor.createModel(
			"console.log('Hello from Monaco! (the editor, not the city...)') \n another line /n more line ",
			'javascript'
		);

		model.onDidChangeContent((stuff, otherstuff) => {
			console.log(stuff);
			console.log(otherstuff);
			console.log('chaginnnn');
		});

		const anotherModel = monaco.editor.createModel("echo 'hello world' ", 'php');

		editor.setModel(model);
		//editor.setModel(anotherModel);
		*/
	});

	/*onDestroy(() => {
		monaco?.editor.getModels().forEach((model) => model.dispose());
		editor?.dispose();
	});*/
</script>

<div class=" w-[100vw] flex flex-[0.96]">
	<Sidebar {newFileModel} />
	{#if $filesStore.openFile}
		<div class="w-[90vw] h-[93vh] flex flex-col">
			<Tabs {openEditorForCurrentFile} />
			<div bind:this={editorContainer} class="w-[82.6vw] h-[86.2vh]"></div>
		</div>
	{/if}
</div>
