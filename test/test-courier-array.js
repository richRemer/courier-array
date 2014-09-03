var CourierArray = require(".."),
    courier = require("courier"),
    expect = require("expect.js");

describe("CourierArray module", function() {
    it("should decorate the courier module with 'array' function", function() {
        expect(courier.array).to.be.a("function");
    });
});

describe("CourierArray", function() {
    describe(".pop", function() {
        var arr = courier.array(["a", "b"]);
        
        it("should remove the last element and return it", function() {
            var val = arr.pop();
            expect(val).to.be("b");
            expect(arr.length).to.be(1);
        });
    });
    
    describe("push", function() {
        var arr = courier.array([]);
        
        it("should append an element to the end", function() {
            arr.push("foo");
            expect(arr.length).to.be(1);
            expect(arr[0]).to.be("foo");
        });
    });
    
    describe(".reverse", function() {
        var arr = courier.array(["a", "b", "c"]);
        
        it("should reverse the order of elements", function() {
            arr.reverse();
            expect(arr.length).to.be(3);
            expect(arr[0]).to.be("c");
            expect(arr[2]).to.be("a");
        });
    });
    
    describe(".shift", function() {
        var arr = courier.array(["a", "b"]);
        
        it("should remove the first element and return it", function() {
            var shifted = arr.shift();
            expect(shifted).to.be("a");
            expect(arr.length).to.be(1);
            expect(arr[0]).to.be("b");
        });
    });
    
    describe(".sort", function() {
        var arr = courier.array(["f", "c", "i", "e"]);
        
        it("should sort the elements", function() {
            arr.sort();
            expect(arr.length).to.be(4);
            expect(arr[0]).to.be("c");
            expect(arr[3]).to.be("i");
        });
    });

    describe(".splice", function() {
        var arr = courier.array(["a", "b", "c"]);
        
        it("should return replaced subsection of array", function() {
            var spliced = arr.splice(1, 1, "d");
            expect(spliced).to.be.an("array");
            expect(spliced.length).to.be(1);
            expect(spliced[0]).to.be("b");
            expect(arr.length).to.be(3);
            expect(arr[1]).to.be("d");
        });
    });    

    describe(".unshift", function() {
        var arr = courier.array(["a"]);
        
        it("should append an element to the beginning", function() {
            arr.unshift("b");
            expect(arr.length).to.be(2);
            expect(arr[0]).to.be("b");
        });
    });
    
    describe("pub/sub", function() {
        var arr = courier.array([]);
    
        it("should publish to add/remove when updated", function() {
            var audit = [];
            
            arr.courier.subscribe("add", function(msg) {
                audit.push(msg);
            });
            
            arr.courier.subscribe("remove", function(msg) {
                audit.splice(audit.indexOf(msg), 1);
            });
            
            arr.push("a", "b");
            arr.unshift("a");
            arr.splice(1, 1, "c", "d");
            arr.reverse();
            arr.pop();
            arr.shift();
            
            arr.sort();
            audit.sort();
            arr = arr.slice();
            expect(arr.length).to.be(audit.length);
            expect(arr[0]).to.be(audit[0]);
            expect(arr[arr.length-1]).to.be(audit[audit.length-1]);
        });
    });
});
