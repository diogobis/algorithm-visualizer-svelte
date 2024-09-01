// place files you want to import through the `$lib` alias in this folder.

export function sleep(ms) {
	if (ms === 0) {
		return new Promise((resolve, reject) => resolve());
	}

	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function random1DArray(len, unique = false) {
	if (unique) {
		let result = [];
		while (result.length < len) {
			var r = Math.floor(Math.random() * len - 1) + 1;

			if (result.indexOf(r) === -1) result.push(r);
		}

		return result;
	} else {
		return new Array(len)
			.fill(0)
			.map((_) => Math.floor(Math.random() * len) + 1);
	}
}

export class InfoBuilder {
	constructor(elements = []) {
		this.elements = elements;
	}

	addText(content) {
		this.elements.push({
			type: "text",
			content,
		});
	}

	addUnorderedList(content) {
		this.elements.push({
			type: "ulist",
			content,
		});
	}

	addOrderedList(content) {
		this.elements.push({
			type: "olist",
			content,
		});
	}

	addImage(content) {
		this.elements.push({
			type: "image",
			content,
		});
	}

	addBlock(content) {
		this.elements.push({
			type: "block",
			content,
		});
	}
}
