schiv_module.controller('settings_controller', function($scope, $http){
    $scope.$on("settings", function (event, args) {
        console.log(args);
        $scope.setting();
        console.log("scope: settings");
    });

    $scope.setting = function () {
        $http.get('/' + user_id + '/settings')
            .then(function (response) {
                console.log(response.data);
                work(response.data);
                $scope.user_settings = response.data;
            }, function (response) {
                console.log(response.data);
                $scope.user_settings = {
                    email: "max.muster"
                };
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
    		$http.put('/'+ user_id +'/settings', {"faculties": $scope.faculties, "password": $scope.password, "email": $scope.email}).
    		then(function(response){
    		//success
    		}, function(response){
    			};
    };
    
});