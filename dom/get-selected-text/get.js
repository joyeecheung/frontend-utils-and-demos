;(function(w, d, undefined) {
    function getSelectedText() {
        var text = "";
        if (w.getSelection) {
            text = w.getSelection().toString();
        } else if (d.selection && d.selection.createRange) {
            text = d.selection.createRange().text;
        }
        return text;
    }

    d.onmouseup = function(e) {
        var output = d.getElementById('output');
        output.innerHTML = getSelectedText();
    }
})(window, document);