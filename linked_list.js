function LinkedListException(message) {
   this.message = message;
   this.name = 'LinkedListException';
}

function NodeException(message) {
   this.message = message;
   this.name = 'NodeException';
}

class LinkedList {
  constructor(value) {
    if(value) {
      this.setHead(value);
    } else {
      this.head = null;
      this.tail = null;
      this.length = 0;
    };
  }

  setHead(value) {
    if(this.head) {
      throw new NodeException("Head already set");
    } else {
      this.head = new LLNode(value, null, null);
      this.tail = this.head;
      this.length = 1;
    };
  }

  replaceHead(value) {
    if(this.head) {
      let next = this.head.next;
      this.head = new LLNode(value, next, null);
      if(next) next.previous = this.head;
      else this.tail = this.head;
    } else {
      throw new NodeException("No head set");
    };
  }

  replaceTail(value) {
    if(this.tail && this.tail === this.head) {
      this.repalceHead(value);
    } else if(this.tail) {
      let previous = this.tail.previous;
      this.tail = new LLNode(value, null, previous);
      previous.next = this.tail;
    } else {
      throw new NodeException("No tail set");
    };
  }

  insertAfter(value, target) {
    if(!this.head) return undefined;
    let insertCallback = this._insertAfter.bind(this);
    return this._insertHelper(value, target, insertCallback);
  }

  insertBefore(value, target) {
    if(!this.head) return undefined;
    let insertCallback = this._insertBefore.bind(this);
    return this._insertHelper(value, target, insertCallback);
  }

  insertAtIdx(value, targetIdx) {
    if(!this.head) return undefined;
    let insertCallback = this._insertBefore.bind(this);
    return this._insertHelperIdx(value, targetIdx, insertCallback);
  }

  insertAfterHead(value) {
    if(!this.head) return undefined;
    let insertCallback = this._insertAfter.bind(this);
    return this._insertHelper(value, this.head.value, insertCallback);
  }

  insertBeforeHead(value) {
    if(!this.head) return undefined;
    let insertCallback = this._insertBefore.bind(this);
    return this._insertHelper(value, this.head.value, insertCallback);
  }

  insertAfterTail(value) {
    if(!this.head) return undefined;
    let insertCallback = this._insertAfter.bind(this);
    return this._insertHelperIdx(value, this.length - 1, insertCallback);
  }

  insertBeforeTail(value) {
    if(!this.head) return undefined;
    let insertCallback = this._insertBefore.bind(this);
    return this._insertHelperIdx(value, this.length - 1, insertCallback);
  }

  push(value) {
    if(!this.head) return undefined;
    let insertCallback = this._insertAfter.bind(this);
    return this._insertHelperIdx(value, this.length - 1, insertCallback);
  }

  unshift(value) {
    if(!this.head) return undefined;
    let insertCallback = this._insertBefore.bind(this);
    return this._insertHelper(value, this.head.value, insertCallback);
  }

  remove(target) {
    if(!this.head) throw new LinkedListException("Empty list");

    if(this.head.value === target) {
      let toBeRemoved = this.head;
      toBeRemoved.next.previous = null;
      this.head = toBeRemoved.next;
      this.length--;
      return toBeRemoved;
    };

    let thisNode = this.head.next;
    while(thisNode) {
      if(thisNode.value === target) {
        thisNode.previous.next = thisNode.next;
        if(thisNode.next) thisNode.next.previous = thisNode.previous;
        else this.tail = thisNode.previous
        this.length--;
        return thisNode;
      } else {
        thisNode = thisNode.next;
      };
    };

    return -1;
  }

  removeAtIdx(index) {

  }

  removeHead() {

  }

  shift() {
    this.removeHead();
  }

  removeTail() {

  }

  pop() {
    this.removeTail();
  }

  count() {
    let count = 0;
    let thisNode = this.head;
    while(thisNode) {
      thisNode = thisNode.next;
      count++;
    };
    return count;
  } //add optional value; if included will count all instances of value in LL

  inList(target) {
    let thisNode = this.head;
    while(thisNode) {
      if(thisNode.value === target) return true;
      else thisNode = thisNode.next;
    };
    return false;
  }

  findAtIndex(target) {
    let count = 0;
    let thisNode = this.head;
    while(thisNode) {
      if(thisNode.value === target) {
        return thisNode;
      } else {
        thisNode = thisNode.next;
        count++;
      };
    };
    return -1;
  }

  findAll(target) {

  }

  _insertHelper(value, target, callback) {
    let foundTarget = false;
    let thisNode = this.head;
    while(!foundTarget) {
      if(thisNode.value === target) {
        callback(value, thisNode);
        foundTarget = true;
      } else if(thisNode === this.tail) {
        return -1;
      } else {
        thisNode = thisNode.next;
      };
    };
  }

  _insertHelperIdx(value, targetIdx, callback) {
    let currentIdx = 0;
    let foundTarget = false;
    let thisNode = this.head;
    while (!foundTarget) {
      if(currentIdx === targetIdx) {
        callback(value, thisNode);
        foundTarget = true;
      } else if(thisNode === this.tail) {
        return -1;
      } else {
        currentIdx++;
        thisNode = thisNode.next;
      };
    };
  }

  _insertAfter(newValue, thisNode) {
    let newNode = new LLNode(newValue, thisNode.next, thisNode);
    if(thisNode.next) thisNode.next.previous = newNode;
    else this.tail = newNode;
    thisNode.next = newNode;
    this.length++;
  }

  _insertBefore(newValue, thisNode) {
    let newNode = new LLNode(newValue, thisNode, thisNode.previous);
    if(thisNode.previous) thisNode.previous.next = newNode;
    else this.head = newNode;
    thisNode.previous = newNode;
    this.length++;
  }
};

class LLNode {
  constructor(value, next, previous) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }
};
