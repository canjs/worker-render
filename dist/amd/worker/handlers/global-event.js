/*worker-render@1.1.8#worker/handlers/global-event*/
define(function (require, exports, module) {
    var can = require('can/util');
    var special = require('./globals/special');
    module.exports = function (data) {
        var event = data.event;
        event.target = event.currentTarget = self;
        if (special[event.type]) {
            special[event.type](event);
        }
        can.trigger(window, event);
    };
});