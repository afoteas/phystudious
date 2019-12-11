Template.questionDisplay.created = function (){
  var instance = this;
  instance.subscribe("findQuestions");
  instance.subscribe('qimages');
  }

  Template.questionDisplay.rendered = function (){
    var my_q = Session.get('db_questions');
    var images_input = my_q[0].questionImageId;
    console.log(images_input);
    console.log(QImages.findOne(images_input));
    console.log("hello!!!")
    }

Template.questionDisplay.helpers({

    'currentQ': function(){
      return Session.get('currentQ');
    },
    'data_q': function(){
      return  Session.get('current_question');
    },
    'img_url': function(){
      /*
      var my_q = Session.get('db_questions');
      var image_obj = QImages.findOne(my_q[Session.get('currentQ')-1].questionImageId);
      if( image_obj){
      return (QImages.findOne(my_q[Session.get('currentQ')-1].questionImageId));
      */
      var image_obj = QImages.findOne(Session.get('current_question').questionImageId);
      if( image_obj){
      return (QImages.findOne(Session.get('current_question').questionImageId));
      }

    },
    'answ_1': function(){
      return  Session.get('current_question').answers[0];
    },
    'answ_2': function(){
      return  Session.get('current_question').answers[1];
    },
    'answ_3': function(){
      return  Session.get('current_question').answers[2];
    },
    'answ_4': function(){
      return  Session.get('current_question').answers[3];
    },
    'correctPosition1': function(){
      var pos = Session.get('correct_position')
      var a = (pos == 1) ? true : false ;
      return a;
    },
    'correctPosition2': function(){
      var pos = Session.get('correct_position')
      var a = (pos == 2) ? true : false ;
      return a;
    },
    'correctPosition3': function(){
      var pos = Session.get('correct_position')
      var a = (pos == 3) ? true : false ;
      return a;
    },
    'correctPosition4': function(){
      var pos = Session.get('correct_position')
      var a = (pos == 4) ? true : false ;
      return a;
    },
});


Template.questionDisplay.events({
  'change #answer-1':function(){
    console.log("perfect");
     Session.set({cur_correct: "yes"});
   },
   'change #answer-2':function(){
     console.log("wrong");
      Session.set({cur_correct: "no"});
    },
    'change #answer-3':function(){
      console.log("wrong");
       Session.set({cur_correct: "no"});
     },
     'change #answer-4':function(){
       console.log("wrong");
        Session.set({cur_correct: "no"});
      },

});
