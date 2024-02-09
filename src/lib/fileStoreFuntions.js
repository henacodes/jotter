import filesStore from '../store/filesStore';
import { v4 as uuidv4 } from 'uuid';

export const createFile = (fileName) => {
	const parts = fileName.split('.');
	if (!parts.length) {
		return;
	}
	const extension = parts.pop();
	const newFile = {
		name: fileName,
		extension,
		content: ['Write your code here'],
		id: uuidv4(),
		timeCreated: Date.now()
	};

	filesStore.update((curr) => {
		return {
			...curr,
			files: [...curr.files, newFile]
		};
	});
};

// add file to openFile property of the store and set the active line to be the last line
export const openFile = (file) => {
	filesStore.update((curr) => {
		return {
			...curr,
			openFile: file,
			activeLine: file.content.length - 1
		};
	});
};

export const addToTabs = (file) => {
	filesStore.update((curr) => {
		return {
			...curr,
			tabs: curr.tabs.filter((x) => x.id === file.id).length ? curr.tabs : [...curr.tabs, file]
		};
	});
};

// remove the file from the tabs and if its opened, remove from openFile
export const closeFile = (id) => {
	filesStore.update((curr) => {
		return {
			...curr,
			tabs: curr.tabs.filter((x) => x.id !== id),
			openFile: curr.openFile.id === id ? {} : curr.openFile,
			activeLine: curr.openFile.id === id ? 0 : curr.activeLine
		};
	});
};

// delete file from everywhere else

export const deleteFile = (id) => {
	filesStore.update((curr) => {
		return {
			...curr,
			files: curr.files.filter((x) => x.id !== id),
			tabs: curr.tabs.filter((x) => x.id !== id),
			openFile: curr.openFile.id === id ? {} : curr.openFile
		};
	});

	/// open another tab if it exists

	filesStore.update((curr) => {
		return {
			...curr,
			openFile: curr.tabs.length ? curr.tabs[0] : {}
		};
	});
};

export const persistOpenFileWithFile = (file) => {
	filesStore.update((curr) => {
		return {
			...curr,
			files: curr.files.map((f) => {
				if (f.id !== file.id) {
					return f;
				}
				return file;
			})
		};
	});
};

export const addNextNewLine = (index) => {
	let content;
	filesStore.subscribe((store) => {
		content = store.openFile.content;
	});
	if (content.length - 1 === index) {
		filesStore.update((curr) => {
			return {
				...curr,
				openFile: {
					...curr.openFile,
					content: [...curr.openFile.content, '']
				},
				activeLine: curr.activeLine + 1
			};
		});
	} else {
		let prevContent = content.slice(0, index + 1);
		let nextContent = content.slice(index + 1);
		filesStore.update((curr) => {
			return {
				...curr,
				openFile: {
					...curr.openFile,
					content: [...prevContent, '', ...nextContent]
				},
				activeLine: index + 1
			};
		});
	}
};

export const removeCurrentLine = (index) => {
	if (index > 0) {
		let content;
		filesStore.subscribe((curr) => {
			content = curr.openFile.content;
		});
		let prevContent = content.slice(0, index);
		let nextContent = content.slice(index + 1);

		filesStore.update((curr) => {
			return {
				...curr,
				openFile: {
					...curr.openFile,
					content: [...prevContent, ...nextContent]
				},
				activeLine: index - 1
			};
		});
	}
};

export const updateContent = (content, index) => {
	filesStore.update((curr) => {
		return {
			...curr,
			openFile: {
				...curr.openFile,
				content: curr.openFile.content.map((line, i) => {
					if (i === index) {
						return content;
					}
					return line;
				})
			}
		};
	});
	let updatedFile;
	filesStore.subscribe((curr) => {
		updatedFile = curr.openFile;
	});
	filesStore.update((curr) => {
		return {
			...curr,
			files: curr.files.map((f) => {
				if (f.id === updatedFile.id) {
					return updatedFile;
				}
				return f;
			}),
			tabs: curr.tabs.map((t) => {
				if (t.id === updatedFile.id) {
					return updatedFile;
				}
				return t;
			})
		};
	});
};
