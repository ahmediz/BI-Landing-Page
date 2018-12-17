var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) { return typeof obj; } : function(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
var _createClass = function() {
    function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor); } } return function(Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var END = 'change';
var START = 'ontouchstart' in document ? 'touchstart' : 'mousedown';
var INPUT = 'input';
var MAX_ROTATION = 35;
var SOFTEN_FACTOR = 3;
var

    RangeInput = function() {

    function RangeInput(el) {
        _classCallCheck(this, RangeInput);
        this.el = el;

        this._handleEnd = this._handleEnd.bind(this);
        this._handleStart = this._handleStart.bind(this);
        this._handleInput = this._handleInput.bind(this);

        //Call the plugin
        $(this.el.querySelector('input[type=range]')).rangeslider({
            polyfill: false, //Never use the native polyfill
            rangeClass: 'rangeslider',
            disabledClass: 'rangeslider-disabled',
            horizontalClass: 'rangeslider-horizontal',
            verticalClass: 'rangeslider-vertical',
            fillClass: 'rangeslider-fill-lower',
            handleClass: 'rangeslider-thumb',
            onInit: function onInit() {
                //No args are passed, so we can't change context of this
                var pluginInstance = this;

                //Move the range-output inside the handle so we can do all the stuff in css
                $(pluginInstance.$element).
                parents('.range').
                find('.range-output').
                appendTo(pluginInstance.$handle);
            }
        });


        this.sliderThumbEl = el.querySelector('.rangeslider-thumb');
        this.outputEl = el.querySelector('.range-output');
        this.inputEl = el.querySelector('input[type=range]');
        this._lastOffsetLeft = 0;
        this._lastTimeStamp = 0;

        this.el.querySelector('.rangeslider').addEventListener(START, this._handleStart);
    }
    _createClass(RangeInput, [{
        key: '_handleStart',
        value: function _handleStart(

            e) {
            var _this = this;
            this._lastTimeStamp = new Date().getTime();
            this._lastOffsetLeft = this.sliderThumbEl.offsetLeft;

            //Wrap in raf because offsetLeft is updated by the plugin after this fires
            requestAnimationFrame(function(_) {
                //Bind through jquery because plugin doesn't fire native event
                $(_this.inputEl).on(INPUT, _this._handleInput);
                $(_this.inputEl).on(END, _this._handleEnd);
            });
        }
    }, {
        key: '_handleEnd',
        value: function _handleEnd(

            e) {
            var _this2 = this;
            //Unbind through jquery because plugin doesn't fire native event
            $(this.inputEl).off(INPUT, this._handleInput);
            $(this.inputEl).off(END, this._handleEnd);

            requestAnimationFrame(function(_) { return _this2.outputEl.style.transform = 'rotate(0deg)'; });
        }
    }, {
        key: '_handleInput',
        value: function _handleInput(

            e) {
            var _this3 = this;
            var now = new Date().getTime();
            var timeElapsed = now - this._lastTimeStamp || 1;
            var distance = this.sliderThumbEl.offsetLeft - this._lastOffsetLeft;
            var direction = distance < 0 ? -1 : 1;
            var velocity = Math.abs(distance) / timeElapsed; //pixels / millisecond
            var targetRotation = Math.min(Math.abs(distance * velocity) * SOFTEN_FACTOR, MAX_ROTATION);

            requestAnimationFrame(function(_) { return _this3.outputEl.style.transform = 'rotate(' + targetRotation * -direction + 'deg)'; });

            this._lastTimeStamp = now;
            this._lastOffsetLeft = this.sliderThumbEl.offsetLeft;
        }
    }]);
    return RangeInput;
}();




/*! rangeslider.js - v2.1.1 | (c) 2016 @andreruffert | MIT license | https://github.com/andreruffert/rangeslider.js */
! function(a) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) ? module.exports = a(require("jquery")) : a(jQuery); }(function(a) { "use strict";

    function b() { var a = document.createElement("input"); return a.setAttribute("type", "range"), "text" !== a.type; }

    function c(a, b) { var c = Array.prototype.slice.call(arguments, 2); return setTimeout(function() { return a.apply(null, c); }, b); }

    function d(a, b) { return b = b || 100,
            function() { if (!a.debouncing) { var c = Array.prototype.slice.apply(arguments);
                    a.lastReturnVal = a.apply(window, c), a.debouncing = !0; } return clearTimeout(a.debounceTimeout), a.debounceTimeout = setTimeout(function() { a.debouncing = !1; }, b), a.lastReturnVal; }; }

    function e(a) { return a && (0 === a.offsetWidth || 0 === a.offsetHeight || a.open === !1); }

    function f(a) { for (var b = [], c = a.parentNode; e(c);) { b.push(c), c = c.parentNode; } return b; }

    function g(a, b) {
        function c(a) { "undefined" != typeof a.open && (a.open = a.open ? !1 : !0); } var d = f(a),
            e = d.length,
            g = [],
            h = a[b]; if (e) { for (var i = 0; e > i; i++) { g[i] = d[i].style.cssText, d[i].style.setProperty ? d[i].style.setProperty("display", "block", "important") : d[i].style.cssText += ";display: block !important", d[i].style.height = "0", d[i].style.overflow = "hidden", d[i].style.visibility = "hidden", c(d[i]); }
            h = a[b]; for (var j = 0; e > j; j++) { d[j].style.cssText = g[j], c(d[j]); } } return h; }

    function h(a, b) { var c = parseFloat(a); return Number.isNaN(c) ? b : c; }

    function i(a) { return a.charAt(0).toUpperCase() + a.substr(1); }

    function j(b, e) { if (this.$window = a(window), this.$document = a(document), this.$element = a(b), this.options = a.extend({}, n, e), this.polyfill = this.options.polyfill, this.orientation = this.$element[0].getAttribute("data-orientation") || this.options.orientation, this.onInit = this.options.onInit, this.onSlide = this.options.onSlide, this.onSlideEnd = this.options.onSlideEnd, this.DIMENSION = o.orientation[this.orientation].dimension, this.DIRECTION = o.orientation[this.orientation].direction, this.DIRECTION_STYLE = o.orientation[this.orientation].directionStyle, this.COORDINATE = o.orientation[this.orientation].coordinate, this.polyfill && m) return !1;
        this.identifier = "js-" + k + "-" + l++, this.startEvent = this.options.startEvent.join("." + this.identifier + " ") + "." + this.identifier, this.moveEvent = this.options.moveEvent.join("." + this.identifier + " ") + "." + this.identifier, this.endEvent = this.options.endEvent.join("." + this.identifier + " ") + "." + this.identifier, this.toFixed = (this.step + "").replace(".", "").length - 1, this.$fill = a('<div class="' + this.options.fillClass + '" />'), this.$handle = a('<div class="' + this.options.handleClass + '" />'), this.$range = a('<div class="' + this.options.rangeClass + " " + this.options[this.orientation + "Class"] + '" id="' + this.identifier + '" />').insertAfter(this.$element).prepend(this.$fill, this.$handle), this.$element.css({ position: "absolute", width: "1px", height: "1px", overflow: "hidden", opacity: "0" }), this.handleDown = a.proxy(this.handleDown, this), this.handleMove = a.proxy(this.handleMove, this), this.handleEnd = a.proxy(this.handleEnd, this), this.init(); var f = this;
        this.$window.on("resize." + this.identifier, d(function() { c(function() { f.update(!1, !1); }, 300); }, 20)), this.$document.on(this.startEvent, "#" + this.identifier + ":not(." + this.options.disabledClass + ")", this.handleDown), this.$element.on("change." + this.identifier, function(a, b) { if (!b || b.origin !== f.identifier) { var c = a.target.value,
                    d = f.getPositionFromValue(c);
                f.setPosition(d); } }); }
    Number.isNaN = Number.isNaN || function(a) { return "number" == typeof a && a !== a; }; var k = "rangeslider",
        l = 0,
        m = b(),
        n = { polyfill: !0, orientation: "horizontal", rangeClass: "rangeslider", disabledClass: "rangeslider--disabled", horizontalClass: "rangeslider--horizontal", verticalClass: "rangeslider--vertical", fillClass: "rangeslider__fill", handleClass: "rangeslider__handle", startEvent: ["mousedown", "touchstart", "pointerdown"], moveEvent: ["mousemove", "touchmove", "pointermove"], endEvent: ["mouseup", "touchend", "pointerup"] },
        o = { orientation: { horizontal: { dimension: "width", direction: "left", directionStyle: "left", coordinate: "x" }, vertical: { dimension: "height", direction: "top", directionStyle: "bottom", coordinate: "y" } } }; return j.prototype.init = function() { this.update(!0, !1), this.onInit && "function" == typeof this.onInit && this.onInit(); }, j.prototype.update = function(a, b) { a = a || !1, a && (this.min = h(this.$element[0].getAttribute("min"), 0), this.max = h(this.$element[0].getAttribute("max"), 100), this.value = h(this.$element[0].value, Math.round(this.min + (this.max - this.min) / 2)), this.step = h(this.$element[0].getAttribute("step"), 1)), this.handleDimension = g(this.$handle[0], "offset" + i(this.DIMENSION)), this.rangeDimension = g(this.$range[0], "offset" + i(this.DIMENSION)), this.maxHandlePos = this.rangeDimension - this.handleDimension, this.grabPos = this.handleDimension / 2, this.position = this.getPositionFromValue(this.value), this.$element[0].disabled ? this.$range.addClass(this.options.disabledClass) : this.$range.removeClass(this.options.disabledClass), this.setPosition(this.position, b); }, j.prototype.handleDown = function(a) { if (this.$document.on(this.moveEvent, this.handleMove), this.$document.on(this.endEvent, this.handleEnd), !((" " + a.target.className + " ").replace(/[\n\t]/g, " ").indexOf(this.options.handleClass) > -1)) { var b = this.getRelativePosition(a),
                c = this.$range[0].getBoundingClientRect()[this.DIRECTION],
                d = this.getPositionFromNode(this.$handle[0]) - c,
                e = "vertical" === this.orientation ? this.maxHandlePos - (b - this.grabPos) : b - this.grabPos;
            this.setPosition(e), b >= d && b < d + this.handleDimension && (this.grabPos = b - d); } }, j.prototype.handleMove = function(a) { a.preventDefault(); var b = this.getRelativePosition(a),
            c = "vertical" === this.orientation ? this.maxHandlePos - (b - this.grabPos) : b - this.grabPos;
        this.setPosition(c); }, j.prototype.handleEnd = function(a) { a.preventDefault(), this.$document.off(this.moveEvent, this.handleMove), this.$document.off(this.endEvent, this.handleEnd), this.$element.trigger("change", { origin: this.identifier }), this.onSlideEnd && "function" == typeof this.onSlideEnd && this.onSlideEnd(this.position, this.value); }, j.prototype.cap = function(a, b, c) { return b > a ? b : a > c ? c : a; }, j.prototype.setPosition = function(a, b) { var c, d;
        void 0 === b && (b = !0), c = this.getValueFromPosition(this.cap(a, 0, this.maxHandlePos)), d = this.getPositionFromValue(c), this.$fill[0].style[this.DIMENSION] = d + this.grabPos + "px", this.$handle[0].style[this.DIRECTION_STYLE] = d + "px", this.setValue(c), this.position = d, this.value = c, b && this.onSlide && "function" == typeof this.onSlide && this.onSlide(d, c); }, j.prototype.getPositionFromNode = function(a) { for (var b = 0; null !== a;) { b += a.offsetLeft, a = a.offsetParent; } return b; }, j.prototype.getRelativePosition = function(a) { var b = i(this.COORDINATE),
            c = this.$range[0].getBoundingClientRect()[this.DIRECTION],
            d = 0; return "undefined" != typeof a["page" + b] ? d = a["client" + b] : "undefined" != typeof a.originalEvent["client" + b] ? d = a.originalEvent["client" + b] : a.originalEvent.touches && a.originalEvent.touches[0] && "undefined" != typeof a.originalEvent.touches[0]["client" + b] ? d = a.originalEvent.touches[0]["client" + b] : a.currentPoint && "undefined" != typeof a.currentPoint[this.COORDINATE] && (d = a.currentPoint[this.COORDINATE]), d - c; }, j.prototype.getPositionFromValue = function(a) { var b, c; return b = (a - this.min) / (this.max - this.min), c = Number.isNaN(b) ? 0 : b * this.maxHandlePos; }, j.prototype.getValueFromPosition = function(a) { var b, c; return b = a / (this.maxHandlePos || 1), c = this.step * Math.round(b * (this.max - this.min) / this.step) + this.min, Number(c.toFixed(this.toFixed)); }, j.prototype.setValue = function(a) {
        (a !== this.value || "" === this.$element[0].value) && this.$element.val(a).trigger("input", { origin: this.identifier }); }, j.prototype.destroy = function() { this.$document.off("." + this.identifier), this.$window.off("." + this.identifier), this.$element.off("." + this.identifier).removeAttr("style").removeData("plugin_" + k), this.$range && this.$range.length && this.$range[0].parentNode.removeChild(this.$range[0]); }, a.fn[k] = function(b) { var c = Array.prototype.slice.call(arguments, 1); return this.each(function() { var d = a(this),
                e = d.data("plugin_" + k);
            e || d.data("plugin_" + k, e = new j(this, b)), "string" == typeof b && e[b].apply(e, c); }); }, "rangeslider.js is available in jQuery context e.g $(selector).rangeslider(options);"; });


new RangeInput(document.querySelector('.range'));