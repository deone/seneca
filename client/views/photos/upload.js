Template.photoUpload.events({
  'click .btn-primary': function(e)  {
    $('.seneca-file-input').click();
  },

  'change .seneca-file-input': function(e)  {
    FS.Utility.eachFile(e, function(file) {

      var fsFile = new FS.File(file);
      fsFile.metadata = {owner: Meteor.userId()};

      Photos.insert(fsFile, function(err, fileObj)  {
        console.log(err, fileObj);
      });

    });
  }
});
