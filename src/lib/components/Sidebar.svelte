<script>
	import { FilePlus, ArrowCounterClockwise, Trash, FloppyDisk } from 'phosphor-svelte';
	import filesStore from '../../store/filesStore';
	import Files from './Files.svelte';

	// store functions
	import { createFile, deleteFile, openFile, addToTabs } from '../fileStoreFuntions';
	let fileName = '';

	const handleFileCreate = () => {
		if (!fileName) {
			return;
		}

		createFile(fileName);
		let file = $filesStore.files[$filesStore.files.length - 1];
		openFile(file);
		addToTabs(file);
		fileName = '';
	};
	const handleFileDelete = () => {
		const openFileId = $filesStore.openFile.id;
		if ($filesStore.openFile.id) {
			deleteFile(openFileId);
		}
	};
</script>

<div class="  w-full flex-[0.2] h-[100%] border-r border-slate-700 p-6">
	<div class=" flex items-center">
		<button class=" mx-3 btn btn-square" onclick="create_file_modal.showModal()">
			<FilePlus size={20} />
		</button>

		<button
			class=" mx-3 btn btn-square"
			onclick={$filesStore.openFile?.id ? 'delete_file_modal.showModal()' : ''}
		>
			<Trash size={20} />
		</button>
		<button class=" mx-3 btn btn-square" onclick="file_save">
			<FloppyDisk size={20} />
		</button>
	</div>
	{#if $filesStore.files.length}
		<Files />
	{/if}
</div>

<!-- Create file Modal -->
<dialog id="create_file_modal" class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Enter the file name</h3>
		<input
			bind:value={fileName}
			type="text"
			placeholder="Type here"
			class="input input-bordered w-full max-w-xs input-sm focus:outline-none focus:border-accent border-2 my-3 py-6"
		/>
		<form method="dialog" class="modal-backdrop flex my-3 justify-end">
			<button class="btn mx-3 btn-outline btn-secondary">Cancel</button>
			<button on:click={handleFileCreate} class="btn mx-3 btn-outline btn-accent">Ok</button>
		</form>
	</div>
</dialog>

<!-- Delete file modal -->

<dialog id="delete_file_modal" class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">
			Are you sure you wanna delete the file <span class=" text-warning"
				>{$filesStore.openFile?.name}</span
			>
		</h3>
		<form method="dialog" class="modal-backdrop flex my-3 justify-end">
			<button class="btn mx-3 btn-outline btn-secondary">No</button>
			<button on:click={handleFileDelete} class="btn mx-3 btn-outline btn-accent">Yes</button>
		</form>
	</div>
</dialog>
