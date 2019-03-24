const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.heap = new MaxHeap();
		this.maxSize = maxSize || 30;
	}

	push(data, priority) {
		if (this.heap.size() === this.maxSize) 
			throw new Error('PriorityQueue has the maximum number of elements');
		this.heap.push(data, priority);
	}

	shift() {
		if (this.heap.isEmpty()) 
		throw new Error('PriorityQueue is empty');
		return this.heap.pop();
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
