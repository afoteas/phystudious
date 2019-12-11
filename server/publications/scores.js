Meteor.publish('findScores', function() {
  if (this.userId) {
      return Scores.find({createdById: this.userId})}

  });
