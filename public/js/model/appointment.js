appointment = {
    getAppointments:  function($http, $rootScope, broadcastSuccess, broadcastFailed, user_id){
        $http.get('/appointment')
            .then(function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response.data);
            }, function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
            });
    },

    getLastAppointments: function($http, $rootScope, broadcastSuccess, broadcastFailed, user_id, count){
        $http.get('/appointment/' + count)
            .then(function(response) {
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response.data);
            }, function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
            });
    },

    getLastAppointmentsFromTo: function($http, $rootScope, broadcastSuccess, broadcastFailed, user_id, from, to){
        $http.get('/appointment/' + from + '/' + to)
            .then(function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response.data);
            }, function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
            });
    },

    createAppointment: function($http, $rootScope, broadcastSuccess, broadcastFailed, docent_id, day, time_from, time_to, description){
        $http.post('/appointment',
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
        $http.delete('/appointment/' + appointment_id + '')
            .then(function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response);
            }, function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
            });
    }
};