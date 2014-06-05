Meteor.publish('hotels', function() {
  return Hotels.find();
});

Meteor.publish('roomtypes', function(hotelId) {
  return RoomTypes.find({hotelId: hotelId});
});

Meteor.publish('photos', function(hotelId) {
  return Photos.find({hotelId: hotelId});
});
