angular
.module('dtg')
.controller('locationsShowController', LocationsShowController);

LocationsShowController.$inject = ["Location", "$stateParams", "$http"]
function LocationsShowController(Location, $stateParams, $http){
  var vm = this;
  vm.match = match;
  
  console.log($stateParams.id);

  Location.get({ id: $stateParams.id }).$promise.then(function(response){
    console.log(response);
    vm.users = response.users;
  })
  
  function match(user_id){
    $http.get(user_id).then(function match(res){
      self.all.push(res.data);
    });
  }
}