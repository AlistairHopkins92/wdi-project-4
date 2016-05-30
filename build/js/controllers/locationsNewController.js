angular
.module('dtg')
.controller('locationsNewController', LocationsNewController);

LocationsNewController.$inject = ["Location", "$state"]
function LocationsNewController(Location, $state){
  var vm = this;

  vm.findOrCreate = function(){
    console.log(vm.newLocation);
    
    var data = {
      external_id: vm.newLocation.id,
      formatted_address: vm.newLocation.formatted_address,
      lat: vm.newLocation.geometry.location.lat(),
      lng: vm.newLocation.geometry.location.lng(),
    }

    Location.save(data).$promise.then(function(response){
      vm.newLocation = undefined;
      $state.go("locationsShow", { id: response.location._id })
    })
  }
}