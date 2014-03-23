Template.newHotel.events({
  'submit form': function(e)  {
    e.preventDefault();

    var hotel = {
      name: $(e.target).find('[name=name]').val(),
      website: $(e.target).find('[name=website]').val(),
      description: $(e.target).find('[name=description]').val()
    }

    Meteor.call('post', hotel, function(error, id)  {
      if (error)
        return alert(error.reason);

      Router.go('hotelsList');
    });
  }
});
