Template.calendar.events({
  'click input[name=availability]': function(e)  {
    e.preventDefault();

    var currentHotelId = this._id;
    var availability = {availability: $(e.target).val()};

    Hotels.update(currentHotelId, {$set: availability}, function(error) {
      if (error)
        throwError(error.reason);
    });
  }
});
