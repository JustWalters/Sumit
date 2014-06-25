


Template.postSubmit.events({
    'submit form': function(e) {
        e.preventDefault();
        
        var myTags = $(e.target).find('[name=sumit_tag]').children(".sumit_tag_body");
        var newTags = new Array();
        
        //parse the tagContainer to get all input tags
        myTags.each(function(i, mytag){
        	console.log(mytag);
        	newtag = $(mytag).children(".sumit_tag_in").text()
        	
        	if(newtag.trim() !== "")
        		if(newTags.indexOf() <= -1)
        			newTags.push(newtag.trim());
        });
        
        console.log(newTags);

	//create a post with user info
        var post = {
            title: $(e.target).find('[name=title]').val(),
            message: $(e.target).find('[name=message]').val(),
            tags: newTags
        }

        Meteor.call('post', post, function(error, id) {
            if (error) {
                //display the error to the user
                Errors.throw(error.reason);

                if (error.error === 302)
                    Router.go('postPage', {_id: error.details})
            } else {
                Router.go('postPage', {_id: id});
            }
        });
    },
});
