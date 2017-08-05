(function(){
    'use strict';

    angular.module('app')
        .factory('adminAPI',adminAPI);

    adminAPI.$inject = ['$http'];

    function adminAPI($http){

        return {
            getAllUsers: getAllUsers,
            deleteUser: deleteUser
        };

        function getAllUsers(){
            return $http.get('/api/users',{
                cache: true
            });
        }

        function deleteUser(user){
            return $http.delete('/api/users/'+user._id);
        }


    }

})();