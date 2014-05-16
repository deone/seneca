Template.editHotel.events({
  'click #delete': function(e)  {
    e.preventDefault();

    // Save reason
    var reason = document.getElementById('reason').value;
    Reasons.insert({userId: Meteor.user()._id, for: 'delete hotel', message: reason});

    // Delete hotel
    var currentHotelId = this._id;
    Hotels.remove(currentHotelId);

    // After upgrading Meteor to 0.8.0, .fade stopped fading with modal
    // Only works in the absence of Router.go(), hence the need to fadeOut() explicitly.
    $('.fade').fadeOut();

    Router.go('hotelsList'); // This should route to user's listings page. Hotelslist should list all hotels, not user hotels.
  },

  'click #show-delete-info': function(e)  {
    e.preventDefault();
    var checkbox = document.getElementById('understand');
    var deleteButton = document.getElementById('delete');

    checkbox.onchange = function()  {
      if(this.checked)  {
        deleteButton.disabled = false;
      } else  {
        deleteButton.disabled = true;
      }
    }
  },

  'click a[href*=#]:not([href=#])': function(e) {
    e.preventDefault();
    if (location.pathname.replace(/^\//, '') == e.target.pathname.replace(/^\//, '') || location.hostname == e.target.hostname) {
      var target = $(e.target.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - 30
        }, 1000);
        return false;
      }
    }
  }

});

Template.editHotel.rendered = function()  {
  if (Session.get('newHotel'))  {
    var options = {
      backdrop: 'static',
    };
    $('#welcome').modal(options);
  }

  Session.set('newHotel', false);
};
