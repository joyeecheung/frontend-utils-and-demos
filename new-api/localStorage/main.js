;(function(d, w, undefined) {

var select = d.getElementById('color');
var circle = d.getElementById('circle');
var timeText = d.getElementById('notice-time');
var colorText = d.getElementById('notice-color');
var localStorage = w.localStorage;

function init() {
    if (localStorage.getItem('color')) {
        update();
    } else {
        sync();
    }
}

function update() {
    var color = localStorage.getItem('color');
    var time = localStorage.getItem('time');
    circle.style.backgroundColor = color;
    timeText.textContent = time;
    colorText.textContent = color;
}


function sync() {
    var color = d.getElementById('color').value;
    localStorage.setItem('color', color);
    localStorage.setItem('time', Date());
    update();
}

select.addEventListener('change', sync);
w.addEventListener('load', init);
w.addEventListener('storage', update);

}(document, window));
