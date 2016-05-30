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
      controller: "locationsController",
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
    });

  $urlRouterProvider.otherwise("/");
}