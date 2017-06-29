appointment_id = [];
appointment_success = {success: true};
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
        var appointment = {};
        appointment.time_from = controlTime(time_from);
        appointment.time_to = controlTime(time_to);
        if(!day.match("(FRI|MON|S(AT|UN)|T(UE|HU)|WED)")) {
            appointment.weekday = "NULL";
            appointment.date = rebuildDate(day);
            if (!controlDate(appointment.date)) {
                $rootScope.$broadcast(broadcastFailed, {status: 1004, statusText:"wrong date"});
                return;
            }
        } else {
            appointment.weekday = day;
            var d = new Date();
            d = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
            appointment.date = rebuildDate(d);
        }

        if(description == null || description == ""){
            $rootScope.$broadcast(broadcastFailed, {status: 1005, statusText:"Description must at least have one character"});
            return;
        }
        appointment.description = description;

        connection.lock(function () {
           create_appointment($http, $rootScope, broadcastSuccess, broadcastFailed, appointment) ;
        });

    },

    deleteAppointment: function($http, $rootScope, broadcastSuccess, broadcastFailed, appointment){
        if (appointment.delete && appointment.appointments != null) {
            for (var i = 0; i < appointment.appointments.length; ++i)
                appointment.appointments[i].delete = true;
        }

        if (appointment.appointments != null) {
            for (var i = 0; i < appointment.appointments.length; ++i) {
                if (appointment.appointments[i].delete) {
                    appointment_id.push(appointment.appointments.id);

                    connection.lock(function () {
                        delete_appointment($http, appointment_success, appointment_id.shift());
                    });

                    appointment.appointments.splice(i, 1);
                    --i;
                }
            }
        }

        if ((appointment.appointments == null || appointment.appointments.length == 0) && appointment.delete) {
            appointment_id.push(appointment.id);

            connection.lock(function () {
                delete_appointment($http, appointment_success, appointment_id.shift());
            });
        }

        connection.lock(function () {
            connection.free();
            if (appointment_success.success) {
                $rootScope.$broadcast(broadcastSuccess);
            } else {
                $rootScope.$broadcast(broadcastFailed);
            }
        });
    },

    merge_appointments: function(appointments, appointment_requests) {
    	for(var n = 0; n<appointments.length; ++n){
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

    	appointment.sort_appointment(appointments);
    },
    sort_appointment: function (appointments) {
        for (var i = 1; i < appointments.length; ++i) {
            if (appointments[i].requests.length == 0) {
                var n = i -1;
                if (appointments[n].requests.length == 0 && appointments[n].parent_id == appointments[i].parent_id) {
                    appointments[n].date_to = appointments[i].date;
                    if (appointments[n].appointments == null)
                        appointments[n].appointments = [];
                    appointments[n].appointments.push(appointments[i]);
                    appointments.splice(i, 1);
                    --i;
                }
            }
        }

        appointments.sort(function (a, b) {
            var i = a.date.localeCompare(b.date);
            if (i == 0) {
                i = a.time_from.localeCompare(b.time_from);
                if (i == 0)
                    i = a.time_to.localeCompare(b.time_to);
            }
            return i;
        });
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

var create_appointment = function($http, $rootScope, broadcastSuccess, broadcastFailed, appointment){

    $http.post('/appointments', appointment)
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




var delete_appointment = function($http, success, appointment_id){
    $http.delete('/appointments/' + appointment_id + '')
        .then(function(response){
            connection.free();
            console.log(response);
        }, function(response){
            connection.free();
            console.log(response);
            success.success = false;
        });
};
