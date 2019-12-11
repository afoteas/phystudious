Template.oneQuestion.helpers({

    'img_url': function(myvar){

      var image_obj = QImages.findOne(this.questionImageId);
        if( image_obj){
      return (QImages.findOne(this.questionImageId));
      }
    },
    'answ_1': function(){
      return  this.answers[0];
    },
    'answ_2': function(){
      return  this.answers[1];
    },
    'answ_3': function(){
      return  this.answers[2];
    },
    'answ_4': function(){
      return  this.answers[3];
    },
    'visible':function(){
      return Template.instance().visible.get();
    }

});


Template.oneQuestion.created = function() {
var instance = this;
instance.subscribe("findQuestions");
instance.subscribe('qimages');
this.visible = new ReactiveVar(true);
};


Template.oneQuestion.events({

    'click #deleteQ': function(event){
      var questionId = this._id;
    //  console.log(courseId);
      event.preventDefault();

      Meteor.call('question.delete',questionId);
      Template.instance().visible.set(false);
      console.log(Template.instance().visible.get());
    }
});
