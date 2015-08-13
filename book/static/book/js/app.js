angular.module('player',[])
.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
})
.controller('songlist',function($scope, $http){
    $scope.state = 'gettingdata'
    $http.get('/book/songs').success(function(response){
        $scope.list = {};
        angular.forEach(response,function(song){
            $scope.list[song.id]=song;
            $scope.list[song.id].loaded=0;
        })
    }).error(function(error){
        $scope.state = 'errored in gettting data';
        console.log('Errored!!!!\n'+error);
    });
    $scope.buttonClicked= function(song_id){
        $scope.list[song_id].loaded+=1;
    }
})
