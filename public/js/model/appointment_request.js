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

	    getAppointmentRequestCount: function($http, $rootScope, broadcastSuccess, broadcastFailed, count){
	    	connection.lock(function(){
	    		get_AppointmentRequestCount($http, $rootScope, broadcastSuccess, broadcastFailed, count);
	    	});
	    }


};

var get_appointmentRequest = function($http, $rootScope, broadcastSuccess, broadcastFailed){
    $http.get('/appointment_requests')
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

var get_AppointmentRequestCount = function($http, $rootScope, broadcastSuccess, broadcastFailed, count){
    $http.get('/appointment_requests/' + count)
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
