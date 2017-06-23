appointmentment_request = {
		acceptAppointmentRequest: function($http, $rootScope, broadcastSuccess, broadcastFailed, id, state){
	        $http.put('/appointment_request', {"id": id, "state": state})
	        .then(function(response){
	        	console.log(response);
	        	$rootScope.$broadcast(broadcastSuccess, response);
	        }, function(response){
	        	console.log(response);
	        	$rootScope.$broadcast(broadcastFailed, response);
	        });
		},
		
		declineAppointmentRequest: function($http, $rootScope, broadcastSuccess, broadcastFailed, appointment_request_id){
	        $http.delete('/appointment_request/' + appointment_request_id)
	            .then(function(response){
	            	console.log(response);
	            	$rootScope.$broadcast(broadcastSuccess, response);
	            }, function(response){
	            	console.log(response);
	            	$rootScope.$broadcast(broadcastFailed, response);
	            });
		},
		
		createAppointmentRequest: function($http, $rootScope, broadcastSuccess, broadcastFailed, description, subject, duration_in_min, request_at, appointment_id){
	        $http.post('/appointment_request',{"description": description, "subject": subject, "duration_in_min": duration_in_min, 
	        			"request_at": request_at,  "appointment_id": appointment_id})
	            .then(function(response){
	            	console.log(response);
	            	$rootScope.$broadcast(broadcastSuccess, response);
	            }, function(response) {
	            	console.log(response);
	            	$rootScope.$broadcast(broadcastFailed, response);
	            });
		}
}