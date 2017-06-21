schiv_module.controller('settings_controller', function($scope, $http, $rootScope){
    $scope.$on("settings", function (event, args) {
        console.log(args);
        $scope.setting();
        console.log("scope: settings");
    });

    $scope.setting = function () {
        $http.get('/settings')
            .then(function (response) {
                console.log(response.data);
                work(response);
                $scope.user_settings = response.data;
            }, function (response) {
                console.log(response);
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
    
    $scope.saveSettings = function(){
        $http.put('/settings', {
                "faculties": $scope.user_settings.faculties,
                "password": $scope.user_settings.password,
                "email": $scope.user_settings.email
        }).then(function(response){
            console.log(response);
        }, function(response){
            console.log(response);
        });
    };
    
});