Meteor.publish('hotels', function() {
  return Hotels.find();
});
