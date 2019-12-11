Meteor.publish('findQuestions', function() {
  return Questions.find({},{sort:{class: 1}});
});

Meteor.publish('qimages', function () {
    return QImages.find();
});

Meteor.publish('QuestionImage', function (courseId) {
    // Get the course object from course ID parameter
    var courseObject = Questions.findOne(courseId);

    // Get image ID from course object
    var coverImageId = courseObject.coverImageId;

    // Find the course cover image and return it
    return QImages.find(coverImageId);
});
