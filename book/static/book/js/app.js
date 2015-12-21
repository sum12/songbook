angular.module('player',["ui.bootstrap"])
.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
})
.controller('songlist',function($scope, $http, $timeout){
    $scope.stop = true;
    $scope.snip_traveller = function(){
        //$scope.player.off("timeupdate",$scope.snip_traveller);
        $timeout(function(){$scope.snip_traveller()}, 2000);
        if($scope.stop || $scope.player.paused())
            return
        var found = false,
               ct = $scope.player.currentTime();
        for (var i in $scope.snippets){
            snip = $scope.snippets[i];
            if (snip.id === 'new')
                continue; 
            if( snip.active){
                if (snip.start <= ct && ct <= (1+snip.end)){
                    found = true;
                    break
                }
                else if (snip.start > ct ){
                    //console.log(snip.start);
                    //console.log(ct);
                    //console.log('#');
                    found = true; 
                    $scope.player.currentTime(snip.start );
                    console.log("setted " + $scope.player.currentTime() + "," +ct)
                    break;
                }
            }
        }
        if (! found && $scope.snippets.length != 1 ){
            console.log('nothing')
            $scope.player.currentTime(1);
        }
    };
    $scope.state = ["Edit", "Delete"];
    $scope.alerts = [];
    $http.get('/book/songs/').success(function(response){
        $scope.list = {};
        $scope.snippets = {};
        $scope.alerts.push({
            "type":"success",
            "msg":"Got the data!!"
        });
        $scope.state = ["Getting", "Getting"]
        angular.forEach(response,function(song){
            $scope.state = ["Edit", "Delete"]
            song.snippets = {};
            song.snippets['new'] = {'id':'new', "start":0, "end":0, "song":song.id, "editing":false}
            $scope.list[song.id]=song;
            angular.forEach(song.snippet_set, function(snip){
                snip.editing = false;
                $scope.list[song.id].snippets[snip.id] = snip;
            });
        });
        $scope.editing = false;
        $scope.player = videojs('playerbox',{"preload":"auto", "controls":true, "autoplay":false, "width":540, "height":420});
        $scope.loadSong(1);
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
        $scope.comment = song.comment;
        $scope.player.ready(function(){
            //$scope.player.on("timeupdate",$scope.snip_traveller);
            $scope.stop = false;
            $scope.snip_traveller();
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
            //$scope.player.off("timeupdate",$scope.snip_traveller);
            $scope.stop = true;
        }
        else{
            $scope.state = [" Edit", "Delete"];
            //$scope.player.on("timeupdate",$scope.snip_traveller);
            $scope.stop = false;
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
                    $scope.alerts.push({
                        "type":"success",
                        "msg": "OK"
                    });
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
                delete($scope.snippets[snip_id]);
                $scope.alerts.push({
                    "type":"success",
                    "msg": "Deleted!!!!!"
                });
            }).
            error(function(err){
                $scope.alerts.push({
                    "type":"danger",
                    "msg": "Nope:"+err.detail
                })
            })
        }
    };
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
    $scope.getCurrent = function(){
        return $scope.player.currentTime();
    };

})
