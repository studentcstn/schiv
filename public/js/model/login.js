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
    },
    register: function($http, $rootScope, broadcastSuccess, broadcastFailed, email, password) {
        $http.post('/register',{"email": email, "password": password})
            .then(function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response.data);
            }, function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
            });
    },
    confirmRegistration: function($http){
        $http.put('/register',[token])
            .then(function(response){
                console.log(response);
            }, function(response){
                console.log(response);
            });
    },
    forgotPassword: function($http, $rootScope, broadcastSuccess, broadcastFailed, email) {
        $http.put('/reset', {"email": email})
            .then(function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response.data);
            }, function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
            });
    },
    logOut: function ($http) {
        $http.post('/logout', {})
            .then(function(response){
                console.log(response);
            }, function(response){
                console.log(response);
            });
    }
};