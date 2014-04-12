Template.roomTypes.events({
  'blur form': function(e) {

    var currentHotelId = this._id;
    var hotel = Hotels.findOne(currentHotelId);

    var type = $('input[name=type]').val(), 
      summary = $('textarea[name=summary]').val(), 
      price = $('input[name=price]').val();

    var rooms = hotel.rooms;
    if (!rooms)
      var rooms = {};

    rooms[type] = {summary: summary, price: price};

    $(".alert-success").fadeIn();
    Hotels.update(currentHotelId, {$set: {rooms: rooms}}, function(error)  {
      if(error)
        throwError(error.reason);
    });
    $(".alert-success").html("<strong>Saved!</strong>").fadeOut(5000);

  }

});

Template.roomTypes.rendered = function() {
  $(".alert").hide();
}
