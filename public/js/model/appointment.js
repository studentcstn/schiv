appointment = {
    getAppointments: function ($http, $rootScope, broadcastSuccess, broadcastFailed) {
        connection.lock(function () {
            get_appointments($http, $rootScope, broadcastSuccess, broadcastFailed)
        });
    },

    getLastAppointments: function($http, $rootScope, broadcastSuccess, broadcastFailed, count){
        $http.get('/appointments/' + count)
            .then(function(response) {
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response.data);
            }, function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
            });
    },

    getLastAppointmentsFromTo: function($http, $rootScope, broadcastSuccess, broadcastFailed, from, to){
        $http.get('/appointments/' + from + '/' + to)
            .then(function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response.data);
            }, function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
            });
    },

    createAppointment: function($http, $rootScope, broadcastSuccess, broadcastFailed, day, time_from, time_to, description){
        $http.post('/appointments',
                {"day": day,"time_from": time_from, "time_to": time_to, "desription": description})
            .then(function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response);
            }, function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
            });
    },
    deleteAppointment: function($http, $rootScope, broadcastSuccess, broadcastFailed, appointment_id){
        $http.delete('/appointments/' + appointment_id + '')
            .then(function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response);
            }, function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
            });
    },

    merge_appointments: function (appointments, appointment_requests) {
    	for(n = 0; n<appointments.length; ++i){
    		//appointment_requests_loop = [];
    		//counter = 0;
    		for(i = 0; i<appointment_requests.length; ++i){
    		//if(appointments[n].id == appointment_requests[i].appointment_id){
    		//	appointment_request_loop[counter] = appointment_request[i];
    		//	counter++;
    		//}
    		}
    		//appointments[n].appointment_requests = appointment_requests_loop
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