angular.module('player',[])
.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
})
.controller('songlist',function($scope, $http){
    $scope.snip_traveller = function(){
                var found = false,
                ct = $scope.player.currentTime();
                angular.forEach($scope.snippets, function(snip){
                    if( !found && snip.active){
                        if (snip.start <= ct && ct <= (1+snip.end)){
                            found = true;
                        }
                        else if (snip.start > ct ){
                            found = true; 
                            $scope.player.currentTime(snip.start);
                        }
                    }
                });
                if (! found){
                    $scope.player.currentTime(0);
                }
            };
    $scope.state = ["Edit", "Delete"];
    $http.get('/book/songs/').success(function(response){
        $scope.list = {};
        $scope.snippets = {};
        $scope.state = ["Getting", "Getting"]
        angular.forEach(response,function(song){
            $scope.state = ["Edit", "Delete"]
            song.snippets = {};
            song.snippets['new'] = {'id':'new', "start":0, "end":0, "song":song.id, "editing":false}
            $scope.list[song.id]=song;
            angular.forEach($scope.list[song.id].snippet_set, function(snip){
                snip.editing = false;
                $scope.list[song.id].snippets[snip.id] = snip;
                console.log(snip)
            });
        });
        $scope.snippets = $scope.list[1].snippets;
        $scope.editing = false;
        $scope.player = videojs('playerbox',{"preload":"auto", "controls":true, "autoplay":false, "width":540, "height":420});
    }).error(function(error){
        console.log('Errored!!!!\n'+error);
    });
    $scope.loadSong = function(song_id){
        angular.forEach($scope.snippets,function(snip){
            snip.editing = false;
        });
        $scope.snippets = $scope.list[song_id].snippets;
        $scope.editing = false;
        $scope.state = ["Edit", "Delete"];
        song=$scope.list[song_id];
        $scope.player.src({src:"/static/"+song.path, type:"video/"+song.type});
        $scope.player.ready(function(){
            $scope.player.on("timeupdate",$scope.snip_traveller);
        });
    };
    $scope.editSnip = function(snip_id){
        angular.forEach($scope.snippets, function(snip){
            snip.editing = snip.id == snip_id ? ! snip.editing : snip.editing;
        });
        $scope.player.pause();
        $scope.editing = ! $scope.editing;
        if ($scope.editing) {
            $scope.state = ["Undo","Save"];
            $scope.player.off("timeupdate",$scope.snip_traveller);
        }
        else{
            $scope.state = [" Edit", "Delete"];
            $scope.player.on("timeupdate",$scope.snip_traveller);
        }
    };
    $scope.saveSnip = function(snip_id){
        if ($scope.editing){
            $scope.snippets[snip_id].start = parseInt($scope.currentStart);
            $scope.snippets[snip_id].end = parseInt($scope.currentEnd);
            $http.post("/book/snippets/"+(parseInt(snip_id) || ""),$scope.snippets[snip_id]).
                success(function(response){
                    $scope.snippets[response.id] = response;
                    $scope.snippets[response.id].editing = false;
                }).
                error(function(err){
                    console.log(err);
                })
            $scope.currentStart = 0 ;
            $scope.currentEnd = 0;
            $scope.editSnip(snip_id);
        }
        else{
            $http.delete("/book/snippets/"+(parseInt(snip_id))).success(function(){
                delete($scope.snippets[snip_id])
            })
        }
    };

    $scope.getCurrent = function(){
        return $scope.player.currentTime();
    };

})
