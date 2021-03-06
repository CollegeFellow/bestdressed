(function(){
    'use strict';

    angular
        .module('app')
        .controller('LookCtrl', LookCtrl);

    LookCtrl.$inject = ['$scope','$stateParams','looksAPI','commentAPI','Auth'];

    function LookCtrl($scope, $stateParams, looksAPI, commentAPI, Auth){

        $scope.user = Auth.getCurrentUser();
        $scope.id = $stateParams.lookId;
        $scope.popLooks = [];

        looksAPI.findOneLook($scope.id)
            .then(function(data){
                console.log('one look data', data);
                $scope.look = data.data;
                addView();
            })
            .catch(function(err){
                console.log('failed to get look',err);
            });

        looksAPI.popLooks($scope.id)
            .then(function(data){
                console.log('pop looks data',data);
                $scope.popLooks = data.data;
            })
            .catch(function(err){
                console.log('failed to get pop looks',err);
            });

        commentAPI.getComments($scope.id)
            .then(function(data){
                console.log('found comments',data.data);
                $scope.comments = data.data;
            })
            .catch(function(err){
                console.log('failed to get comments',err);
            });

        $scope.addVote = function(look){
            looksAPI.upVoteLook(look)
                .then(function(data){
                    console.log(data);
                    look.upVotes++;
                })
                .catch(function(err){
                    console.log('failed adding upvote');
                })
        };

        $scope.postComment = function(){
            var comment = {
                authorId : $scope.user._id,
                authorName: $scope.user.name,
                authorEmail: $scope.user.email,
                gravatar: $scope.user.gravatar,
                comment: $scope.comment.body,
                lookId: $scope.id
            };
            commentAPI.addComment(comment)
                .then(function(data){
                    console.log('comment added',data);
                    $scope.comment.body = '';
                    $scope.comments.splice(0,0,data.data);
                })
                .catch(function(err){
                    console.log('failed to post comment',err);
                });
        };

        function addView(){
            looksAPI.addView($scope.id)
                .then(function(res){
                    console.log('view incremented',res);
                })
                .catch(function(err){
                    console.log('error occurred incrementing',err);
                })
        }
    }

})();