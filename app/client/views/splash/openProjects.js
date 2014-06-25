Template.openProjects.helpers({
	participants: function() {
		return 742;
	},
	problemsPosted: function() {
		return 4313;
	},
	problemsEndorsed: function() {
		return 318;
	},
	pdfsIndexed: function() {
		return 7231;
	},
	pdfsAnnotated: function() {
		return 4309;
	},
	pdfsUploaded: function() {
		return 537;
	},
	indParticipants: function() {
		return 613;
	},
	orgParticipants: function() {
		return 7;
	},
	publishedProposals: function() {
		return 78;
	},
	implementedProposals: function() {
		return 19;
	},
});

Template.openProjects.events({
	/*Seperated in case learn-more triggers popup screen in future*/
	"click .learn-more": function() {
		$("#superContainer").css("top", 0);
	},
	"click .join": function() {
		/*superContainer from fullpage retains large negative top when link clicked*/
		$("#superContainer").css("top", 0);
	}
});