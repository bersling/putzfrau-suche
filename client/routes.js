
angular.module('h2c').config(function($urlRouterProvider, $stateProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'client/components/home/home.html',
      controller: 'HomeController'
    }).state('search', {
      url: '/putzfrau-inserate?key',
      templateUrl: 'client/components/search/search.html',
      controller: 'SearchController'
    }).state('submit', {
      url: '/suche-job-als-putzfrau',
      templateUrl: 'client/components/submit/submit.html',
      controller: 'SubmitController'
    }).state('info', {
      url: '/info',
      templateUrl: 'client/components/info/info.html',
      controller: 'InfoController'
    });

  $urlRouterProvider.otherwise("/");
});
