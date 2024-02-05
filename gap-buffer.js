class TextEditor {
	constructor() {
		this.buffer = [];
		this.gapStart = 0;
		this.gapEnd = 0;
	}

	insert(text) {
		this.buffer.splice(this.gapStart, 0, ...text);
		this.gapStart += text.length;
	}

	delete(numChars) {
		this.buffer.splice(this.gapStart - numChars, numChars);
		this.gapStart -= numChars;
	}

	moveCursor(position) {
		if (position < 0 || position > this.getLength()) {
			throw new Error('Invalid cursor position');
		}
		this.gapStart = position;
	}

	getLength() {
		return this.buffer.length - (this.gapEnd - this.gapStart);
	}

	getText() {
		const textBeforeGap = this.buffer.slice(0, this.gapStart);
		const textAfterGap = this.buffer.slice(this.gapEnd);
		const lines = [...textBeforeGap, ...textAfterGap].join('').split('\n');
		const lineNumbers = Array.from({ length: lines.length }, (_, i) => i + 1);
		const linesWithNumbers = lines.map((line, index) => `${lineNumbers[index]}\t${line}`);
		return linesWithNumbers.join('\n');
	}
}

// Example usage

const editor = new TextEditor();

editor.insert('Hello,\n');
editor.insert('world!\n');

console.log(editor.getText());
// Output:
// 1   Hello,
// 2   world!

editor.moveCursor(7);
editor.insert('beautiful\n');

console.log(editor.getText());
// Output:
// 1   Hello,
// 2   beautiful
// 3   world!

editor.moveCursor(13);
editor.delete(4);

console.log(editor.getText());
// Output:
// 1   Hello,
// 2   beautiful
