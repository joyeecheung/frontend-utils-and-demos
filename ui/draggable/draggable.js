;(function(window, undefined) {
    /** 
     * some utitlity to help handling compatibility issues
     */
    var util = {
        /**
         * Cross-browser event handler support.
         * @param {Object}   elem  the event target
         * @param {Object}   type event object
         * @param {Function} fn   event handler
         */
        addEvent: function(elem, type, fn) {
            if (elem.addEventListener) {
                /* W3C DOM `addEventListener` supported */
                elem.addEventListener(type, fn, false);
            } else {
                /* IE9 or lower */
                elem['e' + type + fn] = fn;
                elem[type + fn] = function() {
                    elem['e' + type + fn](window.event);
                }
                elem.attachEvent('on' + type, elem[type + fn]);
            }
        },

        /**
         * Cross-browser event handler support.
         * @param {Object}   elem  the event target
         * @param {Object}   type event object
         * @param {Function} fn   event handler
         */
        removeEvent: function(elem, type, fn) {
            if (elem.removeEventListener) {
                /* W3C DOM `removeEventListener` supported */
                elem.removeEventListener(type, fn, false);
            } else {
                /* IE9 or lower */
                elem.detachEvent('on' + type, elem[type + fn]);
                elem[type + fn] = null;
            }
        },

        /**
         * Decide which button of the mouse is pressed.
         * Notice that there is no way to determine
         * the button pressed for click or dbclick
         * if the browser is IE9 or lower.
         *
         * @param  {Object} event event object
         * @return {String}       the position of the button pressed
         *                        "LEFT", "MIDDLE" or "RIGHT"
         */
        buttonOf: function(event) {
            if (event.which == null) {
                /* IE case */
                return (event.button < 2) ? "LEFT" :
                    ((event.button == 4) ? "MIDDLE" : "RIGHT");
            } else {
                /* All others */
                return (event.which < 2) ? "LEFT" :
                    ((event.which == 2) ? "MIDDLE" : "RIGHT");
            }
        },

        /**
         * Test if an elememnt is of a class.
         * @param  {Object}  elem    element to test
         * @param  {String}  cls     class to test
         * @return {Boolean}         true if the element is of the class
         */
        hasClass: function(elem, cls) {
            // add spaces so that partial class name won't return true
            return (' ' + elem.className + ' ').indexOf(' ' + cls + ' ') > -1;
        },

        extend: function(destination, source) {
            for (var property in source)
                destination[property] = source[property];
            return destination;
        }
    };

    /**
     * draggable utility
     */
    var draggable = {
        state: {
            dragging: false,
            parentX: 0,  // the x-coordinate of the parent of the target, relative to the page
            parentY: 0,  // the y-coordinate of the parent of the target, relative to the page
            parentWidth: 0,
            parentHeight: 0,
            target: null  // the target element
        },

        option: {
            draggedIndex: 100,
            relative: false
        },

        /**
         * Event handler to start dragging the object.
         */
        drag: function(event) {
            var body = document.body;
            var documentElement = document.documentElement;
            var target = event.target || event.srcElement;
            var state = draggable.state;
            if (state.dragging === false 
                && util.buttonOf(event) === "LEFT"
                && util.hasClass(target, "draggable")) {
                state.dragging = true;
                
                // for lower version of IE and firefox, the scrollTop[Left] is on body
                var scrollLeft = body.scrollLeft || document.documentElement.scrollLeft;
                var scrollTop = body.scrollTop || document.documentElement.scrollTop;
                
                // get the bounding rectangle of the parent
                var rect = target.offsetParent.getBoundingClientRect();
                // get the parent's coordinate relative to the page
                state.parentX = rect.left + scrollLeft;
                state.parentY = rect.top + scrollTop;
                state.parentWidth = rect.right - rect.left;
                state.parentHeight = rect.bottom - rect.top;
                state.target = target;
                target.style.zIndex = "" + draggable.option.draggedIndex;
            }
        },

        /**
         * Event handler to stop dragging the object
         */
        drop: function(event) {
            var state = draggable.state;
            if (state.dragging === true) {
                state.dragging = false;
                state.target.style.zIndex = "auto";
                state.target.style.cursor = "auto";
                state.target = null;
            }
        },

        /**
         * Event handler to move the object so that it follows the cursor
         */
        move: function(event) {
            var body = document.body;
            var documentElement = document.documentElement;
            var state = draggable.state;
            var target = state.target;
            if (state.dragging === true) {
                // get the size of the target to center it around the cursor
                var width = target.clientWidth;
                var height = target.clientHeight;

                // for lower version of IE and firefox, the scrollTop[Left] is on body
                var scrollTop = body.scrollTop || document.documentElement.scrollTop;
                var scrollLeft = body.scrollLeft || document.documentElement.scrollLeft;
                // for lower version of IE, there is no pageX or pageY,
                // it has to be calculated manually
                var pageX = event.pageX || event.clientX + scrollLeft; 
                var pageY = event.pageY || event.clientY + scrollTop; 
                
                // don't use clientX or clientY here because
                // it is a wrong reference when the page is scrolled!
                // use pageX and pageY instead.
                // subtract half of the size to center the target around the cursor
                var newLeft = pageX - width/2 - state.parentX;
                var newTop = pageY - height/2 - state.parentY;

                if (draggable.option.relative) {
                    newLeft = newLeft < 0 ? 0: newLeft;
                    newTop = newTop < 0 ? 0: newTop;
                    var maxLeft = state.parentWidth - width;
                    var maxTop = state.parentHeight - height;
                    newLeft = newLeft > maxLeft ? maxLeft : newLeft;
                    newTop = newTop > maxTop ? maxTop : newTop;
                }

                target.style.left = newLeft + 'px';
                target.style.top = newTop + 'px';
                target.style.cursor = "move";
            }
        },

        init: function(opt) {
            var body = document.body;
            // the events must be bound to the body
            // so that the object is still being moved even when
            // the mouse move too fast and leave the object
            // hence the event used here are mousedown and mouseup
            util.addEvent(body, "mousedown", draggable.drag);
            util.addEvent(body, "mouseup", draggable.drop);
            util.addEvent(body, "mousemove", draggable.move);

            util.extend(draggable.option, opt);
        }
    }

    util.addEvent(window, "load", function(){
        draggable.init({relative: true});
    });
})(window);