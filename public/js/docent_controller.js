schiv_module.controller('docent_list_controller', function($scope, $http) {
	//	$http.get('http://localhost/docents').
	//	then(function(response) {
	//	$scope.list = response.data; //success	
	//	}, function(response){
	//		failed;	
	//		});

	$scope.list = [
		{id: 2, email: "hallo@hof-unversity.de",
		type: "Docent", active: true, faculty: "wirtschaft"},

		{id: 5, email: "ciao@hof-unversity.de",
		type: "Docent", active: true, faculty: "wirtschaft"},

		{id: 3, email: "thorsten@hof-unversity.de",
		type: "Docent", active: true, faculty: "wirtschaft"}
	];
});

schiv_module.controller('single_docent_controller', function($scope, $http) {
	//	$http.get('http://localhost/docent/{id}').
	//	then(function(response) {
	//	$scope.docent = response.data;	
	//	}, function(response){
	//		failed;	
	//		});

	$scope.docent = {
		id: 42,
		email: "sonstwo@hof-university.de",
		appointments: [
			{id: 1, description: "ich hab hunger"},
			{id: 2, description: "ich auch"}
		]
	};
});
