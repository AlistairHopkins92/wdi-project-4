angular
.module('dtg')
.controller('locationsShowController', LocationsShowController);

LocationsShowController.$inject = ["Location", "$stateParams", "$http", "$scope", "User", "API"]
function LocationsShowController(Location, $stateParams, $http, $scope, User, API){
  var vm           = this;
  vm.eyes          = eyes;
  vm.selectedUser  = {};
  vm.currentUser   = $scope.$parent.users.currentUser;
  vm.eyedUp        = false;
  vm.matched       = false;
  vm.checkMatch    = checkMatch;
  vm.selectedUsers = [];
  vm.showAll       = true
  vm.showMatches   = false
  vm.showAllButton = showAllButton;
  vm.showMatchesButton = showMatchesButton;
  vm.matches = [];

  console.log($stateParams.id);

  Location.get({ id: $stateParams.id }).$promise.then(function(response){
    console.log("locations controller response: ");
    console.log(response);
    vm.users = response.users;
  })
  
  function showAllButton(){
    vm.showAll       = true
    vm.showMatches   = false
  }

  function showMatchesButton(){
    vm.showAll       = false
    vm.showMatches   = true
    vm.matches = [];
    $http.post(API + "/matches", { user: vm.currentUser })
      .then(function(response) {
        var connections = response.data;
        connections.forEach(function(connection) {
          var match = (connection.sender === vm.currentUser._id) ? connection.receiver : connection.sender;
          var connectedUser = vm.users.filter(function(user) { //chaos starts here
            return user._id = match;
          });
          vm.matches.push(connectedUser); //chaos ends here
        })
      })
  }

  function eyes(selectedUser){
    vm.selectedUser = selectedUser;
    vm.currentUser = $scope.$parent.users.currentUser;

    var data = {
      sender: vm.currentUser,
      receiver: vm.selectedUser
    }

    $http.post(API + "/connections", data)
      .then(function(response) {
      console.log(response);
    })


    // vm.eyedUp = true
    // if (vm.selectedUser.matches.indexOf( vm.currentUser._id ) == -1){
    // vm.selectedUser.matches.push(vm.currentUser._id)
    // }
    // else{
    //   console.log("Already in there mate ;-p")
    // }

    // User.update({ id: vm.selectedUser._id}, vm.selectedUser, function(data){
    //   console.log("this IS data",data);
    // })

    // var thisUser = User.get({ id: vm.currentUser._id});
    // console.log("This user: ", thisUser)

    // thisuser.user.matches.push(user.user._id);
  }

  function checkMatch(selectedUser){
    vm.selectedUser = selectedUser;
    vm.currentUser = $scope.$parent.users.currentUser;
    if ( (vm.selectedUser.matches.indexOf( vm.currentUser._id ) == 0) && (vm.currentUser.matches.indexOf( vm.selectedUser._id ) == 0) ){
      vm.matched = true;
      console.log('matched')
      vm.selectedUsers.push(selectedUser);
    }
    else{
      vm.matched = false;
      console.log('not matched')
    }
    return vm.matched;
  }

}