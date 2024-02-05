<script>
	export let modalId;
</script>

<dialog id={modalId} class="modal">
	<div class="modal-box">
		<slot />
		<form method="dialog" class="modal-backdrop flex my-3 justify-end">
			<button class="btn mx-3 btn-outline btn-accent">Okay</button>
		</form>
	</div>
</dialog>
