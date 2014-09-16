	Meteor.publish("Categories",function(){
		return lists.find({},{fields:{Category:1}});
	});

	Meteor.publish("listdetails",function(category_id){
				//console.log("Servre "+ ++cntb);
		return lists.find({_id:category_id});
	});
  
  Meteor.startup(function () {
	
    // code to run on server at startup
  });
