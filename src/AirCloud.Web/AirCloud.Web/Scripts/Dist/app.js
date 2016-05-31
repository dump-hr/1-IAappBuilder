(function () {
    'use strict';

    angular.module('app', ['ui.router']);
})();

(function () {
    'use strict';

    angular.module('app').config(AppConfig);

    AppConfig.$inject = ['$urlRouterProvider', '$httpProvider', '$locationProvider'];
    function AppConfig($urlRouterProvider, $httpProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);

        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.useApplyAsync(true);
    }
})();

(function () {
    'use strict';

    angular.module('app').config(AppStates);

    AppStates.$inject = ['$stateProvider'];
    function AppStates($stateProvider) {
        $stateProvider.state('Home', {
            url: '/',
            templateUrl: './Scripts/App/home/home.template.html',
            controller: 'homeController',
            controllerAs: 'vm'
        });
    }
})();

(function () {
    'use strict';

    angular.module('app').controller('homeController', HomeController);

    HomeController.$inject = [];
    function HomeController() {
        var vm = this;
        
    }
})();
