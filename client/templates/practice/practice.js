Template.practice.created = function() {
var instance = this;
instance.subscribe("findQuestions");
instance.subscribe('qimages');
    //instance.subscribe('QuestionImage');
};

Template.practice.rendered = function() {

};

Template.practice.events({
    'click #startest': function(event, template){
        // prevent default button submit

        event.preventDefault();
        // Redirect to the course page


        var noQ = 5;

        if (template.find('#Checked5').checked){
          console.log("enterd 5");
          noQ = 5;
        }
        else if(template.find('#Checked10').checked){
          console.log("enterd 10");
          noQ= 10;
        }
        else{
          console.log("enterd 20");
          noQ = 20;
        }
        Session.set({
  testData: {
    class: template.find('#classQuestion').value,
    difficulty:  template.find('#difficultyQuestion').value,
    chapter:  template.find('#chapterQuestion').value,
    number: noQ,
    currentQ:1}
});
        Router.go("testController");
    }
});
