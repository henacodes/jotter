import { writable } from 'svelte/store';

export default writable({
	files: [],
	openFile: {},
	tabs: [],
	activeLine: -1
});
