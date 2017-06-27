appointment = {
    getAppointments: function($http, $rootScope, broadcastSuccess, broadcastFailed) {
        connection.lock(function () {
            get_appointments($http, $rootScope, broadcastSuccess, broadcastFailed)
        });
    },

    getLastAppointments: function($http, $rootScope, broadcastSuccess, broadcastFailed){
        connection.lock(function () {
            get_lastAppointments($http, $rootScope, broadcastSuccess, broadcastFailed);
        });
    },

    /*
    getLastAppointmentsFromTo: function($http, $rootScope, broadcastSuccess, broadcastFailed, from, to){
        connection.lock(function () {
            get_lastAppointmentsFromTo($http, $rootScope, broadcastSuccess, broadcastFailed, from, to);
        });
    },*/

    createAppointment: function($http, $rootScope, broadcastSuccess, broadcastFailed, day, time_from, time_to, description){
	time_from = controlTime(time_from);
	time_to = controlTime(time_to);
	if(!day.match("(FRI|MON|S(AT|UN)|T(UE|HU)|WED)")) {
		day = controlDay(day);
		if (!controlDate(day)) {
		    $rootScope.$broadcast(broadcastFailed, {status: 1004, statusText:"wrong date"});
		    return;
		}
	}
	if(description == null || description == ""){
	$rootScope.$broadcast(broadcastFailed, {status: 1005, statusText:"Description must at least have one character"});
	return;
	}
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
            appointments[n].editable = true;
    		for(i = 0; i<appointment_requests.length; ++i){
    			if(appointments[n].id == appointment_requests[i].appointment_id){
    				appointments[n].requests.push(appointment_requests[i]);
    				if (appointment_requests[i].state == 'Accepted')
    				    appointments[n].editable = false;
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

var get_lastAppointments = function($http, $rootScope, broadcastSuccess, broadcastFailed){
    $http.get('/appointments/past')
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

/*
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
*/

var create_appointment = function($http, $rootScope, broadcastSuccess, broadcastFailed, day, time_from, time_to, description){

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
