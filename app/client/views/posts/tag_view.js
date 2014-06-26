var tags = {
	sortby : [{sid: "n", orderingKey: "New", tagRoute: "/new"}, 
		{sid: "o", orderingKey: "Old", tagRoute: "/old"}, 
		{sid: "c", orderingKey: "Controversial"}, {sid: "u", orderingKey: "Upvotes", tagRoute: "/best"}],
	ccIssues : [ {ccissue: "Logistics"}, { ccissue: "Physical Infrastructure"}, 
					{ ccissue: "Communications"}, { ccissue: "Social Context"},
					 { ccissue: "Politics"}, { ccissue: "Legislation"}, { ccissue: "Human Resources"}],
	
	themeGroups : [{themeGroup: "Macroeconomics, Population Dynamics, and Planetary Boundaries"},
	 				{themeGroup: "Reducing Poverty and Building Peace in Fragile Regions"},
	 				{themeGroup: ""},{themeGroup: ""}, 
	 				{themeGroup: ""}, {themeGroup: ""}, {themeGroup: ""}]
	};
Template.tagView.helpers({
    orderingKeys: function() {
    
    	// temporary fix here
    	// allw us to display title in "postlist" and then title-message in the postPage
    	var rt = Router.current({}).route.name
         	console.log(rt.toString());
         	
       	//===================================
       	
       	if(typeof(tags.sortby[3].active) === "undefined")
      		tags.sortby[3].active = true; // add "active" attribute to new tag by defualt
      		
       	return tags.sortby;
    },
    ccIssues : function(){
    	return tags.ccIssues;
    },
    themeGroups : function(){
    	return tags.themeGroups;
    }
});

Template.tagView.events({
	'click .sortby' : function (evt){
		
		var tagSID = evt.target.classList[4]; //we have five classes, so the forth is the tag sid
		
		for(var i in tags.sortby){

			//evt.target.setAttribute("class", evt.target.className + " active");
			if(tags.sortby[i].sid.toString() === tagSID.toString()){
				tags.sortby[i].active = true;
			}else{
				tags.sortby[i].active = false;
			}
	
		}
		
	}
});
