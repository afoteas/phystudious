Template.allQuestions.created = function() {
var instance = this;
instance.subscribe("findQuestions");
instance.subscribe('qimages');
Session.set({db_questions : Questions.find({},{sort:{class: 1,topic: 1,difficulty:1}}).fetch()}) ;
Session.set({db_questions_count : Questions.find({}).count()}) ;
};



Template.allQuestions.rendered = function() {
  //sconsole.log(Session.get("db_questions"));
}

Template.allQuestions.helpers({
    'allQuestions': function(){
        return Session.get("db_questions");
    },
    'allQuestionsCount': function(){
        return Session.get("db_questions_count");
    }



});
