Template.doneEditingCourse.events({
    'click #done-editing-course': function () {
        // Clear editing course ID session variable
        Session.set('editingCourseId', undefined);
    },
    'click #delete-course': function () {
        var router = Router.current();

        // Get Course ID from router
        var courseId = router.params._id;
        console.log(courseId);
        Meteor.call('course.delete',courseId);
    },
});
