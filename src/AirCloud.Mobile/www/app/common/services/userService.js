(function(){
    'use strict';
    
    angular.module('app').service('userService', userService);
    
    userService.$inject = [];
    function userService() {
       
       function getUser() {
           return localStorage['user'];
       }
       
       function createIfNotExist() {
           localStorage['user'] = localStorage['user'] || 'user-' + guid();
       }

       function guid() {
           function s4() {
               return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1);
           }
           return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
               s4() + '-' + s4() + s4() + s4();
       }

       return {
        getUser: getUser,
        createIfNotExist:   createIfNotExist
       }
    }
})();