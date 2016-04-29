/*worker-render@1.2.2#worker/overrides/history*/
var Location = require('micro-location');
var extend = require('../../simple_extend.js');
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