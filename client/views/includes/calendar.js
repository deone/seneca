Template.calendar.events({
  'click input[name=availability]': function(e)  {

    $(".alert").fadeIn();

    var currentHotelId = this._id;
    var value = $(e.target).val();

    Hotels.update(currentHotelId, {$set: {availability: value}}, function(error) {
      if (error)  {
        throwError(error.reason);
      } else  {
        if (value === 'always') {
          html = "<strong>Always Available</strong>. This is your calendar! After listing your hotel, return here to update your availability."
        } else  {
          html = "<strong>Sometimes Available</strong>. This is your calendar! After listing your hotel, return here to update your availability."
        }
        $(".alert").html(html);
      }
    });
  }
});

Template.calendar.rendered = function() {
  $(".alert").hide();
}
