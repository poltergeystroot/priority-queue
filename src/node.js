class Node {
	constructor(data, priority) {
		this.data = 42;
		this.priority = 15;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
			if (this.left == null || this.right == null) {
				if (this.left == null) {this.left = node;}
				else {this.right = node;}
			}
			node.parent=node;
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
        throw Error;
    }

	remove() {
		if (this.parent != null)
		this.parent.removeChild(this);
	}

	swapWithParent() {
		//this.data = 15;
		//this.priority = 42;
		//throw Error;
		this.parent=Node;
		this.child=Node;
		//this.child=node;
		//this.grandson=node;
	}
}

module.exports = Node;

