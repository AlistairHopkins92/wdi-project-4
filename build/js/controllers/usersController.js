angular
.module('dtg')
.controller('usersController', UsersController);

UsersController.$inject = ['User', 'CurrentUser', '$state'];
function UsersController(User, CurrentUser, $state){

  var self = this;

  self.all           = [];
  self.user          = null;
  self.currentUser   = null;
  self.error         = null;
  self.getUsers      = getUsers;
  self.register      = register;
  self.login         = login;
  self.logout        = logout;
  self.checkLoggedIn = checkLoggedIn;


  function getUsers() {
    var oppositeSex = self.currentUser.local.sex === "Male" ? "Female" : "Male";

    User.query({ sex: oppositeSex }, function(data){
      self.all = data.users;
    });
  }

  function handleLogin(res) {
    var token = res.token ? res.token : null;
    self.currentUser = CurrentUser.getUser();
    if (token) {
      return $state.go('locationsNew');
    }
  }

  function handleError(e) {
    self.error = "Something went wrong.";
  }

  function register() {
    User.register(self.user, handleLogin, handleError);
  }

  function login() {
    User.login(self.user, handleLogin, handleError);
  }

  function logout() {
    self.all         = [];
    self.currentUser = null;
    CurrentUser.clearUser();
  }

  function checkLoggedIn() {
    self.currentUser = CurrentUser.getUser();
    return !!self.currentUser;
  }

  return self;
}