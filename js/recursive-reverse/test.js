;

var testUtil = (function(d, undefined) {

    function assert(name, cases, fn, assertion) {
        var main = d.getElementById('main');

        var result = d.createElement('div');
        result.className = "result";
        result.appendChild(newTag('h2', name, 'func-name'));

        var pre = d.createElement('pre');
        pre.className = "source";
        pre.innerHTML = fn.toString();
        result.appendChild(pre);

        for (var i = 0; i < cases.length; ++i) {
            var actual = fn(cases[i].input);
            if (assertion(actual, cases[i].expected)) {
                result.appendChild(resultNode(cases[i], actual, true));
            } else {
                result.appendChild(resultNode(cases[i], actual, false));
            }
        }

        main.appendChild(result);
    }

    function resultNode(testcase, actual, passed) {
        var div = d.createElement('div');
        div.className = passed ? "pass" : "fail";
        div.appendChild(newTag('h3', testcase.name, 'case-name'));
        var list = d.createElement('dl');
        list.appendChild(newTag('dt', 'Input'));
        list.appendChild(newTag('dd',  JSON.stringify(testcase.input), 'input'));
        list.appendChild(newTag('dt', 'Expected'));
        list.appendChild(newTag('dd',  JSON.stringify(testcase.expected), 'expected'));
        list.appendChild(newTag('dt', 'Actual'));
        list.appendChild(newTag('dd',  JSON.stringify(actual), 'actual'));
        div.appendChild(list);
        return div;
    }

    function newTag(tag, text, className) {
        var element = d.createElement(tag);
        element.appendChild(d.createTextNode(text));
        if (typeof className !== "undefined") {
            element.className = className;
        }
        return element;
    }

    return {
        assert : assert
    };

}(document));
