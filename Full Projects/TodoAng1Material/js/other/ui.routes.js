(function() {

  angular.module('ui.routes', ['ui.router'])

      .config(function($stateProvider, $urlRouterProvider) {

          $urlRouterProvider.otherwise('/home');


          $stateProvider

              .state('home', {
                 url: '/home',
                  template: '<defaulthome></defaulthome>'
              })
              .state('dashboard', {
                  url: '/dashboard',
                  template: '<dashboardhome></dashboardhome>'
              });

      })
      .filter('zeroToNo', function(){
          return function(value) {
              if(value == 0) {
                  return 'no';
              }
              return value;
          }
      });

})();