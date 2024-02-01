<script>
	import { FilePlus, ArrowCounterClockwise, Trash } from 'phosphor-svelte';
</script>

<div class="  w-full flex-[0.2] h-[100%] border-r border-slate-700">
	<div class=" flex items-center justify-evenly p-3">
		<button class="btn btn-square">
			<FilePlus size={20} />
		</button>
		<button class="btn btn-square">
			<ArrowCounterClockwise size={20} />
		</button>
		<button class="btn btn-square">
			<Trash size={20} />
		</button>
	</div>
</div>
