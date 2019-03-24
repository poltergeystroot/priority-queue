class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!node) return;
		if (!this.left) {
			this.left = node;
			this.left.parent = this;
		}
		else if (!this.right) {
			this.right = node;
			this.right.parent = this;
		}
	}

	removeChild(node) {
        if (this.left == node) {
            this.left = null;
            node.parent = null;
            return;
        }
        if (this.right == node) {
            this.right = null;
            node.parent = null;
            return;
        }
		throw new Error('Object does not exist')
    }

	remove() {
		if (this.parent) 
			this.parent.removeChild(this)
	}

	swapWithParent() {
		if (!this.parent) return;
		let thisChildOfLeft = this.left;
		let thisChildOfRight = this.right;
		let parent = this.parent;
		let parentChildOfLeft = parent.left;
		let parentChildOfRight = parent.right;
		let grandparent = parent.parent;
		if (thisChildOfLeft) thisChildOfLeft.remove();
		if (thisChildOfRight) thisChildOfRight.remove();
		if (parentChildOfLeft) parentChildOfLeft.remove();
		if (parentChildOfRight) parentChildOfRight.remove();
		if (grandparent) {
			parent.remove();
			grandparent.appendChild(this);
		}
		if (this == parentChildOfLeft) {
			this.appendChild(parent);
			this.appendChild(parentChildOfRight);
		}
		else {
			this.appendChild(parentChildOfLeft);
			this.appendChild(parent);
		}
		parent.appendChild(thisChildOfLeft);
		parent.appendChild(thisChildOfRight);
	}
}

module.exports = Node;

