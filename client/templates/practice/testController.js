var questionNo = 0;  // total number of questions in the test
var currentQ = 1;    // number of the current question!!
var clicks = 0;
var init_difficulty;
var test_history = [];


Template.testController.rendered = function () {
  // Get reference to template instance


  //var username = Meteor.users.findOne({_id: uniqueID}).usename;
  console.log(Session.get('currentUser'));
  console.log(Session.get('db_questions'));
  //console.log(Session.get('easy_questions'));
  console.log(Meteor.users.findOne({ _id : Meteor.userId() }).username) ;
  remaining_questions = [Session.get('easy_questions'),Session.get('medium_questions'),Session.get('hard_questions')];
  console.log(remaining_questions);
  var i = 0;
  remaining_questions.forEach(function(element) {
  if(element.length<questionNo){
    i++;
    //break;
  }

  //console.log(element.length);
  //console.log(questionNo);
});
if(i>0){
  alert('Not enough questions for these parameters. Please choose other school class, chapter, or less questions!');
  Router.go("practice");
}
//select first question
var first_dif = Session.get("current_difficulty");

if(first_dif == 1){
  console.log("entered init easy")
  var temp_question_list = Session.get('easy_questions');
  var temp_question = temp_question_list[Math.floor(Math.random()*temp_question_list.length)];
  temp_question_list.splice( temp_question_list.indexOf(temp_question), 1 );
  console.log(temp_question_list)
  Session.set({easy_questions:temp_question_list});
  Session.set({current_question:temp_question});
}
else if (first_dif == 2) {
  var temp_question_list = Session.get('medium_questions');
  var temp_question = temp_question_list[Math.floor(Math.random()*temp_question_list.length)];
temp_question_list.splice( temp_question_list.indexOf(temp_question), 1 );
  Session.set({medium_questions:temp_question_list});
  Session.set({current_question:temp_question})
}
else{
  var temp_question_list = Session.get('hard_questions');
  var temp_question = temp_question_list[Math.floor(Math.random()*temp_question_list.length)];
  temp_question_list.splice( temp_question_list.indexOf(temp_question), 1 );
  Session.set({hard_questions:temp_question_list});
  Session.set({current_question:temp_question})
}



};

Template.testController.created = function (){
   Session.set({currentQ: 1});
   var instance = this;
   instance.subscribe("findQuestions");
   instance.subscribe('qimages');
   //console.log(Questions.find().count());

    var sessionData = Session.get('testData');
    if(sessionData){
    questionNo = sessionData.number;
    currentQ = sessionData.currentQ;
    }
    else{
      alert("Unfortunatelly something went wrong...\nPlease reload the page!");
      Router.go("home")
    }
    var currentUser;
  var uniqueID = Meteor.userId();
//  console.log(uniqueID);
  if(Meteor.users.findOne({ _id : Meteor.userId() })){
  Session.set({currentUser:Meteor.users.findOne({ _id : Meteor.userId() }).username})}
  //console.log(Session.get('currentUser'));
  Session.set({db_questions : Questions.find({class:sessionData.class}).fetch()});
  //fetch easy Questions
  if(sessionData.chapter == "All Chapters"){
    Session.set({easy_questions : Questions.find({class:sessionData.class,difficulty:'1'}).fetch()});

    Session.set({medium_questions : Questions.find({class:sessionData.class,difficulty:'2'}).fetch()});

    Session.set({hard_questions : Questions.find({class:sessionData.class,difficulty:'3'}).fetch()});
  }
  else{
  Session.set({easy_questions : Questions.find({class:sessionData.class,difficulty:'1',topic:sessionData.chapter}).fetch()});
  console.log(Questions.find({class:sessionData.class,difficulty:'1',topic:sessionData.chapter}).fetch());
  //fetch medium Questions
  Session.set({medium_questions : Questions.find({class:sessionData.class,difficulty:'2',topic:sessionData.chapter}).fetch()});
  console.log(Questions.find({class:sessionData.class,difficulty:'2',topic:sessionData.chapter}).fetch());
  //fetch hard Questions
  Session.set({hard_questions : Questions.find({class:sessionData.class,difficulty:'3',topic:sessionData.chapter}).fetch()});
}
  console.log(Questions.find({class:sessionData.class,difficulty:'3',topic:sessionData.chapter}).fetch());
  console.log(Questions.find({class:sessionData.class}).count());
  //set the difficulty of the first question
  Session.set({current_difficulty:sessionData.difficulty});
  //empty the history array
  test_history = [];
  //set the feedback parameters
  Session.set({pre_correct:'yes'});

}

/*Template.testController.varquestion = function (){
return  Session.get('c');

}*/

Template.testController.helpers({
    'testData': function (){
    return  Session.get('testData')},
    'barWidth': function(){
      return Session.get('currentQ')/questionNo*100;
    },
    'currentQ': function(){
      return Session.get('currentQ');
    },
    'difficultyQ': function(){
      return Session.get('current_question').difficulty;
    },
    'LastQuestion': function(){
      var currentQ = Session.get('currentQ');
      var a = (currentQ != questionNo) ? true : false ;
      return a;
    }

});


