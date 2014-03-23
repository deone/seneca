Template.hotelItem.helpers({
  ownHotel: function()  {
    return this.userId == Meteor.userId();
  },

  domain: function()  {
    var a = document.createElement('a');
    a.href = this.website;
    return a.hostname;
  }
});
