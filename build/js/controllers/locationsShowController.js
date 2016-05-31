angular
.module('dtg')
.controller('locationsShowController', LocationsShowController);

LocationsShowController.$inject = ["Location", "$stateParams", "$http", "$scope", "User"]
function LocationsShowController(Location, $stateParams, $http, $scope, User){
  var vm = this;
  vm.eyes = eyes;
  vm.selectedUser = {};
  vm.currentUser = {};
  
  console.log($stateParams.id);

  Location.get({ id: $stateParams.id }).$promise.then(function(response){
    console.log("locations controller response: ");
    console.log(response);
    vm.users = response.users;

  })
  
  function eyes(selectedUser){
    vm.selectedUser = selectedUser;
    vm.currentUser = $scope.$parent.users.currentUser;

    vm.selectedUser.matches.push(vm.currentUser._id)

    User.update({ id: vm.selectedUser._id}, vm.selectedUser, function(data){
      console.log(data);
    })

    var thisUser = User.get({ id: vm.currentUser._id});
    console.log("This user: ", thisUser)
    // thisuser.user.matches.push(user.user._id);
  }
}