Template.header.rendered = function() {
  var options = {
    types: ['(cities)']
  };
  var input = document.getElementById('where-header');
  new google.maps.places.Autocomplete(input, options);
};
