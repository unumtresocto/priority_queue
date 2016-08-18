const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.currentSize = 0;
	}

	push(data, priority) {
		 var node = new Node(data, priority);
		 this.insertNode(node);
		 this.shiftNodeUp(node);
		 this.currentSize ++;
	}

	pop() {
		if (this.root === null)
			return;

		var detachedRoot = this.detachRoot();
		this.restoreRootFromLastInsertedNode(detachedRoot);
		this.shiftNodeDown(this.root);
		this.currentSize --;
		return detachedRoot.data;
	}

	detachRoot() {
		var detachedRoot = this.root;	
		if (this.root.left !== null)
			this.root.left.parent = null;
		if (this.root.right !== null)
			this.root.right.parent = null;
		this.root = null;
		if (this.parentNodes[0] === detachedRoot)
			this.parentNodes.shift();		
		return detachedRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		var lastNode = this.parentNodes[this.parentNodes.length - 1];
		if (this.size() === 1) {
			this.root = null;
			return;
		}
		var lastNodeParent = lastNode.parent;
		lastNode.remove();
		this.root = lastNode;
		if (lastNode === detached.left) {
			lastNode.left = null;
			lastNode.right = null;
			lastNode.parent = null;
		} else if (lastNode === detached.right) {
			lastNode.right = null;
			lastNode.parent = null;
			lastNode.left = detached.left;
			lastNode.left.parent = lastNode;
			this.parentNodes.unshift(lastNode);
			this.parentNodes.pop();
		} else {
			lastNode.left = detached.left;
			lastNode.left.parent = lastNode;
			lastNode.right = detached.right;
			lastNode.right.parent = lastNode;
			if (this.parentNodes.indexOf(lastNodeParent) === -1)
				this.parentNodes.unshift(lastNodeParent);
			this.parentNodes.pop();		
		}
	}

	size() {
		return this.currentSize;
	}

	isEmpty() {
		if (this.currentSize === 0)
			return true;
		else
			return false;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.currentSize = 0;
	}

	insertNode(node) {
		if (this.root === null) {
			this.root = node;
			this.parentNodes.push(node);
		} else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			if (this.parentNodes[0].right !== null) {
				this.parentNodes.shift();
			}
		}
	}

	shiftNodeUp(node) {
		if (node.parent === null) {
			this.root = node;
			return;
		}

		if (node.parent !== null && node.parent.priority < node.priority) {
			var indexOfNode = this.parentNodes.indexOf(node);
			var indexOfParent = this.parentNodes.indexOf(node.parent);

			if (indexOfNode !== -1) {
				this.parentNodes[indexOfNode] = node.parent;
			}
			if (indexOfParent !== -1) {
				this.parentNodes[indexOfParent] = node;				
			}
			node.swapWithParent();
			this.shiftNodeUp(node)
		}
	}

	shiftNodeDown(node) {
		if (node === null || (node.left === null && node.right === null))
			return;

		if (node.right === null || node.left.priority > node.right.priority) {
			if (node.left.priority > node.priority) {
				var indexOfNode = this.parentNodes.indexOf(node);
				var indexOfChild = this.parentNodes.indexOf(node.left);

				if (indexOfNode !== -1) {
					this.parentNodes[indexOfNode] = node.left;
				}
				if (indexOfChild !== -1) {
					this.parentNodes[indexOfChild] = node;
				}

				if (this.root === node) {
					this.root = node.left;
				}

				node.left.swapWithParent();
				this.shiftNodeDown(node);
			}
			
		} else if (node.left === null || node.left.priority < node.right.priority) {
			if (node.right.priority > node.priority) {
				var indexOfNode = this.parentNodes.indexOf(node);
				var indexOfChild = this.parentNodes.indexOf(node.right);

				if (indexOfNode !== - 1) {
					this.parentNodes[indexOfNode] = node.right;
				}
				if (indexOfChild !== -1) {
					this.parentNodes[indexOfChild] = node;
				}

				if (this.root === node) {
					this.root = node.right;
				}

				node.right.swapWithParent();
				this.shiftNodeDown(node);
			}
		}		
	}
}

module.exports = MaxHeap;
