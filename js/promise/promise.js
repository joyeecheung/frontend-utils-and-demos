;(function() {
    var dataCount = 0,
        errorCount = 0,
        button = document.getElementById('btn'),
        pending = [];

    function showData(data) {
        stopPending();
        var datasec = document.getElementById('data');
        var item = document.createElement('li');
        item.appendChild(document.createTextNode(dataCount++ +": "));
        item.appendChild(document.createTextNode(JSON.stringify(data)));
        datasec.appendChild(item);
    }

    function showError(error) {
        stopPending();
        var errorsec = document.getElementById('error');
        var item = document.createElement('li');
        item.appendChild(document.createTextNode(errorCount++ +": "));
        item.appendChild(document.createTextNode(JSON.stringify(error)));
        errorsec.appendChild(item);
    }

    function getData() {
        startPending();
        return util.$http('/api/someform').get();
    }

    function startPending() {
        pending.push(1);
        document.getElementById('count').textContent = pending.length;
    }

    function stopPending() {
        pending.pop();
        if (pending.length < 1) {
            document.getElementById('count').textContent = "none";
        } else {
            document.getElementById('count').textContent = pending.length;
        }
    }

    button.onclick = function() {
        getData().then(showData).catch(showError);
    };
}());
