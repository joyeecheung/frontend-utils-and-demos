;(function(d, undefined){
// ES6 version
// reverse' :: [a] -> [a]
// reverse' []     = []
// reverse' (x:xs) = reverse' xs ++ [x]
function pmReverse([x, ...xs]) {
    return xs.length > 0 ? pmReverse(xs).concat([x]) : [x];
}

// ES6 version
// reverse' :: [a] -> [a]
// reverse' list = rev list []
//   where rev []     ret = ret
//         rev (x:xs) ret = rev xs (x:ret)

function pmTailReverse(list) {
    return (function rev([x, ...xs], ret) {
        return xs.length > 0 ? rev(xs, [x].concat(ret)) : [x].concat(ret);
    })(list, []);
}

var arrayCases = [
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

testUtil.assert("Pattern matching reverse for arrays (needs ES6 support)",
                arrayCases, pmReverse, testUtil.isSeqEqual);
testUtil.assert("Pattern matching reverse for arrays (tail recursion)",
                arrayCases, pmTailReverse, testUtil.isSeqEqual);
}(document));
