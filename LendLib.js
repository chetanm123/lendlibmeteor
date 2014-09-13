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
		},
		
		'keyup #add-category':function(e,t){
			if(e.which==13){
				var catVal=String(e.target.value || "");
				if(catVal){
					lists.insert({Category:catVal});
					Session.set('adding_category',false);
				}
			}
		},
		
		'focusout #add-category':function(e,t){
			Session.set('adding_category',false);
		},
		'click .category':selectCategory
	});
 
	function focusText(i){
		i.focus();
		i.select();
	}

	function selectCategory(e,t){
		Session.set('current_list',this._id);
	}

	Template.list.items=function(){
			
			if(Session.equals('current_list',null))
				return null;
			else{
				var cats= lists.findOne({_id:Session.get('current_list')});
				if(cats && cats.items){
					for(var i=0;i<cats.items.length;i++){
						var d = cats.items[i];
						d.Lendee=d.LentTo ? d.LentTo :"free";
						d.LendClass = d.LentTo?"label-important":"label-success"
					}
					
					return cats.items;
				}
			}
		};

	Template.list.list_selected=function(){
		return ((Session.get('current_list')!=null) && (!Session.equals('current_list',null)));
	};

	Template.categories.list_status=function(){
		if(Session.equals('current_list',this._id))
			return "";
		else
			return "btn-inverse";
		
	};

	Template.list.list_adding=function(){
		return (Session.equals('list_adding',true));
	};

	Template.list.lendee_editing=function(){
		return (Session.equals('lendee_input',this.Name));
	};

	Template.list.events({
		'click #btnAddItem':function(e,t){
			Session.set('list_adding',true);
			Meteor.flush();
			focusText(t.find("#item_to_add"));
		},
		'keyup #item_to_add':function(e,t){
			if(e.which===13){
				//addItem(Session.get('current_list'),e.target.value);
				Session.set('list_adding',false);
			}
		},
		
		'focusout #item_to_add':function(e,t){
			Session.set('list_adding',false);
		},

		'click .delete_item':function(e,t){
			removeItem(Session.get('current_list'),e.target.id);
		},
		'click .lendee':function(e,t){
			Session.set('lendee_input',this.Name);
			Meteor.flush();
			console.log(this.LentTo);
			focusText(t.find("#edit_lendee"),this.LentTo);
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

}

if (Meteor.isServer) {
	
  Meteor.startup(function () {
	
    // code to run on server at startup
  });
}
