FS.debug = true;

var thumbnailFormat = {width: 100, height: 100};

var fullPhotoStore = new FS.Store.FileSystem('photos', {path: '~/uploads/full'});
var thumbnailStore = new FS.Store.FileSystem('thumbs', {
  path: '~/uploads/thumbs',
  transformWrite: function(file, readStream, writeStream) {
    // gm(readStream, file.name).resize('36', '36').stream().pipe(writeStream);
    readStream.pipe(writeStream);
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
