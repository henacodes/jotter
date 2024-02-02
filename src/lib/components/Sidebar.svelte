<script>
	import { FilePlus, ArrowCounterClockwise, Trash } from 'phosphor-svelte';
	import filesStore from '../../store/filesStore';
	import Files from './Files.svelte';
	import { v4 as uuidv4 } from 'uuid';

	let fileName = '';

	const handleFileCreate = () => {
		console.log('clicked');
		if (!fileName) {
			return;
		}

		const parts = fileName.split('.');
		if (!parts.length) {
			return;
		}
		const extension = parts.pop();
		const newFile = {
			name: fileName,
			extension,
			content: '',
			id: uuidv4(),
			timeCreated: Date.now()
		};
		filesStore.update((curr) => {
			return {
				...curr,
				files: [...curr.files, newFile],
				tabs: [...curr.tabs, newFile],
				openFile: newFile
			};
		});
	};
</script>

<div class="  w-full flex-[0.2] h-[100%] border-r border-slate-700 p-6">
	<div class=" flex items-center justify-between">
		<button class="btn btn-square" onclick="create_file_modal.showModal()">
			<FilePlus size={20} />
		</button>
		<button class="btn btn-square">
			<ArrowCounterClockwise size={20} />
		</button>
		<button class="btn btn-square">
			<Trash size={20} />
		</button>
	</div>

	<Files />
</div>

<!-- Modals -->
<dialog id="create_file_modal" class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Enter the file name</h3>
		<input
			bind:value={fileName}
			type="text"
			placeholder="Type here"
			class="input input-bordered w-full max-w-xs input-sm focus:outline-none focus:input-accent my-3 py-6"
		/>
		<form method="dialog" class="modal-backdrop flex my-3 justify-end">
			<button class="btn mx-3 btn-outline btn-secondary">Cancel</button>
			<button on:click={handleFileCreate} class="btn mx-3 btn-outline btn-accent">Ok</button>
		</form>
	</div>
</dialog>
