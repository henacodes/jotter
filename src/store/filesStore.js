import { writable } from 'svelte/store';

export default writable({
	files: [],
	openFile: null,
	tabs: []
});
