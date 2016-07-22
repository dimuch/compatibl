function ResultCtrl( $scope, httpSrv,  $uibModal) {
   httpSrv.get('data/data.json')
       .then(function (data) {
          $scope.data = data;
          $scope.headerkeys = Object.keys($scope.data[0]);
       });

   $scope.updateTable = function (index, data, addDelete) {
      var newRow;
      if (addDelete) {
         newRow = {
            colorName: data.colorName,
            hexValue: data.hexValue
         };
         $scope.data.splice(index, 0, newRow);
         return false;
      }
      $scope.data.splice(index, 1);

   };
   $scope.updateColor = function (data) {
      var modalInstance = $uibModal.open({
         templateUrl: 'templates/changeColorModal.html',
         controller: 'ChangeColorModal',
         resolve: {
            rowData: function () {
               return data;
            }
         }
      });

      modalInstance.result.then(function (rowData) {
         var rgbColors = rowData.split(",");
         var result = rgbColors.map(function(item){
            item = parseInt(item).toString(16);
            return (item.length==1) ? "0" + item : item;
         });
         data.hexValue = "#" + result.join("");
         data.colorName = "custom color"
      }, function () {
         alert("Color does not changed")
      });

   }
};