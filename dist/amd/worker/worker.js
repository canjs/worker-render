/*worker-render@1.2.0#worker/worker*/
define(function (require, exports, module) {
    var handlers = require('./handlers/handlers');
    var patch = require('dom-patch');
    var overrides = [require('./overrides/history')];
    exports.ready = function (render) {
        var initial = handlers.initial;
        handlers.initial = function () {
            var afterPatch = initial.apply(this, arguments);
            patch(document, function (patches) {
                postMessage(patches);
            });
            overrides.forEach(function (fn) {
                fn(document);
            });
            afterPatch();
            render();
        };
    };
    onmessage = function (ev) {
        var data = ev.data;
        if (Array.isArray(data)) {
            data.forEach(runHandler);
        } else {
            runHandler(data);
        }
    };
    function runHandler(data) {
        var handler = handlers[data.type];
        if (handler) {
            handler(data);
        } else {
            console.warn('No handler for', data.type);
        }
    }
    postMessage('start');
});