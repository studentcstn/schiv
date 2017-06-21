schiv_module.controller('appointment_request_controller', function($scope, $http, $rootScope) {
	$scope.acceptAppointmentRequest = function(){
        $http.put('/' + docent_id + '/appointment_request', {"id": $scope.id, "state": $scope.state})
        .then(function(response){
            //success
        }, function(response){

        });
	};
	
	$scope.declineAppointmentRequest = function(){
        $http.delete('/' + user_id + '/appointment_request/' + 'appointment_request_id')
            .then(function(response){
                //success
            }, function(response){

            });
	};
	
	$scope.createAppointmentRequest = function(){
        $http.post('/' + user_id + '/appointment_request',{"description": $scope.description,
            "subject": $scope.subject, "duration_in_min": $scope.duration_in_min, "request_at": $scope.request_at,
            "appointment_id": $scope.appointment_id})
            .then(function(response){
                //success
            }, function(response) {

            });
	};

	$scope.$on('show_inscribe', function (event, data) {
	    $scope.docent = data;
    });

	$scope.inscribe_close = function () {
	    $rootScope.$broadcast('show_inscribe_close');
    };
});