var yellow = document.getElementById('yellow');
var red = document.getElementById('red');
var blue = document.getElementById('blue');
var bubbleSwitch = document.getElementById('bubble-switch');
var bubbleState = document.getElementById('bubble-state');
var bubblable = document.getElementById('bubblable');
var allowBubble = true;

[yellow, red, blue].forEach(function(el) {
  ['mouseenter', 'mouseover',
  'mouseleave', 'mouseout'].forEach(function(event) {
    el.addEventListener(event, function(e) {
      var info = document.getElementById(el.id + '-' + event);
      info.className = 'visible';
      setTimeout(function() {
        info.className = 'hidden';
      }, 2000);

      if (!allowBubble)
        e.stopPropagation();
    });
  })
});

bubbleSwitch.addEventListener('click', function() {
  allowBubble = !allowBubble;
  bubbleState.textContent = allowBubble ? 'Cancel' : 'Allow';
  bubblable.textContent = allowBubble ? 'Bubbling' : 'Not bubbling';
});