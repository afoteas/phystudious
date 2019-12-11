Scores = new Mongo.Collection("scores");

Scores.before.insert(function (userId, document) {
  document.createdById = userId;
 document.dateCreated = new Date();

});
