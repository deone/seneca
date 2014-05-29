Template.photoUpload.events({
  'click .btn-primary': function(e)  {
    $('.seneca-file-input').click();
  },

  'change .seneca-file-input': function(e)  {
    var hotelId = this._id;

    FS.Utility.eachFile(e, function(file) {

      var fsFile = new FS.File(file);

      fsFile.owner = Meteor.userId();
      fsFile.hotelId = hotelId;

      Photos.insert(fsFile, function(err, fileObj)  {
        console.log(err, fileObj);
      });

    });
  }
});
