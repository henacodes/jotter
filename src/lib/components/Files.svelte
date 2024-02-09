<script>
	import { onMount } from 'svelte';
	import filesStore from '../../store/filesStore';
	import { returnFileIcon } from '../helpers';
	import { openFile, addToTabs } from '../fileStoreFuntions';
	const handleFileOpen = (file) => {
		//console.log(file);
		openFile(file);
		addToTabs(file);
	};
</script>

<ul class="menu bg-base-200 rounded-none mt-4">
	{#each $filesStore.files as file}
		<li
			on:click={() => handleFileOpen(file)}
			class={'my-2 ' + ($filesStore.openFile.id === file.id ? ' border-l  border-l-primary' : ' ')}
		>
			<a class=" ">
				<img src={returnFileIcon(file.extension)} alt="" class=" w-[20px]" />
				{file.name}
			</a>
		</li>
	{/each}
</ul>
