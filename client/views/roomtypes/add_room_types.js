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
  'blur form': function(e) {

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

});
