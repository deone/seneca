Template.overview.events({
  'blur form': function(e)  {
    var overview = $('textarea[name=overview]').val();

    $("#overview .alert-success").fadeIn();
    Hotels.update(this._id, {$set: {overview: overview}});
    $("#overview .alert-success").text("Saved.").fadeOut(3000);
  }
});
