Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function()  {
    // return [Meteor.subscribe('hotels'), Meteor.subscribe('reasons')];
    return Meteor.subscribe('hotels');
  }
});

Router.map(function() {
  this.route('landing', {path: '/'});
  this.route('hotelsList', {path: '/hotels'});
  this.route('newHotel', {path: '/hotels/new'});
  this.route('editHotel', {
    path: '/edit/:_id',
    data: function()  {
      return Hotels.findOne(this.params._id);
    }
  });
  this.route('viewHotel', {
    path: '/hotels/:_id',
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

//
var setTemplate = function()  {
  Session.set('template', 'calendar');
}
Router.onRun(setTemplate, {only: 'editHotel'});
//

Router.onBeforeAction(requireLogin, {only: 'newHotel'});
Router.onBeforeAction(function()  {
  clearErrors();
});
