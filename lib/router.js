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
    },
    onAfterAction: function() {
      Session.set('template', 'calendar');
    }
  });

  this.route('editHotel', {
    path: '/edit/:_id/calendar',
    data: function()  {
      return Hotels.findOne(this.params._id);
    },
    onAfterAction: function() {
      Session.set('template', 'calendar');
    }
  });

  this.route('editHotel', {
    path: '/edit/:_id/roomTypes',
    data: function()  {
      return Hotels.findOne(this.params._id);
    },
    onAfterAction: function() {
      Session.set('template', 'roomTypes');
    }
  });

  this.route('editHotel', {
    path: '/edit/:_id/pricing',
    data: function()  {
      return Hotels.findOne(this.params._id);
    },
    onAfterAction: function() {
      Session.set('template', 'pricing');
    }
  });

  this.route('editHotel', {
    path: '/edit/:_id/listing',
    data: function()  {
      return Hotels.findOne(this.params._id);
    },
    onAfterAction: function() {
      Session.set('template', 'listing');
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

Router.onBeforeAction(requireLogin, {only: 'newHotel'});
Router.onBeforeAction(function()  {
  clearErrors();
});
