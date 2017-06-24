appointment_request = {
    acceptAppointmentRequest: function($http, $rootScope, broadcastSuccess, broadcastFailed, id, state){
        $http.put('/appointment_requests', {"id": id, "state": state})
        .then(function(response){
            console.log(response);
            $rootScope.$broadcast(broadcastSuccess, response);
        }, function(response){
            console.log(response);
            $rootScope.$broadcast(broadcastFailed, response);
        });
    },

    declineAppointmentRequest: function($http, $rootScope, broadcastSuccess, broadcastFailed, appointment_request_id){
        $http.delete('/appointment_requests/' + appointment_request_id)
            .then(function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response);
            }, function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
            });
    },

    createAppointmentRequest: function($http, $rootScope, broadcastSuccess, broadcastFailed, description, subject, appointment_id, date){
        $http.post('/appointment_requests',{"description": description, "subject": subject, "appointment_id": appointment_id, "date": date})
            .then(function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response);
            }, function(response) {
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
            });
    },

    getAppointmentRequest: function($http, $rootScope, broadcastSuccess, broadcastFailed){
        $http.get('appointment_requests')
            .then(function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response.data);
            }, function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
            });
    },
    getAppointmentRequestCount: function($http, $rootScope, broadcastSuccess, broadcastFailed, count){
        $http.get('appointment_requests/' + count)
            .then(function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response.data);
            }, function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
            });
    }
}