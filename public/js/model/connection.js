var freeConnection = true;

connection = {
    isFree: function (f) {
        if (!freeConnection) {
            setTimeout(f, 100);
            return false;
        }
        return true;
    },
    free: function () {
        freeConnection = true;
    }
};