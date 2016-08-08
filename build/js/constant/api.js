angular
  .module('dtg')
  .constant('API', 'http://down-to-go.herokuapp.com/api')
  .config(mainRouter)
  .config(function($httpProvider) {
    $httpProvider.interceptors.push("authInterceptor");
  });