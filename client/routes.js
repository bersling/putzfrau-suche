
angular.module('h2c').config(function($urlRouterProvider, $stateProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/:cc?key',
      templateUrl: 'client/components/search/search.html',
      controller: 'SearchController'
    }).state('search', {
      url: '/:cc/putzfrau-inserate?key',
      templateUrl: 'client/components/search/search.html',
      controller: 'SearchController'
    }).state('submit', {
      url: '/:cc/suche-job-als-putzfrau?key?ad',
      templateUrl: 'client/components/submit/submit.html',
      controller: 'SubmitController'
    }).state('info', {
      url: '/:cc/putzfrau-anstellen-rechtliches?key',
      templateUrl: 'client/components/info/info.html',
      controller: 'InfoController'
    }).state('contact', {
      url: '/:cc/kontakt?ad',
      templateUrl: 'client/components/contact/contact.html',
      controller: 'ContactController'
    });

  $urlRouterProvider.otherwise("/");
});
