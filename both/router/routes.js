
Router.route('/', {
    name: 'home'
});

Router.route('/dashboard');

Router.route('/practice');

Router.route('/contribute');
Router.route('/teach');

/*
Router.route('/contribute/addcourse', {
  name: 'addcourse'
});



Router.route('/contribute/addquestion', {
  name: 'addquestion'
}); */

Router.route('/allQuestions');
Router.route('/addcourse');
Router.route('/addquestion');

Router.route('/learn');
Router.route('/testController');

Router.route('/learn/:tag', function() {
    this.render('taggedCourses')
});

Router.route('/profile')

Router.route('/profileSettings');

Router.route('/settings');

Router.route('course/:_id', {
    name: 'course'
});

Router.route('course/:_id/info', {
    name: 'courseInfo'
});

Router.route('/singleresourcepage', {
    name: 'testsingleResourcePage'
});

Router.route('/singleresourcepage/info', {
    name: 'testcourseInfo'
});

Router.route('license', {
  name: 'licenseQuestions'
});
