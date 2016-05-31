(function () {
    'use strict';

    angular.module('app', ['ui.router', 'uiGmapgoogle-maps']);
})();

(function () {
    'use strict';

    angular.module('app').config(AppConfig).config(HeatmapConfig);

    AppConfig.$inject = ['$urlRouterProvider', '$httpProvider', '$locationProvider'];
    function AppConfig($urlRouterProvider, $httpProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);

        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.useApplyAsync(true);
    }

    HeatmapConfig.$inject = ['uiGmapGoogleMapApiProvider'];
    function HeatmapConfig(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyB81UIIhv_kwpUKiSsnclFpjD8xwwdM4F0',
            libraries: 'weather,geometry,visualization'
        });
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

    HomeController.$inject = ['uiGmapGoogleMapApi'];
    function HomeController(uiGmapGoogleMapApi) {
        var vm = this;

        uiGmapGoogleMapApi.then(function (map) {
            google.maps.event.trigger(map, 'resize');
        });
    }
})();
