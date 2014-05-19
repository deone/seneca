Template.header.rendered = function() {
  var options = {
    types: ['(cities)']
  };
  var input = document.getElementById('where-header');
  new google.maps.places.Autocomplete(input, options);
};

Template.header.events({
  'keypress #where-header': function()  {
    var pacContainerInitialized = false;

    if (!pacContainerInitialized) {
      $('.pac-container').css('z-index', '9999');
      pacContainerInitialized = true;
    }
  }
});
