var waitConnections = [];
var working = false;

connection = {
    lock: function (f) {
        if (!working) {
            working = true;
            f();
            return;
        }
        waitConnections.push(f);
    },
    free: function () {
        if (waitConnections.length > 0) {
            waitConnections.shift()();
            return;
        }
        working = false;
    }
};