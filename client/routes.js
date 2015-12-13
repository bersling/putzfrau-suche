
angular.module('h2c').config(function($urlRouterProvider, $stateProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/:cc',
      templateUrl: 'client/components/home/home.html',
      controller: 'HomeController'
    }).state('search', {
      url: '/:cc/putzfrau-inserate?key',
      templateUrl: 'client/components/search/search.html',
      controller: 'SearchController'
    }).state('submit', {
      url: '/:cc/suche-job-als-putzfrau',
      templateUrl: 'client/components/submit/submit.html',
      controller: 'SubmitController'
    }).state('info', {
      url: '/:cc/putzfrau-anstellen-rechtliches',
      templateUrl: 'client/components/info/info.html',
      controller: 'InfoController'
    });

  $urlRouterProvider.otherwise("/");
});
