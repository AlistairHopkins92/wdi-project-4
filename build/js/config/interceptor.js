angular
  .module('dtg')
  .config(Interceptor);

function Interceptor($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
}