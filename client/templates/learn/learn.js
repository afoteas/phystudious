Template.learn.helpers({
    'courses': function(){
        return Courses.find();
    }
});

Template.learn.onCreated(function () {
  // Get reference to template instance
  var instance = this;

  // Subscribe to all published courses
  instance.subscribe("publishedCourses");

      // Subscribe to course images
      instance.subscribe('images');
      console.log(Courses.find().count());
        Session.set({db_courses : Courses.find()});
});
Template.learn.rendered =function () {

      console.log(Session.get('db_courses'));
};
