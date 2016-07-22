angular.module('myapp').directive('coloredcell', function() {
    return {
        replace: true,
        scope: {
            data: "=",
            headerkeys: "="
        },
        controller: 'ResultCtrl',
        templateUrl: 'directives/coloredCellTable/coloredCell.html'
    }
});