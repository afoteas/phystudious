Questions = new Mongo.Collection("questions");


Questions.helpers({

  'questionImage': function() {
    // Get the cover image from Images collection
    return image = QImages.findOne(this.questionImageId);
  }

});
