class File {
	constructor(fileName, id) {
		const parts = fileName.split('.');
		this.fileName = fileName;
		this.id = id;
		this.content = [];
		this.activeLine = 0;
		this.timeCreated = Date.now();
	}
}
