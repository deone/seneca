showSuccessFeedback = function(e) {
  $(e.target).next('.form-control-feedback').remove();
  $(e.target).parents('.form-group').removeClass('has-error').addClass('has-success');
  $(e.target).after('<span class="glyphicon glyphicon-ok form-control-feedback"></span>');
}

showErrorFeedback = function(elem)  {
  elem.next('.form-control-feedback').remove();
  elem.parents('.form-group').removeClass('has-success').addClass('has-error');
  elem.after('<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
}

Template.addRoomTypes.events({
  'change input[name=type]': showSuccessFeedback,
  'click .btn-danger': function(e, t)  {
    e.preventDefault();

    var id = $('input[name=id]').val();

    bootbox.confirm("Delete this room type?", function(result) {
      if (result) {
        $(':input').val('');
        $('#add-room-type button').hide();
        RoomTypes.remove(id);
      }
    });
  },

  'blur form': function(e) {
    // Don't attempt to save if event is fired by delete button
    if (e.target.id !== 'delete-btn') {

      var currentHotelId = this._id;

      var typeEl = $('input[name=type]'), 
        summaryEl = $('textarea[name=summary]'),
        priceEl = $('input[name=price]');

      var roomType = {
        hotelId: currentHotelId,
        type: typeEl.val(), 
        summary: summaryEl.val(), 
        price: priceEl.val()
      };

      if (!roomType.type || roomType.type === " ") {
        showErrorFeedback(typeEl);
        typeEl.focus();
        return;
      }

      $("#add-room-type .alert-success").fadeIn();
      Meteor.call('addRoomType', roomType, function(error, result)  {
        if (error)  {
          throwError(error.reason);
        } else  {
          $("#add-room-type .alert-success").text("Saved.").fadeOut(3000);
        }

      });
    }
  }

});

Template.addRoomTypes.rendered = function() {
  $('.btn-danger').hide();
}
