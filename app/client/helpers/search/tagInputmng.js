	// ===============
	
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
	 				{themeGroup: ""}, {themeGroup: ""}, {themeGroup: ""}],
	others: []
	};
	
	//================== to be removed ================
	
	
	    var Tag = Backbone.Model.extend({
        defaults: function() {

            return {
                tagname: "writting",
                selected: false,
                category: 0 // 0:sortby -- 1:ccIssues -- 2:themeGroups
            };
        },
        isSelected: function() {
            return this.get("selected");
        },
        toggle: function(options) {

            if (options !== null) {
                this.set({selected: options.select});

            }
            else {
                this.save({selected: !this.get("selected")});
            }
        }

    });


    /*
     Tag collection
     */

    var Tag_list = Backbone.Collection.extend({
        model: Tag,
        localStorage: new Backbone.LocalStorage("sumit-tag"),
        
        create: function(data) { //validation -- prevent same tag to be saved -- prevent tag with empty string too
        
		console.log("=========%%%%%%%%%%%%%%%%%%%%%%");
		console.log(this.remaining());
		console.log("=========%%--------------%%%%%%");

            if (data.tagname === "")
                return false;

            var allow = true;
            var ms = this.models;
            for (var tagID in ms) {
                if (ms[tagID].get("tagname") === data.tagname) {
                    allow = false;
                    return false;
                }
            }

            if (allow)
                this.push(data);
        },
        selected: function() { // this will be used if we want to send our tags to server?
            return this.where({selected: true});
        },
        remaining: function() {
            return this.where({selected: false});
        },
        search: function(tname) {
            var mymodel = this.sumit_where("tagname", tname);

            if (mymodel.length < 1)
                return null;

            return mymodel[0];
        },
           // define your own case insensitive where implemented using .filter
    sumit_where : function( key, val ){
        return this.filter( function( item ){
            return item.get( key ).toLowerCase() === val.toLowerCase();
        });
     },
        searchTag: function(options) {

            var sn = options.searchId;
            var holder = new Array();
            if (!sn)
                return holder;

            var remaining = this.remaining(); //only search values that are not already displayed
            $.each(remaining, function(i, tag) {
                //populate search result area
                var tname = tag.get("tagname");

                if (tname.toLowerCase().search(sn.toLowerCase()) > -1)
                    holder.push(tag.toJSON());
            });

            return holder;
        }
    });

    var Tags = new Tag_list();
	
	            //testing data ===================
	            
	            $.each(tags.ccIssues, function(index, item){
	            
	            	Tags.create({tagname: item.ccissue, category: 1});
	            });
	            $.each(tags.themeGroups, function(index, item){
	            
	            	Tags.create({tagname: item.themeGroup, category: 2});
	            });

			   
	//======================================
	
	//---- ===== ===== ----
	Template.tagview.helpers({
		foundTags : function(){

			Session.set("selectedTags", Tags.selected());
			console.log(Session.get("selectedTags"));
			return Session.get("selectedTags");
		},
		nofoundtag : function(){
			return Session.get("nofoundtag");
		}
	});
	
	
	Session.set("searchok", false);
	Session.set("remainingTags", Tags.remaining());
	
	// globalize the input area and the searc result also
	var inputArea = null;
	var searchArea = null;
	
	Template.tagsearch_view_template.helpers({
		foundTags1 : function(){

			console.log(Session.get("remainingTags"));
			return Session.get("remainingTags");
		},
		searchOK : function(){
			console.log(Session.get("searchok"));
			return Session.get("searchok");
		},
		
	});
	
	
	// ---- ==== -----
	Template.tagview.events({
	"click .sumit_tag" :function(e) {
		e.preventDefault();
		
				var tags_ctn = e.target;
				 console.log(tags_ctn);
				var tagInputctn = $(tags_ctn).children(".tag_input");
				
                console.log(tagInputctn);
                
                //save the search area for later used
                var searchArea = $(tagInputctn).children(".searchRes");

                
                
				var tagInput = $(tagInputctn).children(".sumit_tag_in");
				inputArea = tagInput;
				
				
				console.log(tagInput);
				
				$(tagInput).focus(); //this line is the hello
				
				
  				$(document).click(function() {
                	
                	if($(tagInput).is(":focus")){
                	
                		$(tags_ctn).addClass("sumit_tag_focus");
                		Session.set("nofoundtag", "");
                		
            		}else{
            		
                  		$(tags_ctn).removeClass("sumit_tag_focus"); 
                  			if(Tags.selected().length <= 0){
								Session.set("nofoundtag", "Tags");
							}else{
								Session.set("nofoundtag", "");
							} 
		            	}
            	});
            	
},
"keypress .sumit_tag_in" : function(e){
	if(e.which === 13)
		return false;
},
"keyup .sumit_tag_in" : function(e){
	
	console.log("keycode");

	console.log(inputArea);
	
	var tname = $(e.target).text();
	
	console.log("--------- ============ -----------");
	
	if(e.which === 13){
		
		var tag = Tags.search(tname.trim());
		console.log(tag);
		if(!tag){
			
			return false;
		}else{
	// make it selected and update the ui
	tag.toggle({select : true});
	
	Session.set("selectedTags", Tags.selected());
	Session.set("remainingTags", Tags.searchTag({searchId: ""}));
	$(inputArea).text("");
	$(inputArea).focus();
	
	if(Tags.selected().length <= 0){
		Session.set("nofoundtag", "Tags");
	}else{
		Session.set("nofoundtag", "");
	}
	
	}
	
	return false;
	}
	
	Session.set("searchok", true);
	Session.set("remainingTags", Tags.searchTag({searchId: tname.trim()}));
	
},
"click .searchRes": function(e){
	e.preventDefault();
	
	console.log("searchres(((");
	console.log(e.target);
	console.log("))))searchres");
	
	var tname = $(e.target).text();
	console.log(tname.trim());
	var tag = Tags.search(tname.trim());
	
	if(!tag){
		return false;
	}
	// make it selected and update the ui
	tag.toggle({select : true});
	Session.set("selectedTags", Tags.selected());
	Session.set("remainingTags", Tags.searchTag({searchId: ""}));
	
	$(inputArea).text("");
	//$(inputArea).focus();
}


});


Template.tag_view_template.events({
"mouseenter .sumit_tag_body" : function(e){
	e.preventDefault();
	var delt = $(e.target).children(".sumit_tag_del");
	
	$(delt).removeClass("mngDelete");
},
"mouseleave .sumit_tag_body" : function(e){
	e.preventDefault();
	var delt = $(e.target).children(".sumit_tag_del");
	
	$(delt).addClass("mngDelete");

},
	"click .sumit_tag_del" : function(e){
		e.preventDefault();
		
		var tname = this.tagname;
		var tag = Tags.search(tname.trim());
		console.log(tag);
		if(tag){
			// make it selected and update the ui
			tag.toggle({select : false});
			Session.set("selectedTags", Tags.selected());
			Session.set("remainingTags", Tags.searchTag({searchId: ""}));
			
			//code not responding -- I don't know why??????
			console.log("lennnnnnn ::::", Tags.selected().length);
		if(Tags.selected().length <= 0){
			Session.set("nofoundtag", "Tags");
		}else{
			Session.set("nofoundtag", "");
		}

			
			
			
			
		}
	}
});



