/*worker-render@1.2.2#worker/handlers/global-event*/
var can = require('can/util/util');
var special = require('./globals/special.js');
module.exports = function (data) {
    var event = data.event;
    event.target = event.currentTarget = self;
    if (special[event.type]) {
        special[event.type](event);
    }
    can.trigger(window, event);
};