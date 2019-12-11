Template.addquestion.events({
    'change #questionImage': function (event, template) {
        // Get the first file selected by the user
        // TODO: only allow the users to select one file
        // TODO: make sure the file is an image of allowed format (png, jpeg, webp)
        var image = event.target.files[0];

        // Insert the image into the database
        // getting the image ID for use in the course object
        var imageObject = QImages.insert(image);

        // The image id is stored in the image object
        var imageId = imageObject._id;
        console.log("test2");

        // Create a reactive var to be used when the course is added
        qimageIdVar = new ReactiveVar(imageId);

    },
    'click #addCourse': function(event, template){
        // prevent default button submit
        console.log("test");
        event.preventDefault();
        var currentUsername = Meteor.user().username;
        // create an empty course container
        var question = {
            // Get form field values
            class: template.find('#classQuestion').value, // string
            topic: template.find('#topicQuestion').value, // string
            difficulty: template.find('#difficultyQuestion').value, // string
            // Cover Image ID comes from reactive var set in #courseCoverImage change event
            questionImageId: qimageIdVar.get(),
            question: template.find('#questionText').value,
            answers:
            [template.find('#questionAnswer1').value,
            template.find('#questionAnswer2').value,
            template.find('#questionAnswer3').value,
            template.find('#questionAnswer4').value], // array of answers
            solution: template.find('#solutionText').value
        };

        // Add question to collection
        Questions.insert(question);

        // Redirect to the course page
        Router.go("/");
    },
    'click #seeQuestions': function(){
      Router.go("/allQuestions");
    }
});


Template.addquestion.rendered= function(){

  qimageIdVar = new ReactiveVar("noimage");
};

Template.addquestion.created= function(){
var instance = this;
instance.subscribe("findQuestions");
instance.subscribe('qimages');
};
