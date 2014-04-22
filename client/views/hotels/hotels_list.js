Template.hotelsList.helpers({
  hotels: function()  {
    return Hotels.find({userId: Meteor.user()._id}, {sort: {listed: -1}});
  }
});
