RoomTypes = new Meteor.Collection('roomtypes');

RoomTypes.allow({
  insert: ownsDocument,
  update: ownsDocument,
  remove: ownsDocument
});

Meteor.methods({
  addRoomType: function(roomTypeAttributes) {

    var user = Meteor.user();
    
    if (!user)
      throw new Meteor.Error(401, "You need to login to add room types");

    var roomType = RoomTypes.findOne({type: roomTypeAttributes.type, hotelId: roomTypeAttributes.hotelId});

    if (!roomType)  {
      roomType = _.extend(roomTypeAttributes, {
        userId: user._id,
        added: new Date().getTime()
      });

      var roomTypeId = RoomTypes.insert(roomType);

      return roomTypeId;
    } else  {
      RoomTypes.update(roomType._id, 
          {$set: {
                  type: roomTypeAttributes.type,
                  summary: roomTypeAttributes.summary,
                  price: roomTypeAttributes.price
                }
          }
      );
    }

  }
});
