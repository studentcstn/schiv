appointment_request = {
		
    getAppointmentRequest: function($http, $rootScope, broadcastSuccess, broadcastFailed){
        connection.lock(function () {
            get_appointmentRequest($http, $rootScope, broadcastSuccess, broadcastFailed);
        });
    },

    acceptAppointmentRequest: function($http, $rootScope, broadcastSuccess, broadcastFailed, id, state, time){
        if(!(state == "Accepted" || state == "Declined")){
            console.log("The change of state " + state + " is not excepted");
            return;
        }
        if(time < 0){
            $rootScope.$broadcast(broadcastFailed, {status:1008, statusText: "Time of zero is not excepted"});
            return;
        }
        connection.lock(function(){
            accept_AppointmentRequest($http, $rootScope, broadcastSuccess, broadcastFailed, id, state, time);
        });
    },

    declineAppointmentRequest: function($http, $rootScope, broadcastSuccess, broadcastFailed, appointment_request_id){
        connection.lock(function(){
            decline_AppointmentRequest($http, $rootScope, broadcastSuccess, broadcastFailed, appointment_request_id);
        });
    },

    createAppointmentRequest: function($http, $rootScope, broadcastSuccess, broadcastFailed, description, subject, appointment_id, date){
        if(subject == ""){
            $rootScope.$broadcast(broadcastFailed, {status:1009, statusText: "Subject is empty Error"});
            return;
        }
        if(description == ""){
            $rootScope.$broadcast(broadcastFailed, {status:1005, statusText: "Description is empty Error"});
            return;
        }
        if(!controlDate(date)){
            $rootScope.$broadcast(broadcastFailed, {status:1004, statusText: "Error in date"});
            return;
        }
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
            $rootScope.$broadcast(broadcastSuccess, response.data);
        }, function(response){
            connection.free();
            $rootScope.$broadcast(broadcastFailed, response);
        });
};

var accept_AppointmentRequest = function($http, $rootScope, broadcastSuccess, broadcastFailed, id, state, time){
    $http.put('/appointment_requests', {"id": id, "state": state, "duration_in_min": time})
    .then(function(response){
        connection.free();
        $rootScope.$broadcast(broadcastSuccess, response);
    }, function(response){
        connection.free();
        $rootScope.$broadcast(broadcastFailed, response);
    });
};

var decline_AppointmentRequest = function($http, $rootScope, broadcastSuccess, broadcastFailed, appointment_request_id){
    $http.delete('/appointment_requests/' + appointment_request_id)
        .then(function(response){
            connection.free();
            $rootScope.$broadcast(broadcastSuccess, response);
        }, function(response){
            connection.free();
            $rootScope.$broadcast(broadcastFailed, response);
        });
};

var create_AppointmentRequest = function($http, $rootScope, broadcastSuccess, broadcastFailed, description, subject, appointment_id, date){
    $http.post('/appointment_requests',{"description": description, "subject": subject, "appointment_id": appointment_id, "date": date})
        .then(function(response){
            connection.free();
            $rootScope.$broadcast(broadcastSuccess, response);
        }, function(response) {
            connection.free();
            $rootScope.$broadcast(broadcastFailed, response);
        });
};

var get_LastAppointmentRequest = function($http, $rootScope, broadcastSuccess, broadcastFailed){
    $http.get('/appointment_requests/past')
        .then(function(response){
            connection.free();
            $rootScope.$broadcast(broadcastSuccess, response.data);
        }, function(response){
            connection.free();
            $rootScope.$broadcast(broadcastFailed, response);
        });
};
