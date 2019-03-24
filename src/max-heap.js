const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.__size = 0;
		
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.__size += 1;
	}

	pop() {
		if (!this.parentNodes.length) return
		let detached = this.detachRoot();
		this.restoreRootFromLastInsertedNode(detached);
		this.shiftNodeDown(this.root);
		this.__size -= 1;
		return detached.data;
	}

	detachRoot() {
		let root = this.root;
		this.root = null;
		if (root == this.parentNodes[0]) this.parentNodes.shift();
		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (!detached || !this.parentNodes.length) return;
		let rootLeftChild = detached.left;
		let rootRightChild = detached.right;
		let lastNode = this.parentNodes.pop();
		let lastNodeParent = lastNode.parent;
		if (lastNode) lastNode.remove();
		if (rootLeftChild) rootLeftChild.remove();
		if (rootRightChild) rootRightChild.remove();
		if (rootLeftChild != lastNode) lastNode.appendChild(rootLeftChild);
		if (rootRightChild != lastNode) lastNode.appendChild(rootRightChild);
		if (!lastNode.left || !lastNode.right) this.parentNodes.unshift(lastNode);
		else if (lastNodeParent != detached && this.parentNodes[0] != lastNodeParent)
			this.parentNodes.unshift(lastNodeParent);
		this.root = lastNode;
	}

	size() {
		return this.__size;
	}

	isEmpty() {
		return this.__size ? false : true;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.__size = 0;
	}

	insertNode(node) {
		if (!this.parentNodes.length)
			this.root = node;
		else 
			this.parentNodes[0].appendChild(node);
		this.parentNodes.push(node);
		if (this.parentNodes[0].left && this.parentNodes[0].right)
			this.parentNodes.shift();
	}

	shiftNodeUp(node) {
		if (node.parent && node.priority > node.parent.priority) {
			let currentNodeIndex = this.parentNodes.indexOf(node);
			let parentNodeIndex = this.parentNodes.indexOf(node.parent);
			if (currentNodeIndex !== -1) this.parentNodes[currentNodeIndex] = node.parent;
			if (parentNodeIndex !== -1) this.parentNodes[parentNodeIndex] = node;
			node.swapWithParent();
			this.shiftNodeUp(node);
		}
		if (!node.parent) this.root = node;
	}

	shiftNodeDown(node) {
		if (!node) return;
		if (!node.left && !node.right) return;
		let swapNode = node;
		if (node.left && node.left.priority > swapNode.priority) swapNode = node.left;
		if (node.right && node.right.priority > swapNode.priority) swapNode = node.right;
		if (swapNode == node) return;
		this.shiftNodeUp(swapNode);
		this.shiftNodeDown(node);
	}
}

module.exports = MaxHeap;
