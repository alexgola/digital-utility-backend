/*
 - If you want make test with TDD methodology you have to use asser
 - If you want make test with BDD methodology you have to use except 
*/

const expect  = require("chai").expect
const assert  = require("chai").assert
const sinon = require("sinon")

describe("Color Code Converter API", function() {
    it('calls subscribers on publish (NOT WORK!)', function () {  
        const callback = sinon.spy()
        PubSub.subscribe('message', callback)

        PubSub.publishSync('message')

        assertTrue(callback.called)
    })
    it("returns the return value from the original function (WORK!)", function () {
        const callback = sinon.stub().returns(42);
        const proxy = once(callback);

        expect(proxy()).to.be.equal(42, "expect test"); 
    })
})


function once(fn) {
    var returnValue, called = false;
    return function () {
        if (!called) {
            called = true;
            returnValue = fn.apply(this, arguments);
        }
        return returnValue;
    };
}
