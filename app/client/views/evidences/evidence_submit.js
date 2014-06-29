Template.evidenceSubmit.events({
    'submit form': function(e, template) {
        e.preventDefault();

        var $body = $(e.target).find('[name=body]');
        var evidence = {
            body: $body.val(),
            postId: template.data._id
        };

        Meteor.call('comment', evidence, function(error, evidenceId) {
            if (error){
                Error.throw(error.reason);
            } else {
                $body.val('');
            }
        });
    }
});
