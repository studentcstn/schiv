appointment = {
    getAppointments:  function($http, $rootScope, broadcastSuccess, broadcastFailed, user_id){
        $http.get('/appointments')
            .then(function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response.data);
            }, function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
            });
    },

    getLastAppointments: function($http, $rootScope, broadcastSuccess, broadcastFailed, user_id, count){
        $http.get('/appointments/' + count)
            .then(function(response) {
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response.data);
            }, function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
            });
    },

    getLastAppointmentsFromTo: function($http, $rootScope, broadcastSuccess, broadcastFailed, user_id, from, to){
        $http.get('/appointments/' + from + '/' + to)
            .then(function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response.data);
            }, function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
            });
    },

    createAppointment: function($http, $rootScope, broadcastSuccess, broadcastFailed, docent_id, day, time_from, time_to, description){
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
    deleteAppointment: function($http, $rootScope, broadcastSuccess, broadcastFailed, docent_id, appointment_id){
        $http.delete('/appointments/' + appointment_id + '')
            .then(function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response);
            }, function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
            });
    }
};