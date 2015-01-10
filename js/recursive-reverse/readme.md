### Reverse a sequence with recursion/tail recursion/ES6 destructuring assignment

#### Simple recursive version (supports array and strings)

```javascript
function recursiveReverse(seq) {
    return seq.length > 1 ?
        recursiveReverse(seq.slice(1)).concat(seq.slice(0, 1)) : seq;
}
```

#### Tail recursive version (supports array and strings)

```javascript
function tailReverse(seq, ret) {
    if (typeof ret === "undefined") {
        return tailReverse(seq, typeof seq === "string" ? "" : []);
    } else if (seq.length > 0) {
        return tailReverse(seq.slice(1), seq.slice(0, 1).concat(ret));
    } else {
        return ret;
    }
}
```

#### Recursive version with ES6 destructuring

```javascript
// pm stands for pattern matching
function pmReverse([x, ...xs]) {
    return typeof x === "undefined" ? [] : pmReverse(xs).concat([x]);
}
```

#### Tail recursive version with ES6 destructuring

```javascript
function pmTailReverse(list) {
    return (function rev([x, ...xs], ret) {
        return typeof x === "undefined" ? ret : rev(xs, [x].concat(ret));
    })(list, []);
}
```

### Compatibility

The first two versions are tested on the latest stable release of both FireFox and Chrome. The ES6 versions are tested on FireFox, but not on Chrome because I can't seem to turn the ES6 on.

Open the index.html will fire up the tests (I wrote a mini testing framework for it). If your browser doesn't support ES6 (whether because it can't or you haven't turn it on), an alert will show up.
