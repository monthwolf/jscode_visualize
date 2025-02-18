const { Array2DTracer, Array1DTracer, Layout, LogTracer, Tracer, VerticalLayout } = require('algorithm-visualizer');

const array2dTracer = new Array2DTracer('Cache');
const logTracer = new LogTracer('Console');
const listTracer = new Array1DTracer('Linked List');

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        this.order = new DoublyLinkedList();
    }

    get(key) {
        if (!this.cache.has(key)) {
            logTracer.println(`No such key: ${key}`);
            Tracer.delay();
            return -1;
        };
        this.order.moveToHead(key);
        this.visualizeCache(`Accessed key: ${key}`);
        this.updateLinkedListVisualization(`Linked List after accessing key: ${key}`);
        return this.cache.get(key);
    }

    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.set(key, value);
            this.order.moveToHead(key);
            this.visualizeCache(`Updated key: ${key}`);
        } else {
            if (this.cache.size >= this.capacity) {
                const tail = this.order.removeTail();
                this.cache.delete(tail);
                this.visualizeCache(`Removed key: ${tail}`);
            }
            this.cache.set(key, value);
            this.order.addHead(key);
            this.visualizeCache(`Added key: ${key}`);
        }
        this.updateLinkedListVisualization(`Linked List after put key: ${key}`);
    }

    visualizeCache(message) {
        // visualize cache state and log
        logTracer.println(message);

        // Convert cache keys and values into a 2D array for visualization
        const cacheArray = Array.from(this.cache.entries()).map(entry => [entry[0], entry[1]]);
        array2dTracer.set(cacheArray);  // Set 2D array for cache visualization
    }

    updateLinkedListVisualization(message) {
        // visualize linked list state and log
        logTracer.println(message);

        // Convert linked list nodes to a 2D array representation
        const listArray = this.order.toArray().map(node => node.key);
        listTracer.set(listArray);  // Set 2D array for linked list visualization
        Tracer.delay();
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = new ListNode();
        this.tail = new ListNode();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    addHead(key) {
        const newNode = new ListNode(key);
        newNode.next = this.head.next;
        newNode.prev = this.head;
        this.head.next.prev = newNode;
        this.head.next = newNode;
    }

    moveToHead(key) {
        const node = this._findNode(key);
        if (node) {
            this._removeNode(node);
            this.addHead(key);
        }
    }

    removeTail() {
        const node = this.tail.prev;
        this._removeNode(node);
        return node.key;
    }

    _findNode(key) {
        let node = this.head.next;
        while (node !== this.tail) {
            if (node.key === key) return node;
            node = node.next;
        }
        return null;
    }

    _removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    // Helper function to convert linked list into an array for visualization
    toArray() {
        const result = [];
        let current = this.head.next;
        while (current !== this.tail) {
            result.push(current);
            current = current.next;
        }
        return result;
    }
}

class ListNode {
    constructor(key = null) {
        this.key = key;
        this.next = null;
        this.prev = null;
    }
}

(function main() {
    Layout.setRoot(new VerticalLayout([array2dTracer, logTracer, listTracer]));

    const lru = new LRUCache(3);
    array2dTracer.set([]);
    listTracer.set([]);
    Tracer.delay();

    lru.put(1, 1);
    lru.put(2, 2);
    lru.put(3, 3);
    lru.get(2);  // Should access key 2
    lru.put(4, 4); // Should evict key 2
    lru.get(2);  // Should return -1 (not found)
    lru.get(1);
})();
