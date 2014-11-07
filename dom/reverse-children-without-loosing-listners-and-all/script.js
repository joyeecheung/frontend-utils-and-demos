;(function(d, undefined) {
    // This one treats the node list as a linked list, so it's O(n)
    function reverseChild(pare) {
        if (!pare.childNodes || pare.childNodes.length < 2) return;
        var oldFirstChild = pare.firstChild;
        for (var i = 0, len = pare.childNodes.length; i < len; i++) {
            var last = pare.lastChild;
            pare.insertBefore(last, oldFirstChild);
        }
    }

    // This one is based on a for loop with index tricks, it is O(n/2)
    function reverseChild2(pare) {
        if (!pare.childNodes || pare.childNodes.length < 2) return;
        // use span as placeholder since they can be contained by any element
        var emptyLeft = d.createElement('span');
        var emptyRight = d.createElement('span');
        var oldFirstChild = pare.firstChild;
        for (var i = 0, len = pare.childNodes.length; i < Math.floor(len / 2); i++) {
            var left = pare.replaceChild(emptyLeft, pare.childNodes[i]);
            var right = pare.replaceChild(emptyRight, pare.childNodes[len - i - 1]);
            emptyLeft = pare.replaceChild(right, emptyLeft);
            emptyRight = pare.replaceChild(left, emptyRight);
        }
    }

    // This one uses Array.prototype.reverse()
    function reverseChild3(pare) {
        if (!pare.childNodes || pare.childNodes.length < 2) return;
        // Don't use Array.prototype.slice here because we also need to remove the children.
        // Might as well push them into the array as we go.
        var arr = [];
        while (pare.firstChild) {
            arr.push(pare.removeChild(pare.firstChild));
        }
        arr.reverse();
        arr.forEach(function(node) {
            pare.appendChild(node);
        });
    }

    // Detach a Dom node, do something inside it, then place it back
    // Requires that fn won't access the parent of this node.
    function doInsideDomNode(d, node, fn) {
        var clone = node.cloneNode(false); // get a shallow clone
        var detachedNode = node.parentNode.replaceChild(clone, node);

        fn(detachedNode);

        clone.parentNode.replaceChild(detachedNode, clone);
    }

    // Toggle the text color between yellow and auto
    function foo(e) {
        if (!this.style.color) {
            this.style.color = "yellow";
        } else {
            this.style.color = "";
        }
    }

    // listener
    function reverseChildren(e) {
        var container = d.getElementById('container');
        doInsideDomNode(d, container, reverseChild);
    }

    var sections = d.getElementById('container').getElementsByTagName('div');

    for (var i = 0; i < sections.length; ++i) {
        var sec = sections[i];
        sec.onclick = foo;
    }

    var btn_reverse = d.getElementById('btn-reverse')
    btn_reverse.onclick = reverseChildren;
})(document);