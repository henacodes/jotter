<script>
	import filesStore from '../../store/filesStore';
	import returnFileIcon from '../returnFileIcon';
	import { X } from 'phosphor-svelte';
	import { closeFile, openFile } from '../fileStoreFuntions';
	const closeTab = (id) => {
		closeFile(id);
		const tabs = $filesStore.tabs;
		if (tabs.length) {
			openFile(tabs[0]);
		}
	};
</script>

<div class=" flex w-[80vw] overflow-auto">
	{#each $filesStore.tabs as tab}
		<button
			on:click={() => openFile(tab)}
			class={'btn rounded-none min-w-[15rem] flex items-center justify-between btn-square px-4 ' +
				($filesStore.openFile.id === tab.id ? 'border-b-2 border-b-primary' : ' ')}
		>
			<div class=" flex items-center">
				<img src={returnFileIcon(tab.extension)} class=" w-[20px]" alt="" />
				<p class=" px-3">{tab.name}</p>
			</div>
			<p on:click={() => closeTab(tab.id)}>
				<X size={20} class=" bg-slate-700  p-1 rounded-full hover:scale-110  hover:bg-black     " />
			</p>
		</button>
	{/each}
</div>
