Meteor.publish('hotels', function() {
  return Hotels.find();
});

Meteor.publish('rooms', function()  {
  return Rooms.find();
});
