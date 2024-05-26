import { writable } from 'svelte/store';

export default writable({
	notification: {
		show: false,
		message: '',
		title: ''
	}
});
