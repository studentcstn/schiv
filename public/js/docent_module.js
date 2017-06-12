var module_docent = angular.module('docent_list', []);

 module_docent.controller('docent_list_controller', function($scope, $http) {
	//	$http.get('http://localhost/docents').
	//	then(function(response) {
	//	$scope.list = response.data;	
	//	});
		
		$scope.list = [
			{id: 2, email: "hallo@hof-unversity.de", 
			type: "Dozent", active: true},

			{id: 5, email: "ciao@hof-unversity.de", 
			type: "Dozent", active: true},

			{id: 3, email: "thorsten@hof-unversity.de", 
			type: "Dozent", active: true}
		]
});

 module_docent.controller('single_docent_controller', function($scope, $http) {
	//	$http.get('http://localhost/docent/{id}').
	//	then(function(response) {
	//	$scope.docent = response.data;	
	//	});

		$scope.docent = {
			id: 42, email: "sonstwo@hof-university.de",
			 appointments: [
					{id: 1, description: "ich hab hunger"},
					{id: 2, description: "ich auch"}
				       ]			
		}
}); 
