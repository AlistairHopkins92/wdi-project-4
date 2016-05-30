angular
.module('dtg')
.controller('locationsController', LocationsController);

LocationsController.$inject = []
function LocationsController(){
  var vm = this;

  vm.findOrCreate = function(){
    console.log(vm.newLocation);
    vm.newLocation = undefined;
  }
}