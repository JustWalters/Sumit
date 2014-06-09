Template.splash.rendered = function() {
	$(document).ready(function() {
		$('#fullpage').fullpage();
	});
};

Template.video.rendered = function() {
	//swfobject.registerObject("ytplayer", "8.0.0");

	var params = { allowScriptAccess: "always" };
    var atts = { id: "ytplayer" };
    var res = swfobject.embedSWF("http://www.youtube.com/v/kPDnw3_1GOI?enablejsapi=1&playerapiid=ytplayer&version=3",
                       "ytplayer", "425", "356", "8", null, null, {allowScriptAccess:"always"}, {id:"ytplayer"});
    /*embedSWF causing Exception from Deps afterFlush function function*/

var myytplayer = "hey";
console.log(myytplayer);
myytplayer = document.getElementById("ytplayer");
console.log(myytplayer);

	function onYouTubePlayerReady(playerId) {
		console.log("ready");
		var myytplayer = document.getElementById("ytplayer");
		ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
	}

	function onytplayerStateChange(newState) {
		console.log(newState);
		if (newState === YT.PlayerState.ENDED) {
			$.fn.fullpage.moveSectionDown();
		}
	}



	 var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      console.log(tag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
      	console.log("It's starting");
        player = new YT.Player('player', {
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
        console.log("It's ova");
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
      	console.log("It's ready");
        event.target.playVideo();
        console.log("Done");
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
      	console.log("changed");
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
        console.log("done changed");
      }
      function stopVideo() {
      	console.log("bout to stop");
        player.stopVideo();
        console.log("stopped");
      }
};