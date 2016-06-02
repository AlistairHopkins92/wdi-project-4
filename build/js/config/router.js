angular
  .module('dtg')
  .config(MainRouter);

MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
function MainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "../views/home.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "../views/authentications/login.html"
    })
    .state('register', {
      url: "/register",
      templateUrl: "../views/authentications/register.html"
    })
    .state('users', {
      url: "/users",
      templateUrl: "../views/users/index.html"
    })
    .state('locationsNew', {
      url: "/locations/new",
      templateUrl: "../views/locations/new.html",
      controller: "locationsNewController",
      controllerAs: "locations"
    })
    .state('locationsShow', {
      url: "/locations/:id",
      templateUrl: "../views/locations/show.html",
      controller: "locationsShowController",
      controllerAs: "locations"
    })
    .state('user', {
      url: "/users/:id",
      templateUrl: "../views/users/show.html",
      controller: function($scope, $stateParams, User) {
        User.get({ id: $stateParams.id }, function(res){
          $scope.$parent.users.user = res.user;
        });
      }
    })
    .state('chatsShow', {
      url: "/chats/:id",
      templateUrl: "../views/chats/show.html",
      controller: "chatsShowController",
      controllerAs: "chatsShow"
    })

  $urlRouterProvider.otherwise("/");
}
