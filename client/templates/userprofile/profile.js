function add(a, b) {
    return a + b;
}

Template.profile.helpers({
    'coursescount': function (){
    return  Questions.find().count();},
    'scores': function(){
      return Scores.find({},{sort:{dateCreated:-1}});
    },
    'scorescount': function(){
      return Scores.find().count();
    },
    'dateFormatter': function(date){

      var year = date.getFullYear();
     var month = date.getMonth()+1;
      var dt = date.getDate();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (month < 10) {
      month = '0' + month;
    }

      return dt +"/" + month +"/"+ year+" - "+hours+":"+minutes+":"+seconds
    },
    'classprefered': function(){

      var dict = {
        "Gymnasium A" : Scores.find({class:"Gymnasium A"}).count(),
        "Gymnasium B" : Scores.find({class:"Gymnasium B"}).count(),
        "Gymnasium C" : Scores.find({class:"Gymnasium C"}).count(),
        "Lyceum A" : Scores.find({class:"Lyceum A"}).count(),
        "Lyceum B" : Scores.find({class:"Lyceum B"}).count(),
        "Lyceum C": Scores.find({class:"Lyceum C"}).count()
        };
        //console.log(dict)

        // Create items array
        var items = Object.keys(dict).map(function(key) {
          return [key, dict[key]];
        });

        // Sort the array based on the second element

        items.sort(function(first, second) {
          return second[1] - first[1];
        });

        // Create a new array with only the first 5 items
        return items[0][0];

    },
    'easyTotal': function(){
      var ceasy = Scores.find({},{fields:{countEasy:1},sort:{dateCreated:-1}}).fetch();
      var ceasy2 = ceasy.map(a => a.countEasy);
      var ceasy = ceasy2.reduce(add, 0);
      var seasy = Scores.find({},{fields:{easyScore:1},sort:{dateCreated:-1}}).fetch();
      var seasy2 = seasy.map(a => a.easyScore);
      var seasy = seasy2.reduce(add, 0);
      var perc = seasy/ceasy*100;
      return "easy: " + perc.toFixed(2) + "%"
    },
    'normalTotal': function(){
      var ceasy = Scores.find({},{fields:{countNormal:1},sort:{dateCreated:-1}}).fetch();
      var ceasy2 = ceasy.map(a => a.countNormal);
      var ceasy = ceasy2.reduce(add, 0);
      var seasy = Scores.find({},{fields:{normalScore:1},sort:{dateCreated:-1}}).fetch();
      var seasy2 = seasy.map(a => a.normalScore);
      var seasy = seasy2.reduce(add, 0);
      var perc = seasy/ceasy*100;
      return "normal: " + perc.toFixed(2) + "%"
    },
    'hardTotal': function(){
      var ceasy = Scores.find({},{fields:{countHard:1},sort:{dateCreated:-1}}).fetch();
      var ceasy2 = ceasy.map(a => a.countHard);
      var ceasy = ceasy2.reduce(add, 0);
      var seasy = Scores.find({},{fields:{hardScore:1},sort:{dateCreated:-1}}).fetch();
      var seasy2 = seasy.map(a => a.hardScore);
      var seasy = seasy2.reduce(add, 0);
      var perc = seasy/ceasy*100;
      return "hard: " + perc.toFixed(2) + "%"
    },
    'totalQuestions':function(){
      var ceasy = Scores.find({},{fields:{countEasy:1},sort:{dateCreated:-1},limit: 10}).fetch();
      var ceasy2 = ceasy.map(a => a.countEasy);
      var ceasy = ceasy2.reduce(add, 0);
      var seasy = Scores.find({},{fields:{easyScore:1},sort:{dateCreated:-1},limit: 10}).fetch();
      var seasy2 = seasy.map(a => a.easyScore);
      var seasy = seasy2.reduce(add, 0);
      var perc1 = seasy/ceasy*100;
      var ceasy = Scores.find({},{fields:{countNormal:1},sort:{dateCreated:-1},limit: 10}).fetch();
      var ceasy2 = ceasy.map(a => a.countNormal);
      var ceasy = ceasy2.reduce(add, 0);
      var seasy = Scores.find({},{fields:{normalScore:1},sort:{dateCreated:-1},limit: 10}).fetch();
      var seasy2 = seasy.map(a => a.normalScore);
      var seasy = seasy2.reduce(add, 0);
      var perc2 = seasy/ceasy*100;
      var ceasy = Scores.find({},{fields:{countHard:1},sort:{dateCreated:-1},limit: 10}).fetch();
      var ceasy2 = ceasy.map(a => a.countHard);
      var ceasy = ceasy2.reduce(add, 0);
      var seasy = Scores.find({},{fields:{hardScore:1},sort:{dateCreated:-1},limit: 10}).fetch();
      var seasy2 = seasy.map(a => a.hardScore);
      var seasy = seasy2.reduce(add, 0);
      var perc3 = seasy/ceasy*100;
      var result = (perc1*0.25 + perc2*0.35 + perc3*0.40);
      return result.toFixed(0);
    },
    'totalScore':function(){
      var seasy = Scores.find({},{fields:{easyScore:1}}).fetch();
      var seasy2 = seasy.map(a => a.easyScore);
      var seasy_final = seasy2.reduce(add, 0);
      var seasy = Scores.find({},{fields:{normalScore:1}}).fetch();
      var seasy2 = seasy.map(a => a.normalScore);
      var snormal_final = seasy2.reduce(add, 0);
      var seasy = Scores.find({},{fields:{hardScore:1}}).fetch();
      var seasy2 = seasy.map(a => a.hardScore);
      var shard_final = seasy2.reduce(add, 0);
      var result = seasy_final + 2*snormal_final + 4*shard_final
      return result;
    }


});

Template.profile.created = function (){
    var instance = this;
   instance.subscribe("findQuestions");
   instance.subscribe("findScores");
   console.log(Questions.find().count());
   console.log(Scores.find({createdById:Meteor.userId()}).fetch());
   console.log(Meteor.userId())
}



Template.profile.rendered = function () {
   //$('#example').DataTable();
  //console.log(Session.get("VerifiedUser"))
  //console.log(Meteor.users.findOne({ _id : Meteor.userId() }).username) ;
}
