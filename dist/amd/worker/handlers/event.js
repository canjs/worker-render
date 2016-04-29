/*worker-render@1.2.2#worker/handlers/event*/
define(function (require, exports, module) {
    var nodeRoute = require('node-route');
    var can = require('can/util');
    module.exports = function (data) {
        var event = data.event;
        var el = event.target = nodeRoute.findNode(event.target);
        event.currentTarget = nodeRoute.findNode(event.currentTarget);
        var values = data.values;
        if (values) {
            for (var p in values) {
                el[p] = values[p];
            }
        }
        event.preventDefault = function () {
            event.defaultPrevented = true;
        };
        can.trigger(event.currentTarget, event);
        postMessage({
            type: 'ack',
            id: data.id,
            defaultPrevented: event.defaultPrevented
        });
    };
});