login = {
    login: function ($http, $rootScope, broadcastSuccess, broadcastFailed, email, password) {
        $http.post('/login', {email: email, password: password})
            .then(function (response) {
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response.data);
            }, function (response) {
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
            });
    }
};