class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;  // 缓存容量
        this.cache = new Map();     // 用哈希表存储键值对
        this.order = new DoublyLinkedList(); // 双向链表，维护访问顺序
    }

    get(key) {
        if (!this.cache.has(key)) return -1;
        // 如果存在，则移到链表头部表示最近使用
        this.order.moveToHead(key);
        return this.cache.get(key);
    }

    put(key, value) {
        if (this.cache.has(key)) {
            // 如果 key 存在，更新其值并移动到链表头部
            this.cache.set(key, value);
            this.order.moveToHead(key);
        } else {
            // 如果 key 不存在，检查是否需要淘汰元素
            if (this.cache.size >= this.capacity) {
                // 淘汰链表尾部的元素（最久未使用）
                const tail = this.order.removeTail();
                this.cache.delete(tail);
            }
            // 添加新元素
            this.cache.set(key, value);
            this.order.addHead(key);
        }
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = new ListNode();  // 哨兵节点
        this.tail = new ListNode();  // 哨兵节点
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
}

class ListNode {
    constructor(key = null) {
        this.key = key;
        this.next = null;
        this.prev = null;
    }
}
