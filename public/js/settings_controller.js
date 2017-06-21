schiv_module.controller('settings_controller', function($scope, $http){
    $scope.on("settings", function () {
        $scope.setting();
    });

    $scope.setting = function () {
        $http.get('/' + user_id + '/settings')
            .then(function (response) {
                console.log(response.data);
                work(response.data);
                $scope.user_settings = response.data;
            }, function (response) {
                console.log(response.data);
                $rootScope.$brodcast("user_settings", {
                    email: "max.muster"
                });
            });
    };

    work = function (user_settings) {
        var account_faculties = user_settings.account_faculties;
        var faculties = user_settings.faculties;
        for (var i = 0; i < faculties.length; ++i) {
            for (var j = 0; j < account_faculties.length; ++j) {
                if (faculties[i].id === account_faculties[j].id) {
                    faculties[i].is_active = true;
                    break;
                } else {
                    faculties[i].is_active = false;
                }
            }
        }
    };
    
    $scope.saveSettings = function($scope, $http){
    	//	$http.put('/'+ user_id +'/settings', [faculties, password, email]).
    	//	then(function(response){
    	//	success
    	//	}, function(response){
    	//		failed
    	//		};
    }
    
});