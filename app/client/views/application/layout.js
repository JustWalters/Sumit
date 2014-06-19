Template.layout.helpers({
  pageTitle: function() { return Session.get("pageTitle"); },
  notOnIntro: function() { var pathArray = window.location.pathname.split( "/" );
		var path = pathArray[1];
		return path !== "splash"; /*Or whatever this will be*/
	}
});