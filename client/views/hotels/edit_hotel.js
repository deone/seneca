Template.editHotel.events({
  'submit form': function(e)  {
    e.preventDefault();

    var currentHotelId = this._id;

    var hotelProperties = {
      website: $(e.target).find('[name=website]').val(),
      name: $(e.target).find('[name=name]').val()
    }

    Hotels.update(currentHotelId, {$set: hotelProperties}, function (error) {
      if (error)  {
        // display the error to the user
        throwError(error.reason);
      } else  {
        Router.go('hotelPage', {_id: currentHotelId});
      }
    });
  },

  'click .delete': function(e)  {
    e.preventDefault();

    if (confirm("Delete this hotel?"))  {
      var currentHotelId = this._id;
      Hotels.remove(currentHotelId);
      Router.go('hotelsList');
    }
  }
});
