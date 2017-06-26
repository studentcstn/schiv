appointment_request = {
		
    getAppointmentRequest: function($http, $rootScope, broadcastSuccess, broadcastFailed){
        connection.lock(function () {
            get_appointmentRequest($http, $rootScope, broadcastSuccess, broadcastFailed);
        });
    },

    acceptAppointmentRequest: function($http, $rootScope, broadcastSuccess, broadcastFailed, id, state){
        connection.lock(function(){
            accept_AppointmentRequest($http, $rootScope, broadcastSuccess, broadcastFailed, id, state);
        });
    },

    declineAppointmentRequest: function($http, $rootScope, broadcastSuccess, broadcastFailed, appointment_request_id){
        connection.lock(function(){
            decline_AppointmentRequest($http, $rootScope, broadcastSuccess, broadcastFailed, appointment_request_id);
        });
    },

    createAppointmentRequest: function($http, $rootScope, broadcastSuccess, broadcastFailed, description, subject, appointment_id, date){
        connection.lock(function(){
            create_AppointmentRequest($http, $rootScope, broadcastSuccess, broadcastFailed, description, subject, appointment_id, date);
        });
    },

    getLastAppointmentRequest: function($http, $rootScope, broadcastSuccess, broadcastFailed, count){
        connection.lock(function(){
            get_LastAppointmentRequest($http, $rootScope, broadcastSuccess, broadcastFailed, count);
        });
    },


    prepareEditAppointment: function (data) {
        var time_from = data.time_from.split(':');
        time_from = time_from[0] * 60 + time_from[1] * 1;
        var time_to = data.time_to.split(':');
        time_to = time_to[0] * 60 + time_to[1] * 1;
        data.time = time_to - time_from;
        for (var i = 0; i < data.requests.length; ++i) {
            if (data.requests[i].duration_in_min != null)
                data.time -= data.requests[i].duration_in_min;
        }
    }


};

var get_appointmentRequest = function($http, $rootScope, broadcastSuccess, broadcastFailed){
    $http.get('/appointment_requests')
        .then(function(response){
            connection.free();
            for (var i = 0; i < response.data.length; ++i)
                response.data[i].editable = true;
            console.log(response);
            $rootScope.$broadcast(broadcastSuccess, response.data);
        }, function(response){
            connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastFailed, response);

            //todo remove
            response.data = [{"id":"1","description":"dies ist eine Testanfrage","subject":"\u00fcber das m\u00f6chte ich reden","duration_in_min":"30","appointment_at":null,"requested_at":"2017-07-25 17:30:34","state":"Idle","account_id":"2","appointment_id":"1","created_at":null,"updated_at":null},{"id":"2","description":"dies ist auch eine Testanfrage","subject":"\u00fcber das m\u00f6chte ich nicht reden","duration_in_min":"30","appointment_at":null,"requested_at":"2017-07-23 22:30:34","state":"Idle","account_id":"2","appointment_id":"2","created_at":null,"updated_at":null}];
            console.log(response);
            $rootScope.$broadcast(broadcastSuccess, response.data);
        });
};

var accept_AppointmentRequest = function($http, $rootScope, broadcastSuccess, broadcastFailed, id, state){
    $http.put('/appointment_requests', {"id": id, "state": state})
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

var decline_AppointmentRequest = function($http, $rootScope, broadcastSuccess, broadcastFailed, appointment_request_id){
    $http.delete('/appointment_requests/' + appointment_request_id)
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

var create_AppointmentRequest = function($http, $rootScope, broadcastSuccess, broadcastFailed, description, subject, appointment_id, date){
    $http.post('/appointment_requests',{"description": description, "subject": subject, "appointment_id": appointment_id, "date": date})
        .then(function(response){
            connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastSuccess, response);
        }, function(response) {
            connection.free();
            console.log(response);
            $rootScope.$broadcast(broadcastFailed, response);
        });
};

var get_LastAppointmentRequest = function($http, $rootScope, broadcastSuccess, broadcastFailed){
    $http.get('/appointment_requests/past')
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
