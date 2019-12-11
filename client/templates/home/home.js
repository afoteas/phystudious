
Template.home.rendered = function() {
  clicks = 0;
  $('.carousel').carousel({
  interval: 5000
})

};

Template.home.events({
  'click #home_client':function(){
console.log("hi from client!!")
},
  'click #home_server':function(){
    clicks++;
    alert("you pressed "+ clicks + " times the server button!!");
Meteor.call('home.call')
  }
});
