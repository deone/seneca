Template.roomTypesList.helpers({
  roomtypes: function() {
    return RoomTypes.find({hotelId: this._id});
  }
});

Template.roomType.events({
  'click .list-group-item': function(e, t)  {
    e.preventDefault();
    form = $('#add-room-type');

    form.find('input[name=type]').val(t.data.type);
    form.find('textarea[name=summary]').val(t.data.summary);
    form.find('input[name=price]').val(t.data.price);
  },

  'mouseover .list-group-item': function(e, t)  {
    elem = t.find('i');
    $(elem).removeClass('fa-tablet').addClass('fa-minus-circle').css('color', 'red');
  },

  'mouseout .list-group-item': function(e, t)  {
    elem = t.find('i');
    $(elem).removeClass('fa-minus-circle').addClass('fa-tablet').css('color', 'inherit');
  },

  'click .fa-minus-circle': function(e, t)  {
    RoomTypes.remove(t.data._id);
  }

});

Template.roomTypesList.rendered = function() {
  $(".alert-success").hide();
}
