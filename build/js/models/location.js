angular
.module('dtg')
.factory('Location', Location);

Location.$inject = ['$resource', 'API'];
function Location($resource, API){
  return $resource(
    API+'/locations/:id', {id: '@id'},
    { 
      'get':     { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: false},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' }
    }
  );
}
