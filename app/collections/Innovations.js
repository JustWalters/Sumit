Innovations = new Meteor.Collection('innovations');

Meteor.methods({
    innovation: function(innovationAttributes) {
        var user = Meteor.user();
        var post = Posts.findOne(innovationAttributes.postId);
        //ensure the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to login to add innovations");

        if(!innovationAttributes.body)
            throw new Meteor.Error(402, "Please write some content");

        if(!post)
            throw new Meteor.Error(422, "You must add innovation on an existing Challenge");

        innovation = _.extend(_.pick(innovationAttributes, 'postId', 'body'), {
            userId: user._id,
            author: user.username,
            submitted: new Date().getTime()
        });

        //update the post with the number of comments
        Posts.update(innovation.postId, {$inc: {innovationsCount: 1}});

        //create the comment, save the id
        innovation._id = Innovations.insert(innovation);

        //create a notification, informing the user that there's been a comment
        createinnovationNotification(innovation);

        return innovation._id;
    }
});