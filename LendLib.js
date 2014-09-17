lists = new Meteor.Collection("Lists");

/*checks to see if the current user making the request to update is
the admin user */

function adminUser(userId){
	var adminUser = Meteor.users.findOne({_id:userId});
	
	return (userId && adminUser && userId===adminUser._id);
}

lists.allow({
	insert:function(userId,doc){
		
		return adminUser(userId || (userId && doc.owner===userId));
	},
	
	update:function(userId,docs,fields,modifier){
		
		return adminUser(userId) || _.all(docs,function(doc){
			return doc.owner===userId;
		});
	},
	
	remove:function(userId){
		return adminUser(userId) || _.all(docs,function(doc){
			return doc.owner===userId;
		});
	}
});

