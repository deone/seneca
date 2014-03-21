Template.hotelItem.helpers({
  domain: function()  {
    var a = document.createElement('a');
    a.href = this.website;
    return a.hostname;
  }
});
