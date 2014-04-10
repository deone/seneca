var validate = function(e) {
  value = $(e.target).val();

  if (!value)  {
    throwError("Please enter room " + e.target.name);
    e.target.focus();
  }

  clearErrors();

}

Template.roomTypes.events({
  'blur input[name=type]': validate,
  'blur textarea[name=details]': validate,
  'change input[name=price]': function(e) {
    var currentHotelId = this._id;
    var hotel = Hotels.findOne(currentHotelId);
    var room = {
      type: $('input[name=type]').val(),
      details: $('textarea[name=details]').val(),
      price: $(e.target).val()
    }

    if (!room.type || !room.details || !room.price)  {
      throwError("All fields are mandatory");
    } else  {
      $(".alert").fadeIn();
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
    }

    $(".alert").html("<strong>Saved!</strong>").fadeOut(2000);
  }
});

Template.roomTypes.rendered = function() {
  $(".alert").hide();
}
