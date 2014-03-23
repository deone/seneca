Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function()  {
    return Meteor.subscribe('hotels');
  }
});

Router.map(function() {
  this.route('hotelsList', {path: '/'});
  this.route('newHotel', {path: '/hotels/new'});
  this.route('hotelPage', {
    path: '/hotels/:_id',
    data: function()  {
      return Hotels.findOne(this.params._id);
    }
  });
  this.route('editHotel', {
    path: '/hotels/:_id/edit',
    data: function()  {
      return Hotels.findOne(this.params._id);
    }
  });
});

var requireLogin = function() {
  if (! Meteor.user())  {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    this.stop();
  }
}

Router.before(requireLogin, {only: 'newHotel'});
