Template.landing.helpers({
  hotels: function()  {
    return Hotels.find({}, {sort: {listed: -1}});
  }
});
