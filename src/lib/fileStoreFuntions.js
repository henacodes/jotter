import filesStore from '../store/filesStore';

// add file to openFile property of the store and set the active line to be the last line
export const openFile = (file) => {
	filesStore.update((curr) => {
		return {
			...curr,
			openFile: file,
			activeLine: file.contents.length - 1
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
	let content = $filesStore.openFile.content;
	if (content.length - 1 === index) {
		filesStore.update((curr) => {
			return {
				...curr,
				openFile: {
					...curr.openFile,
					content: [...curr.openFile.content, '']
				}
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
		let content = $filesStore.openFile.content;
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
				content: content.map((line, i) => {
					if (i === index) {
						return content;
					}
					return line;
				})
			}
		};
	});
};
