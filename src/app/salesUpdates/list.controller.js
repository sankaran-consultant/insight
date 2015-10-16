(function() {
  'use strict';

  angular
    .module('insight')
    .controller('SalesUpdatesController', SalesUpdatesController);

  /** @ngInject */
  function SalesUpdatesController ( $scope, $state, $controller, $modal, SalesUpdates ) {
    
    var _this = this;
    var baseCtrl = $controller('BaseController', {$scope:$scope, service: SalesUpdates});
    

    _this.openCreateModal = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/salesUpdates/create.modal.html',
        controller : 'NewSalesUpdateModalController',
        size: size
      });
      
      modalInstance.result.then(function (id) {
        _this.edit(id);
      }, function () {
          // DO NOTHING
      });
    };
    
    _this.edit = function (id) {
      $state.go('editSalesUpdate', {id:id});
    };

    // Mixin BaseController
    angular.extend(this, baseCtrl);

    $scope.openCreateModal  = _this.openCreateModal;
    $scope.edit          = _this.edit;
    
    // query the service for records
    _this.query({page:1});
  }
})();
