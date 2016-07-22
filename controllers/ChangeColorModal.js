function ChangeColorModal($scope, $uibModalInstance, rowData) {
    $scope.data = rowData;

    $scope.redValue = '125';
    $scope.greenValue = '125';
    $scope.blueValue = '125';
    
    $scope.newColor = $scope.redValue + "," + $scope.greenValue + "," + $scope.blueValue;
    
    $scope.updateColor = function(redValue,greenValue, blueValue){
        $scope.newColor = redValue + "," + greenValue + "," + blueValue;
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.newColor);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
};