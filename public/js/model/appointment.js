appointment = {
    getAppointments: function($http, $rootScope, broadcastSuccess, broadcastFailed) {
        connection.lock(function () {
            get_appointments($http, $rootScope, broadcastSuccess, broadcastFailed)
        });
    },

    getLastAppointments: function($http, $rootScope, broadcastSuccess, broadcastFailed, count){
        connection.lock(function () {
            get_lastAppointments($http, $rootScope, broadcastSuccess, broadcastFailed, count);
        });
    },

    getLastAppointmentsFromTo: function($http, $rootScope, broadcastSuccess, broadcastFailed, from, to){
        connection.lock(function () {
            get_lastAppointmentsFromTo($http, $rootScope, broadcastSuccess, broadcastFailed, from, to);
        });
    },

    createAppointment: function($http, $rootScope, broadcastSuccess, broadcastFailed, day, time_from, time_to, description){
        connection.lock(function () {
           create_appointment($http, $rootScope, broadcastSuccess, broadcastFailed, day, time_from, time_to, description) ;
        });
    },

    deleteAppointment: function($http, $rootScope, broadcastSuccess, broadcastFailed, appointment_id){
        connection.lock(function () {
           delete_appointment($http, $rootScope, broadcastSuccess, broadcastFailed, appointment_id);
        });
    },

    merge_appointments: function(appointments, appointment_requests) {
    	for(n = 0; n<appointments.length; ++n){
            appointments[n].requests = [];
    		for(i = 0; i<appointment_requests.length; ++i){
    			if(appointments[n].id == appointment_requests[i].appointment_id){
    				appointments[n].requests.push(appointment_requests[i]);			
    			}
    		}
    	}
    }
};

var get_appointments = function($http, $rootScope, broadcastSuccess, broadcastFailed){
    $http.get('/appointments')
        .then(function (response) {
            connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastSuccess, response.data);
        }, function (response) {
            connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastFailed, response);
        });
};

var get_lastAppointments = function($http, $rootScope, broadcastSuccess, broadcastFailed, count){
    $http.get('/appointments/' + count)
        .then(function(response) {
            connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastSuccess, response.data);
        }, function(response){
            connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastFailed, response);
        });
};

var get_lastAppointmentsFromTo = function($http, $rootScope, broadcastSuccess, broadcastFailed, from, to){
    $http.get('/appointments/' + from + '/' + to)
        .then(function(response){
            connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastSuccess, response.data);
        }, function(response){
            connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastFailed, response);
        });
};

var create_appointment = function($http, $rootScope, broadcastSuccess, broadcastFailed, day, time_from, time_to, description){
    time_from = controlTime(time_from);
    time_to = controlTime(time_to);
    if(!day.match("(FRI|MON|S(AT|UN)|T(UE|HU)|WED)")) {
        day = controlDay(day);
        if (!controlDate(day)) {
            $rootScope.$broadcast(broadcastFailed, "wrong date");
            return;
        }
    }
    $http.post('/appointments',
        {"day": day,"time_from": time_from, "time_to": time_to, "description": description})
        .then(function(response){
            connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastSuccess, response);
        }, function(response){
            connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastFailed, response);
        });
};

var controlTime = function(time) {
    if (time.length < 5)
        time = "0"+time;
    return time + ":00";
};

var controlDay = function (day) {
    var d = day.split('.');
    if (d[2].length < 4)
        d[2] = "20"+d[2];
    if (d[1].length < 2)
        d[1] = "0"+d[1];
    if (d[0].length < 2)
        d[0] = "0"+d[0];
    return d[2] + "-" + d[1] + "-" + d[0];
};

var controlDate = function (date) {
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

var delete_appointment = function($http, $rootScope, broadcastSuccess, broadcastFailed, appointment_id){
    $http.delete('/appointments/' + appointment_id + '')
        .then(function(response){
            connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastSuccess, response);
        }, function(response){
            connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastFailed, response);
        });
};