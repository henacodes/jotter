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
		// this function is gonna called everytime we cretae new file, open file from sidebar or change tabs
		// in short whenever we update the openFile in files store

		if (!editor) {
			// initialize editor for the fist time
			// probably when the first file is created
			editor = monaco.editor.create(editorContainer, {
				theme: 'vs-dark'
			});
		}

		editorContainer.style.display = 'block';

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
		// set the editor display none if no open files exist
		editorContainer.style.display = 'none';
	}

	onMount(async () => {
		monaco = (await import('../lib/monaco')).default;
	});

	onDestroy(() => {
		// dispose the editor and the model if the component gets destoyed
		monaco?.editor.getModels().forEach((model) => model.dispose());
		editor?.dispose();
	});
</script>

<div class=" w-[100vw] flex flex-[0.96]">
	<Sidebar {newFileModel} {openEditorForCurrentFile} />
	{#if $filesStore.openFile}
		<div class="w-[90vw] h-full flex flex-col">
			<Tabs {openEditorForCurrentFile} {destroyEditor} />
			<div bind:this={editorContainer} class="w-[82.6vw] h-[93vh]"></div>
		</div>
	{/if}
</div>
