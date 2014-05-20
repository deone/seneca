Template.roomTypesList.helpers({
  roomtypes: function() {
    return RoomTypes.find({hotelId: this._id});
  }
});

Template.roomType.events({
  'click .list-group-item': function(e, t)  {
    e.preventDefault();
    form = $('#add-room-type form');

    form.find('input[name=type]').val(t.data.type);
    form.find('textarea[name=summary]').val(t.data.summary);
    form.find('input[name=price]').val(t.data.price);
    form.find('input[name=id]').val(t.data._id);

    $('.btn-danger').show();
  },

  /*
   * Important note:
   * The t that's passed into the event function is an object. It has functions
   * (find, findAll) to reach elements and a data object (data from db).
   * On the other hand, e.target is the HTML element on which the event was fired.
   */

});
