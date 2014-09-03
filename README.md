CourierArray
============
Array extension with support for courier publish/subscribe model.

Using the CourierArray class
----------------------------

```js
var CourierArray = require("courier-array"),
    arr = new CourierArray();

// outputs: a b
arr.courier.subscribe("add", console.log);
arr.push("a", "b");
```

Using the courier.array function
--------------------------------
```js
var CourierArray = require("courier-array"),    // must be loaded so courier is
    courier = require("courier"),               // decorated with 'array'
    arr = courier.array([2, 3]);

// outputs: a b
courier.subscribe(arr, "add", console.log);
arr.push("a", "b");
```
