/*worker-render@1.2.0#simple_extend*/
define(function (require, exports, module) {
    module.exports = extend;
    function extend(a, b) {
        var p, type;
        for (p in b) {
            type = typeof b[p];
            if (type !== 'object' && type !== 'function') {
                a[p] = b[p];
            }
        }
        return a;
    }
});