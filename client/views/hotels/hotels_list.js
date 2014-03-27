Template.hotelsList.helpers({
  hotels: function()  {
    return Hotels.find({manager: Meteor.user().emails[0].address}, {sort: {listed: -1}});
  }
});
