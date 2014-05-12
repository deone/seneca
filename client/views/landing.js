Template.landing.rendered = function() {
  var options = {
    types: ['(cities)']
  };
  var input = document.getElementById('where-landing');
  new google.maps.places.Autocomplete(input, options);
};
