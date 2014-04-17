Template.roomTypesList.helpers({
  roomtypes: function() {
    return RoomTypes.find({hotelId: this._id});
  }
});

Template.roomType.events({
  'click .list-group-item': function(e, t)  {
    e.preventDefault();
    form = $('.form-horizontal');

    form.find('input[name=type]').val(t.data.type);
    form.find('textarea[name=summary]').val(t.data.summary);
    form.find('input[name=price]').val(t.data.price);
  },
});
