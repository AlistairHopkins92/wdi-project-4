angular
.module('dtg')
.controller('chatsShowController', ChatsShowController);

ChatsShowController.$inject = ["socket", "$stateParams", "CurrentUser"];
function ChatsShowController(socket, $stateParams, CurrentUser){
  var vm = this;
  vm.currentUser = CurrentUser.getUser();
  vm.messages    = []

  socket.on("connect", function(){
    console.log("connected");
  })

  // Send back to the server.
  socket.emit("join", $stateParams.id);

  vm.sendMessage = function(){
    console.log("sent", vm.message);
    vm.message.channel = $stateParams.id;
    vm.message.sender  = vm.currentUser;

    // Save to the DB

    socket.emit("send", vm.message)
    vm.message = {};
  }

  socket.on("receive", function(data){
    console.log("received", data);
    vm.messages.push(data);
    $('#textWindow').animate({scrollTop: $('#textWindow').height()}, 500);
  });
}