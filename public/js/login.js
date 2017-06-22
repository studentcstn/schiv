login = {
    login: function ($http, email, password) {
        $http.post('/login', {email: email, password: password})
            .then(function (response) {
                console.log(response);
                return response;
                //user_id = $scope.user.email;
                //$rootScope.$broadcast("login_success", response.data);
                //$rootScope.$broadcast("alert", "success", "Welcome " + user_id + " to Schiv");
            }, function (response) {
                console.log(response);
                return null;
            });
    }
};