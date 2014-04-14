Rooms = new Meteor.Collection('rooms');

Rooms.allow({
  insert: ownsDocument,
  update: ownsDocument,
  remove: ownsDocument
});

Meteor.methods({
  addRoom: function(roomAttributes) {
  }
});
