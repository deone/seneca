Template.editHotelNav.events({
  'click .nav-item': function(e)  {
    e.preventDefault();
    Session.set('template', e.target.id);
    window.history.pushState(null, null, '/edit/' + this._id + '/' + e.target.id);
  }
});
