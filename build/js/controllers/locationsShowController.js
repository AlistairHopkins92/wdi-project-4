angular
.module('dtg')
.controller('locationsShowController', LocationsShowController);

LocationsShowController.$inject = ["Location", "$stateParams", "$http", "$scope"]
function LocationsShowController(Location, $stateParams, $http, $scope){
  var vm = this;
  vm.eyes = eyes;
  
  console.log($stateParams.id);

  Location.get({ id: $stateParams.id }).$promise.then(function(response){
    console.log(response);
    vm.users = response.users;
  })
  
  function eyes(user_id){
    console.log($scope.$parent.users.currentUser._id)
    
  }
}