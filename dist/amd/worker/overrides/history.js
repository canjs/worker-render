/*worker-render@1.2.0#worker/overrides/history*/
define(function (require, exports, module) {
    var Location = require('micro-location');
    var extend = require('../../simple_extend');
    module.exports = function () {
        var history = window.history;
        var pushState = history.pushState;
        history.pushState = function (stateObject, title, url) {
            setLocation(url);
            return pushState.apply(this, arguments);
        };
    };
    function setLocation(url) {
        var location = window.location;
        var newLocation = Location.parse(url);
        if (!newLocation.host) {
            newLocation.host = location.host;
            newLocation.hostname = location.hostname;
            newLocation.protocol = location.protocol;
        }
        extend(location, newLocation);
    }
});