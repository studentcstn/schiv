login = {
    login: function ($http, $rootScope, broadcastSuccess, broadcastFailed, email, password) {
        $http.put('/login', {email: email, password: password})
            .then(function (response) {
                console.log(response);
                var d = response.data.account;
                d.email = d.email.substring(0, d.email.indexOf('@'));
                d.name = d.email.substring(0, d.email.indexOf('.'));
                d.last = d.email.substring(d.email.indexOf('.')+1);
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
    confirmRegistration: function($http, $rootScope, broadcastSuccess, broadcastFailed, token){
        $http.put('/register', {token: token})
            .then(function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response.data);
            }, function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
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
    logout: function ($http, $rootScope, broadcastSuccess, broadcastFailed) {
        $http.put('/logout', {})
            .then(function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastSuccess, response.data);
            }, function(response){
                console.log(response);
                $rootScope.$broadcast(broadcastFailed, response);
            });
    }
};