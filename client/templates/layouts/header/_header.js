Template._header.created = function (){
  // Get reference to template instance
  var instance = this;

  // Subscribe to all published courses
  instance.subscribe("publishedCourses");

      // Subscribe to course images
      instance.subscribe('images');
      instance.subscribe("findQuestions");
      instance.subscribe('qimages');
      instance.subscribe("findScores");
document.title = "PhyStudious";

}

Template._header.helpers({
  'verified': function(){
    var uniqueID = Meteor.userId();
    //console.log(uniqueID)
    if((Meteor.userId() == "i6Guw6nXrHZXHpFGE") || (Meteor.userId() == "JJeGwn7X8izaaAfnx")){
    return true;
  }
  else {
    return false;
  }
}
})

Template._header.rendered = function () {
  //console.log(Session.get("VerifiedUser"))
  //console.log(Meteor.users.findOne({ _id : Meteor.userId() }).username) ;
}
