angular
.module('dtg')
.controller('locationsShowController', LocationsShowController);

LocationsShowController.$inject = ["Location", "$stateParams"]
function LocationsShowController(Location, $stateParams){
  var vm = this;
  
  console.log($stateParams.id);

  Location.get({ id: $stateParams.id }).$promise.then(function(response){
    console.log(response);
    vm.users = response.users;
  })
}