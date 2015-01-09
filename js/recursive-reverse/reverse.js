;(function(d, undefined){
// reverse :: [a] -> [a]
// reverse []     = []
// reverse (x:xs) = reverse xs ++ [x]
function reverse(seq) {
    return seq.length > 1 ?
        reverse(seq.slice(1)).concat(seq.slice(0, 1)) : seq;
}

// reverse :: [a] -> [a]
// reverse list = rev list []
//   where rev []     ret = ret
//         rev (x:xs) ret = rev xs (x:ret)
function tailReverse(seq, ret) {
    if (typeof ret === "undefined") {
        return tailReverse(seq, typeof seq === "string" ? "" : []);
    } else if (seq.length > 0) {
        return tailReverse(seq.slice(1), seq.slice(0, 1).concat(ret));
    } else {
        return ret;
    }
}

function isSeqEqual(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        return a === b;
    } else {
        return a.length == b.length &&
            a.every(function(ai, i) {
                return ai == b[i];
            });
    }
}

var cases = [
    {
        name: "Array with even number of elements",
        input: [1, 2, 3, 4],
        expected: [4, 3, 2, 1]
    },
    {
        name: "Array with odd number of elements",
        input: [1, 2, 3],
        expected: [3, 2, 1]
    },
    {
        name: "Array with two elements",
        input: [1, 2],
        expected: [2, 1]
    },
    {
        name: "Array with one element",
        input: [1],
        expected: [1]
    },
    {
        name: "String with even number of characters",
        input: "abcd",
        expected: "dcba"
    },
    {
        name: "String with odd number of characters",
        input: "abc",
        expected: "cba"
    },
    {
        name: "Two-character string",
        input: "ab",
        expected: "ba"
    },
    {
        name: "One-character string",
        input: "a",
        expected: "a"
    }
];

testUtil.assert("Recursive reverse",
                cases, reverse, isSeqEqual);
testUtil.assert("Recursive reverse(tail recursion)",
                cases, tailReverse, isSeqEqual);
}(document));
