Template.editHotel.events({
  /* 'submit form': function(e)  {
    e.preventDefault();

    var currentHotelId = this._id;

    var hotelProperties = {
      type: $(e.target).find('[name=type]').val(),
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
  }, */

  'click .delete': function(e)  {
    e.preventDefault();

    var currentHotelId = this._id;
    Hotels.remove(currentHotelId);
    // Save reason
    // Reason.insert({type: 'delete hotel', message: 'I'm fed up with your service'});
    Router.go('hotelsList');
  },

  'click #show-delete-info': function(e)  {
    var checkbox = document.getElementById('understand');
    var deleteButton = document.getElementById('delete');

    checkbox.onchange = function()  {
      if(this.checked)  {
        deleteButton.disabled = false;
      } else  {
        deleteButton.disabled = true;
      }
    }
  }

});

Template.editHotel.rendered = function()  {
  if (Session.get('newHotel'))  {
    var options = {
      backdrop: 'static',
    };
    $('#welcome').modal(options);
  }
  Session.set('newHotel', false);
};
