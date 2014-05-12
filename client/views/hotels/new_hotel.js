Template.newHotel.events({
  'submit form': function(e)  {
    e.preventDefault();

    var hotel = {
      type: $(e.target).find('[name=type]:checked').val(),
      name: $(e.target).find('[name=name]').val(),
      city: $(e.target).find('[name=city]').val()
    }

    Meteor.call('post', hotel, function(error, id)  {
      if (error)  {
        throwError(error.reason);
        // if (error.error === 302)
          // Router.go('hotelPage', {_id: error.details});
      } else  {
        Session.set('newHotel', true);
        Router.go('editHotel', {_id: id});
      }
    });
  }
});

Template.newHotel.rendered = function() {
  var options = {
    types: ['(cities)']
  };
  var input = document.getElementById('city');
  new google.maps.places.Autocomplete(input, options);
};
