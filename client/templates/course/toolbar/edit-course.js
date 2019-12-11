Template.editCourse.events({
  'click #edit-course':function(event, template){
    // Get reference to Router
    var router = Router.current();

    // Get Course ID from router
    var courseId = router.params._id;

    // set editing course session variable to this course id
    Session.set('editingCourseId', courseId);
  }
});



Template.editCourse.helpers({
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
