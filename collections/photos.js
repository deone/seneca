var thumbnailFormat = {width: 100, height: 100};

var fullPhotoStore = new FS.Store.FileSystem('photo', {path: '~/uploads/photos'});
var thumbnailStore = new FS.Store.FileSystem('thumb', {
  path: '~/uploads/thumbs',
  transformWrite: function(file, readStream, writeStream) {
    gm(readStream, file.name).resize(thumbnailFormat.width, thumbnailFormat.height).stream(function (err, stdout, stderr)  {
      if (err) {
        console.error(err.toString());
      } else {
        stderr.on('data', function (err) {
          console.error(err.toString());
        });
        stdout.pipe(writeStream);
      }
    });
    // readStream.pipe(writeStream);
  }
});

Photos = new FS.Collection("photos", {
  stores: [fullPhotoStore, thumbnailStore],
  filter: {
    allow: {
      contentTypes: ['image/*'],
      extensions: ['JPG', 'jpg', 'jpeg', 'JPEG', 'png', 'PNG']
    }
  }
});

Photos.allow({
  insert: function(userId, doc) {
    return (userId && doc.owner === userId);
  },
  update: function(userId, doc, fieldNames, modifier) {
    return (userId === doc.owner);
  }
});
