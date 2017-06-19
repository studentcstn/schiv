schiv_module.controller("navigation_controller", function ($scope) {
    $scope.show_login = true;
    $scope.show_login_btn = true;

    $scope.show_element = function (id) {
        $scope[id] = true;
    };

    $scope.show_elements = function (...ids) {
        for (i = 0; i < ids.length; ++i)
            $scope.show_element(ids[i]);
    };

    $scope.toggle_element = function (id) {
        $scope[id] = !$scope[id];
    };

    $scope.hide_element = function (id) {
        $scope[id] = false;
    };

    $scope.hide_elements = function (...ids) {
        for (i = 0; i < ids.length; ++i)
            $scope.hide_element(ids[i]);
    };
});