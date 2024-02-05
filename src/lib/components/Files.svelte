<script>
	import { onMount } from 'svelte';
	import filesStore from '../../store/filesStore';
	import returnFileIcon from '../returnFileIcon';
	onMount(() => {
		console.log($filesStore);
	});
	const openFile = (file) => {
		const fileInStore = $filesStore.files.filter((x) => x.id === file.id)[0];
		filesStore.update((curr) => {
			return {
				...curr,
				tabs: curr.tabs.filter((x) => x.id === file.id).length ? curr.tabs : [...curr.tabs, file],
				openFile: fileInStore,
				activeLine: fileInStore.content.length - 1
			};
		});
	};
</script>

<ul class="menu bg-base-200 rounded-none mt-4">
	{#each $filesStore.files as file}
		<li
			on:click={() => openFile(file)}
			class={'my-2 ' + ($filesStore.openFile.id === file.id ? ' border-l  border-l-primary' : ' ')}
		>
			<a class=" ">
				<img src={returnFileIcon(file.extension)} alt="" class=" w-[20px]" />
				{file.name}
			</a>
		</li>
	{/each}
</ul>
