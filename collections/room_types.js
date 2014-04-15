RoomTypes = new Meteor.Collection('roomTypes');

RoomTypes.allow({
  insert: ownsDocument,
  update: ownsDocument,
  remove: ownsDocument
});

Meteor.methods({
  addRoom: function(roomTypeAttributes) {
  }
});
