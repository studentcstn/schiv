schiv_module.controller('request_controller', function($scope, $http, $rootScope) {


    $scope.$on('show_inscribe', function (event, data) {
        $scope.docent = data;
        $rootScope.$broadcast("show", "show_appointment_request");
    });

    $scope.inscribe_close = function () {
        $rootScope.$broadcast("hide", "show_appointment_request");
    };
});