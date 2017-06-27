controlDate = function (date) {
    var d = date.split("-");
    var leapYear = false;

    if ((d[0]%4 == 0 && !d[0]%100 == 0) || d[0]%400 == 0)
        leapYear = true;

    if (leapYear && d[1] == 2 && d[2] <= 29)
        return true;
    if (!leapYear && d[1] == 2 && d[2] <= 28)
        return true;
    if ((d[1] == 1 || d[1] == 3 || d[1] == 5 || d[1] == 7 || d[1] == 8 || d[1] == 10 || d[1] == 12 && d[2]) <= 31)
        return true;
    if ((d[1] == 4 || d[1] == 6 || d[1] == 9 || d[1] == 11) && d[2] <= 30)
        return true;
    return false;
};

controlTime = function(time) {
    if (time.length < 5)
        time = "0"+time;
    return time + ":00";
};

controlDay = function (day) {
    var d = day.split('.');
    if (d[2].length < 4)
        d[2] = "20"+d[2];
    if (d[1].length < 2)
        d[1] = "0"+d[1];
    if (d[0].length < 2)
        d[0] = "0"+d[0];
    return d[2] + "-" + d[1] + "-" + d[0];
};
