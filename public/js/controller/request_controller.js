schiv_module.controller('request_controller', function($scope, $http, $rootScope) {


    $scope.$on('show_inscribe', function (event, data) {
        $scope.docent = data;
    });

    $scope.inscribe_close = function () {
        $rootScope.$broadcast('show_inscribe_close');
    };
});