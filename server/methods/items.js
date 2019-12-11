Meteor.methods({
  'Items.insert': function (params) {
    Items.insert(params);
  },
  'course.delete': function(id){
    Courses.remove(id)
  },
  'question.delete': function(id){
    Questions.remove(id)
  }
});
