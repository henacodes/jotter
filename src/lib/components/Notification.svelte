<script>
	import { onMount } from 'svelte';
	import uiStore from '../../store/uiStore';
	import { X } from 'phosphor-svelte';

	onMount(() => {
		setTimeout(() => {
			uiStore.update((curr) => {
				return { ...curr, notification: { show: false, message: '', title: '' } };
			});
		}, 3000);
	});
</script>

<div class="  fixed bg-base-300 text-slate-400 right-3 bottom-4 max-w-[50vw] p-3 rounded-md">
	<div class="flex items-center justify-center">
		<p class="font-bold text-2xl">{$uiStore.notification.title}</p>
	</div>
	<p>
		{$uiStore.notification.message}
	</p>
</div>