Template.testController.events({
  'click #next_btn':function(){
    //Store Data
    test_history.push([Session.get('current_question'),Session.get('cur_correct')])
    console.log(test_history);

  if(currentQ < questionNo) {
   currentQ++;
   Session.set({currentQ: currentQ});}

   Session.set({correct_position: Math.floor((Math.random() * 4) + 1)})
   console.log("current_question");
   console.log(currentQ);
   //Store Data

   //select next question
   var previous_answer = Session.get('pre_correct');
   var current_answer = Session.get('cur_correct');
   console.log(previous_answer);
   console.log(current_answer);
   console.log(Session.get("current_difficulty"));


   Session.set({pre_correct:current_answer});
      var current_diff = Session.get('current_difficulty')
   if((previous_answer == 'yes') && (current_answer == 'yes' )){
     console.log("entered yes")
      if(current_diff <3){
        console.log("entered yes if");
        console.log(current_diff);
        current_diff++;
        console.log(current_diff);
      Session.set({current_difficulty:current_diff});
    }
   }
   else if((previous_answer == 'no') && (current_answer == 'no' )){
     console.log("entered no")
     if(current_diff > 1){
       console.log("entered no if")
       console.log(current_diff);
       current_diff--;
       console.log(current_diff);
     Session.set({current_difficulty:current_diff});
   }
   }
console.log("before chose question: "+current_diff);
   if(current_diff == 1){
     console.log("mphka easy");
     remaining_questions = [Session.get('easy_questions'),Session.get('medium_questions'),Session.get('hard_questions')];
     console.log(remaining_questions);

     var temp_question_list = Session.get('easy_questions');
     var temp_question = temp_question_list[Math.floor(Math.random()*temp_question_list.length)];
     temp_question_list.splice( temp_question_list.indexOf(temp_question), 1 );
    console.log(temp_question);
     Session.set({easy_questions:temp_question_list});
     console.log(temp_question_list);
     Session.set({current_question:temp_question});
   }
   else if (current_diff == 2) {
     console.log("mphka normal");
     remaining_questions = [Session.get('easy_questions'),Session.get('medium_questions'),Session.get('hard_questions')];
     console.log(remaining_questions);
     var temp_question_list = Session.get('medium_questions');
     var temp_question = temp_question_list[Math.floor(Math.random()*temp_question_list.length)];
     temp_question_list.splice( temp_question_list.indexOf(temp_question), 1 );
     Session.set({medium_questions:temp_question_list});
     Session.set({current_question:temp_question})
   }
   else{
     console.log("mphka hard");
     remaining_questions = [Session.get('easy_questions'),Session.get('medium_questions'),Session.get('hard_questions')];
     console.log(remaining_questions);
     var temp_question_list = Session.get('hard_questions');
     var temp_question = temp_question_list[Math.floor(Math.random()*temp_question_list.length)];
     temp_question_list.splice( temp_question_list.indexOf(temp_question), 1 );
     Session.set({hard_questions:temp_question_list});
     Session.set({current_question:temp_question})
   }


   },
  'click #submit_btn':function(){
    //Store Data
    test_history.push([Session.get('current_question'),Session.get('cur_correct')])
    console.log(test_history);
    var cor = 0;
    var i;
    for (i = 0; i < test_history.length; i++) {
    if(test_history[i][1]=='yes'){
      cor++
    }
    }
    var percentage = cor/questionNo;
    if(percentage<0.40){
    alert("Your score is : "+cor+'/'+questionNo+"\nYour score isn't good. \nYou should study harder.Start with theory and try again your practice tests afterwards.");
  }
  else if((percentage>=0.40) && (percentage<0.60)){
    alert("Your score is : "+cor+'/'+questionNo+"\nMmmmm...you can do it much better.Study the theory carefully and practice again afterwards.");
  }
  else if((percentage>=0.60) && (percentage<0.80)){
    alert("Your score is : "+cor+'/'+questionNo+"\nGood job! You can achieve better scores though. Review the theory and practice again.");
  }
  else{
    alert("Your score is : "+cor+'/'+questionNo+"\nGreat job! You are ready to go!");
  }

    //save the Scores
    var sessionData = Session.get('testData');
    var count_easy = 0;
    var count_easy_cor = 0;
    var count_normal = 0;
    var count_normal_cor = 0;
    var count_hard = 0;
    var count_hard_cor = 0;

    test_history.forEach(function(quest){
      console.log(quest[0].difficulty);
      if(quest[0].difficulty == 1){
        count_easy++;
        if(quest[1]== "yes"){
          count_easy_cor++;
        }
        console.log(count_easy,count_easy_cor);
      }
      else if(quest[0].difficulty == 2){
        count_normal++;
        if(quest[1]== "yes"){
          count_normal_cor++;
        }
      }
      else{
        count_hard++;
        if(quest[1]== "yes"){
          count_hard_cor++;
        }
      }

    });


    var score = {
        // Get form field values
        class: sessionData.class, // string
        chapter: sessionData.chapter,
        numberQ: questionNo,
        countEasy: count_easy,
        countNormal : count_normal,
        countHard : count_hard,
        easyScore: count_easy_cor,
        normalScore: count_normal_cor,
        hardScore: count_hard_cor
    };

    // Add question to collection
    Scores.insert(score);

    Router.go("home")
  }
});
