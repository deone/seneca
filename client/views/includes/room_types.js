Template.roomTypes.events({
  'change input[name=type]': function(e)  {

    $(".alert").fadeIn();
     
    var currentHotelId = this._id;
    var room = {type: $(e.target).val()};
    var hotel = Hotels.findOne(currentHotelId);

    if (hotel.rooms) {
      Hotels.update(currentHotelId, {$push: {rooms: room}}, function(error)  {
        if(error)
          throwError(error.reason);
      });
    } else  {
      Hotels.update(currentHotelId, {$set: {rooms: [room]}}, function(error)  {
        if(error)
          throwError(error.reason);
      });
    }

    $(".alert").html("<strong>Saved!</strong>");
  },
});

Template.roomTypes.rendered = function() {
  $(".alert").hide();
}
