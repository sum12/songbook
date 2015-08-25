angular.module('player',[])
.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
})
.controller('songlist',function($scope, $http){
    $scope.state = 'gettingdata'
    $http.get('/book/songs/').success(function(response){
        $scope.list = {};
        $scope.snippets = {} 
        $scope.state = ["Getting", "Getting"]
        angular.forEach(response,function(song){
            $scope.state = [" Edit", "Cancel"];
            $scope.list[song.id]=song;
            angular.forEach($scope.list[song.id].snippets, function(snip){
                snip.editing = false;
            });
        });
        $scope.snippets = $scope.list[1].snippets;
        $scope.editing = false;
        $scope.player = videojs('playerbox',{"preload":"auto", "controls":true, "autoplay":true});
    }).error(function(error){
        console.log('Errored!!!!\n'+error);
    });
    $scope.loadSong = function(song_id){
        $scope.snippets = $scope.list[song_id].snippets;
        $scope.editing = false;
        $scope.state = [" Edit", "Delete"];
        song=$scope.list[song_id];
        console.log($scope.player.src({src:"/static/"+song.path, type:"video/"+song.type}));
        $scope.player.play();
    };
    $scope.editSnip = function(snip_id){
        angular.forEach($scope.snippets, function(snip){
            snip.editing = snip.id == snip_id ? ! snip.editing : snip.editing;
        });
        $scope.editing = ! $scope.editing;
        $scope.state = $scope.editing ? ["Undo","Save"] : [" Edit", "Delete"];
    };
    $scope.saveSnip = function(snip_id){
        $scope.snippets[snip_id].start = $scope.currentStart;
        $scope.snippets[snip_id].end = $scope.currentEnd;
        $scope.editSnip(snip_id);
    };
    $scope.getCurrent = function(){
        return $scope.player.currentTime();
    }
})
