;(function(d, undefined) {
  // insert a clone to show the following effect
  var scroller = d.getElementById('scroller');
  var inner = d.getElementById('inner');
  var outer = d.getElementById('outer');
  var clone = inner.cloneNode(true);
  clone.id = "inner-clone";
  outer.appendChild(clone);

  var stop = false;
  var width = inner.clientWidth;

  setInterval(function() {
    if (stop) // stop, no action
      return;
    // this 'frame' is not over, continue scrolling
    if (scroller.scrollLeft < width) {
      scroller.scrollLeft += 3;
    // This frame is over, back to the original position
    } else {
      /***************************************
       * Note that at this moment, inner2 touches the left edge of the window.
       * 
       * -----------------before----------------
       * |[       inner2     ][       inner     ]
       * ---------------------------------------
       * The following line effectively scroll back to the leftmost position,
       * making the first inner element touch the left edge of the window.
       */
      scroller.scrollLeft = 0;

      /***************************************
       * ------------------after----------------
       * |[       inner     ][       inner2     ]
       * ---------------------------------------
       * Since inner2 is a clone of inner, after this line,
       * what we see is still the same as before,
       * so this transition is seamless.
       */
      
    }
  }, 40);

  var links = scroller.getElementsByTagName('a');
  var link_len = links.length;
  for (var i = 0; i < link_len; ++i) {
    links[i].onmouseover = function() {
      stop = true;
    }
    links[i].onmouseout = function() {
      stop = false;
    }
  }

})(document);