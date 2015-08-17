/*worker-render@1.1.8#simple_extend*/
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