<script>
	import Modal from './Modal.svelte';
</script>

<div class=" flex items-center w-[100vw] flex-[0.04]">
	<div class="dropdown">
		<div tabindex="0" role="button" class="btn rounded-none">File</div>
		<ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
			<li><a>Item 1</a></li>
			<li><a>Item 2</a></li>
		</ul>
	</div>
	<div class="dropdown">
		<div tabindex="0" role="button" class="btn rounded-none">Edit</div>
		<ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
			<li><a>Item 1</a></li>
			<li><a>Item 2</a></li>
		</ul>
	</div>
	<div class="dropdown">
		<div tabindex="0" role="button" class="btn rounded-none">View</div>
		<ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
			<li><a>Item 1</a></li>
			<li><a>Item 2</a></li>
		</ul>
	</div>
	<div class="dropdown">
		<div tabindex="0" role="button" class="btn rounded-none">About</div>
		<ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
			<li><a>Jotter</a></li>
			<li onclick="about_modal.showModal()"><a>Developer</a></li>
		</ul>
	</div>
</div>

<!-- About Modal -->

<Modal modalId="about_modal"><p>I am Henok</p></Modal>
