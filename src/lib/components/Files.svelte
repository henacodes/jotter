<script>
	import { onMount } from 'svelte';
	import filesStore from '../../store/filesStore';

	onMount(() => {
		console.log($filesStore);
	});
</script>

<ul class="menu bg-base-200 w-56 rounded-box mt-4">
	{#if $filesStore.files.length}
		{#each $filesStore.files as file}
			<li>
				<a>
					<img src="/favicon.png" alt="" class=" w-[30px]" />
					{file.name}
				</a>
			</li>
		{/each}
	{/if}
</ul>
