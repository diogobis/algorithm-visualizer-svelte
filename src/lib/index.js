// place files you want to import through the `$lib` alias in this folder.

export function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
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
