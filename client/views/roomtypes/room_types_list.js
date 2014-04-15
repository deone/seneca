Template.roomTypesList.helpers({
  roomtypes: function() {
    return RoomTypes.find({hotelId: this._id});
  }
});
