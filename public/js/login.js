login = {
    login: function ($http, $rootScope, broadcast, email, password) {
        $http.post('/login', {email: email, password: password})
            .then(function (response) {
                console.log(response);
                //user_id = $scope.user.email;
                $rootScope.$broadcast(broadcast, response);
                //$rootScope.$broadcast("alert", "success", "Welcome " + user_id + " to Schiv");
            }, function (response) {
                console.log(response);
                return null;
            });
    }
};