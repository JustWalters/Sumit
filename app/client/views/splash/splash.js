Template.splash.rendered = function() {
	$(document).ready(function() {
		$("#fullpage").fullpage();
	});
};

Template.video.rendered = function() {
  var tag = document.createElement("script");

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player("player", {
      videoId: "dRjE1JwdDLI",
      playerVars: {
        autohide: 1,
        modestbranding: 1,
        playsinline: 1,
        showinfo: 0,
        cc_load_policy: 1,
        rel: 0
      },
      events: {
        "onReady": onPlayerReady,
        "onStateChange": onPlayerStateChange
      }
    });
  };

  //Autoplays the video. Bad idea?
  function onPlayerReady(e) {
    //e.target.playVideo();
  }

  function onPlayerStateChange(e) {
    if (e.data == YT.PlayerState.ENDED) {
      $.fn.fullpage.moveSectionDown();
    }
  }
};

Template.splash.events({
  "click #sign-in": function(e) {
/*superContainer from fullpage retains large negative top when link clicked*/
    $("#superContainer").css("top", 0);
  }
});