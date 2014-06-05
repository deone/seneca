Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function()  {
    return Meteor.subscribe('hotels');
  }
});

Router.map(function() {
  this.route('landing', {path: '/'});
  this.route('hotelsList', {path: '/hotels'});
  this.route('newHotel', {path: '/hotels/new'});
  this.route('editHotel', {
    path: '/hotels/:_id/edit',
    data: function()  {
      return Hotels.findOne(this.params._id);
    },
    waitOn: function()  {
      return [Meteor.subscribe('roomtypes', this.params._id), Meteor.subscribe('photos', this.params._id)];
    }
  });

  this.route('viewHotel', {
    path: '/hotels/:_id',
    data: function()  {
      return Hotels.findOne(this.params._id);
    }
  });
});

var requireLogin = function(pause) {
  if (! Meteor.user())  {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    pause();
  }
}

Router.onBeforeAction(requireLogin, {only: ['newHotel', 'editHotel']});
Router.onBeforeAction(function()  {
  clearErrors();
});
Router.onBeforeAction('loading');
