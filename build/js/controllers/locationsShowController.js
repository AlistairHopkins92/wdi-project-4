angular
.module('dtg')
.controller('locationsShowController', LocationsShowController);

LocationsShowController.$inject = ["Location", "$stateParams"]
function LocationsShowController(Location, $stateParams){
  var vm = this;
  vm.eyes = eyes;
  
  console.log($stateParams.id);

  Location.get({ id: $stateParams.id }).$promise.then(function(response){
    console.log(response);
    vm.users = response.users;
  })
  
  function eyes(user_id){
    console.log(user_id)
  }
}