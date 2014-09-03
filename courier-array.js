var courier = require("courier").courier;

/**
 * @param {number|...elem} [elems]
 * @constructor
 */
function CourierArray(elems) {
    Array.apply(this, arguments);
    courier(this);
}

CourierArray.prototype = new Array();

CourierArray.prototype.pop = function() {
    var popped = Array.prototype.pop.call(this);
    
    if (popped !== undefined) {
        this.courier.publish("remove", popped);
        this.courier.publish("change", null);
    }
    
    return popped;
};

CourierArray.prototype.push = function() {
    var courier = this.courier;
    
    Array.prototype.push.apply(this, arguments);
    Array.prototype.forEach.call(arguments, function(arg) {
        courier.publish("add", arg);
    });
    courier.publish("change", null);
};

CourierArray.prototype.reverse = function() {
    Array.prototype.reverse.call(this);
    if (this.length > 0) this.courier.publish("change", null);
};

CourierArray.prototype.shift = function() {
    var shifted = Array.prototype.shift.call(this);
    
    if (shifted !== "undefined") {
        this.courier.publish("remove", shifted);
        this.courier.publish("change", null);
    }
    
    return shifted;
};

CourierArray.prototype.sort = function() {
    Array.prototype.sort.call(this);
    this.courier.publish("change", null);
};

CourierArray.prototype.splice = function() {
    var $this = this,
        spliced = Array.prototype.splice.apply(this, arguments),
        changed = false;
    
    if (spliced.length > 0) {
        changed = true;
        spliced.forEach(function(val) {$this.courier.publish("remove", val);});
    }
    
    if (arguments.length > 2) {
        changed = true;
        for (var i = 2; i < arguments.length; i++)
            this.courier.publish("add", arguments[i]);
    }
    
    if (changed) this.courier.publish("change", null);
    
    return spliced;
};

CourierArray.prototype.unshift = function() {
    var courier = this.courier;
    
    Array.prototype.unshift.apply(this, arguments);
    Array.prototype.forEach.call(arguments, function(arg) {
        courier.publish("add", arg);
    });
    courier.publish("change", null);
};

/**
 * Mixin CourierArray into an existing array and return the updated array.
 * @param {array} arr
 * @returns {array}
 */
function courierArray(arr) {
    courier(arr);
    for (var prop in CourierArray.prototype)
        arr[prop] = CourierArray.prototype[prop];
    return arr;
}

/** extend the courier module to include the courierArray function */
require("courier").array = courierArray;

/** export CourierArray function */
module.exports = CourierArray;
