angular.module('player',[])
.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
})
.controller('songlist',function($scope, $http){
    $scope.state = 'gettingdata'
    $http.get('/book/songs').success(function(response){
        $scope.list = {};
        $scope.snippets = {} 
        angular.forEach(response,function(song){
            $scope.list[song.id]=song;
            $scope.list[song.id].loaded=0;
            angular.forEach($scope.list[song.id].snippets, function(snip){
                snip.editing = false;
            });
        });
        $scope.snippets = $scope.list[1].snippets;
        $scope.editing = false
    }).error(function(error){
        $scope.state = 'errored in gettting data';
        console.log('Errored!!!!\n'+error);
    });
    $scope.loadSong = function(song_id){
        $scope.snippets = $scope.list[song_id].snippets;
        $scope.editing = false;
    }
    $scope.editSnip = function(snip_id){
        angular.forEach($scope.snippets, function(snip){
            snip.editing = snip.id == snip_id ? ! snip.editing : snip.editing;
        });
        $scope.editing = ! $scope.editing;
    }
})
