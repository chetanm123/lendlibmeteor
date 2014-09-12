lists = new Meteor.Collection("Lists");
if (Meteor.isClient) {
	
	Template.categories.lists=function(){
	  return lists.find({},{sort:{Category:1}});
	};

	//We are declaring the adding_category flag
	Session.set('adding_category',false);

	//this returns true if adding_category has been assigned a value true

	Template.categories.new_cat=function(){
		console.log("then here");
		return Session.equals('adding_category',true);
	};

	Template.categories.events({
		'click #btnNewCat':function(e,t){
			
			Session.set('adding_category',true);
			Meteor.flush();
			focusText(t.find("#add-category"));
		}
	});
 /* Template.hello.greeting = function () {
    return "My list.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });*/

	function focusText(i){
		i.focus();
		i.select();
	}
}

if (Meteor.isServer) {
	
  Meteor.startup(function () {
	
    // code to run on server at startup
  });
}
