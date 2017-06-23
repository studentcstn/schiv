settings = {
    getSettings: function ($http, $rootScope, broadcastSuccess, broadcastFailed) {
        $http.get('/settings')
        .then(function (response) {
            console.log(response.data);
            //work(response.data);
            $rootScope.$broadcast(broadcastSuccess, response.data);
        }, function (response) {
            console.log(response);
            $rootScope.$broadcast(broadcastFailed, response);
        });
    },
    saveSettings: function($http, $rootScope, broadcastSuccess, broadcastFailed){
        $http.put('/settings', {
            "faculties": $scope.user_settings.faculties,
            "password": $scope.user_settings.password,
            "email": $scope.user_settings.email
        }).then(function(response){
            console.log(response);
            $rootScope.$broadcast(broadcastSuccess, response.data);
        }, function(response){
            console.log(response);
            $rootScope.$broadcast(broadcastFailed, response);
        });
    }
};

var work = function (user_settings) {
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