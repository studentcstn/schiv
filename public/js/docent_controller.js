schiv_module.controller('docent_controller', function($scope, $http) {
	$scope.getDocentList = function($scope, $http){
			$http.get('/docents').
			then(function(response) {
			$scope.list = response.data; //success	
			}, function(response){	
				});

//		$scope.list = [
//			{id: 2, email: "hallo@hof-unversity.de",
//			type: "Docent", active: true, faculty: "wirtschaft"},
//
//			{id: 5, email: "ciao@hof-unversity.de",
//			type: "Docent", active: true, faculty: "wirtschaft"},
//
//			{id: 3, email: "thorsten@hof-unversity.de",
//			type: "Docent", active: true, faculty: "wirtschaft"}
//		];
	}
	
	$scope.getSingleDocent = function($scope, $http){
			$http.get('/docents/' + docent_id + '').
			then(function(response) {
			$scope.docent = response.data;	
			}, function(response){
				});

//		$scope.docent = {
//			id: 42,
//			email: "sonstwo@hof-university.de",
//			appointments: [
//				{id: 1, description: "ich hab hunger"},
//				{id: 2, description: "ich auch"}
//			]
//		};
	}
}
