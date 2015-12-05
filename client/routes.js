
angular.module('h2c').config(function($urlRouterProvider, $stateProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'client/components/home/home.html',
      controller: 'HomeController'
    }).state('search', {
      url: '/search?key',
      templateUrl: 'client/components/search/search.html',
      controller: 'SearchController'
    }).state('submit', {
      url: '/submit',
      templateUrl: 'client/components/submit/submit.html',
      controller: 'SubmitController'
    });

  $urlRouterProvider.otherwise("/");
});
