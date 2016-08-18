class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left === null) {
			this.left = node;
			this.left.parent = this;
		}
		else if (this.right === null) {
			this.right = node;
			this.right.parent = this;
		}
	}

	removeChild(node) {
		if (this.right === node) {
			this.right.parent = null;
			this.right = null;
		}
		else if (this.left === node) {
			this.left.parent = null;
			this.left = null;
		}
		else
			throw new Error('Not a child!');
	}

	remove() {
		if (this.parent !== null) 
			this.parent.removeChild(this);
	}

	swapWithParent() {
		if (this.parent !== null) {
			var parentToSwap = this.parent;
			var childToSwap = this;
			var parentOfParent = this.parent.parent;
			var leftOfParent = this.parent.left;
			var rightOfParent = this.parent.right;
			var leftOfChild = this.left;
			var rightOfChild = this.right;

			if (leftOfChild !== null)
				leftOfChild.parent = parentToSwap;
			if (rightOfChild !== null)
				rightOfChild.parent = parentToSwap;
			parentToSwap.left = leftOfChild;
			parentToSwap.right = rightOfChild;

			childToSwap.parent = parentOfParent;
			if (parentOfParent !== null) {
				if (parentToSwap === parentOfParent.left)
					parentOfParent.left = childToSwap;
				else
					parentOfParent.right = childToSwap
			}

			if (rightOfParent === childToSwap) {
				if (leftOfParent !== null)
					leftOfParent.parent = childToSwap;
				childToSwap.left = leftOfParent;
				childToSwap.right = parentToSwap;
				parentToSwap.parent = childToSwap;

			} else {
				if (rightOfParent !== null)
					rightOfParent.parent = childToSwap;
				childToSwap.right = rightOfParent;
				childToSwap.left = parentToSwap;
				parentToSwap.parent = childToSwap;
			}
		}
	}
}

module.exports = Node;
