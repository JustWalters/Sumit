Template.comment.helpers({
    submittedText: function() {
       	var date = new Date(this.submitted);
    	
    	var d=date.getDate();
    	var m=date.getMonth()+1;
    	var y=date.getFullYear();
    	
        return m + " - " + d + " - " + y;
    }
});
