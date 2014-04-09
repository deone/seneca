Template.calendar.events({
  'click input[name=availability]': function(e)  {

    var currentHotelId = this._id;
    var value = $(e.target).val();

    Hotels.update(currentHotelId, {$set: {availability: value}}, function(error) {
      if (error)  {
        throwError(error.reason);
      } else  {
        if (value === 'always') {
          Session.set('calendar', 'Always Available');
        } else  {
          Session.set('calendar', 'Sometimes Available');
        }
        $(".alert").fadeIn();
      }
    });
  }
});

Template.calendar.helpers({
  calendarInfo: function()  {
    return Session.get('calendar');
  }
});

Template.calendar.rendered = function()  {
  $(".alert").hide();
}
