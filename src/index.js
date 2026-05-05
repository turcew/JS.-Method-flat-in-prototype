"use strict";

function MyArray(...args) {
  this.length = 0;
  for (let i = 0; i < args.length; i++) {
    this[i] = args[i];
    this.length++;
  }
}

MyArray.isMyArray = function (obj) {
  return obj instanceof MyArray;
};

MyArray.prototype = new MyArrayProto();

function MyArrayProto() {
  this.push = function () {
    if (arguments) {
      for (let i = 0; i < arguments.length; i++) {
        this[this.length++] = arguments[i];
      }
      return this.length;
    }
  };

  this.concat = function (...args) {
    const res = new MyArray();

    for (let i = 0; i < this.length; i++) {
      res.push(this[i]);
    }

    for (let i = 0; i < args.length; i++) {
      if (Array.isArray(args[i])) {
        res.push(...args[i]);
      } else if (MyArray.isMyArray(args[i])) {
        for (let j = 0; j < args[i].length; j++) {
          res.push(args[i][j]);
        }
      } else {
        res.push(args[i]);
      }
    }
    return res;
  };

  this.flat = function (amount = 1) {
    if (amount < 1 || typeof amount !== "number") {
      return new MyArray();
    }

    let result = new MyArray();

    for (let i = 0; i < this.length; i++) {
      const item = this[i];

      if (MyArray.isMyArray(item)) {
        if (amount === 1) {
          result = result.concat(item);
        } else {
          const flattened = item.flat(amount - 1);
          result = result.concat(flattened);
        }
      } else {
        result.push(item);
      }
    }

    return result;
  };
}

const arr = new MyArray(
  1,
  new MyArray(2, 3),
  true,
  new MyArray(4, new MyArray(5, 6)),
);

console.log(arr.flat());
console.log(arr.flat(2));
