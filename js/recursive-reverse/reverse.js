;(function(d, undefined){

// reverse' :: [a] -> [a]
// reverse' []     = []
// reverse' (x:xs) = reverse' xs ++ [x]
function recursiveReverse(seq) {
    return seq.length > 1 ?
        recursiveReverse(seq.slice(1)).concat(seq.slice(0, 1)) : seq;
}

// reverse' :: [a] -> [a]
// reverse' list = rev list []
//   where rev []     ret = ret
//         rev (x:xs) ret = rev xs (x:ret)
function tailReverse(seq) {
    return (function rev(seq, ret) {
        return seq.length > 0 ?
            rev(seq.slice(1), seq.slice(0, 1).concat(ret)) : ret;
    })(seq, seq.slice(0, 0));
}

var arrayCases = [
    {
        name: "Empty array",
        input: [],
        expected: []
    },
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
    }
];

var stringCases = [
    {
        name: "Empty string",
        input: "",
        expected: ""
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

var cases = arrayCases.concat(stringCases);

testUtil.assert("Recursive reverse",
                cases, recursiveReverse, testUtil.isSeqEqual);
testUtil.assert("Recursive reverse (tail recursion)",
                cases, tailReverse, testUtil.isSeqEqual);
}(document));
