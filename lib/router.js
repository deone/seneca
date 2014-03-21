Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function()  {
    return Meteor.subscribe('hotels');
  }
});

Router.map(function() {
  this.route('hotelsList', {path: '/'});
});

Router.map(function() {
  this.route('hotelsList', {path: '/'});
  this.route('hotelPage', {
    path: '/hotels/:_id',
    data: function()  {
      return Hotels.findOne(this.params._id);
    }
  });
});
