FS.debug = true;

// Get Amazon URL
/* S3_FULL_SIZE_FOLDER = 'full/';
S3_THUMBNAIL_SIZE_FOLDER = 'thumbs/';
S3_BASE_URL = 'https://s3-us-west-2.amazonaws.com/seneca/';
S3_FULL_BASE_URL = S3_BASE_URL + S3_FULL_SIZE_FOLDER;
S3_THUMBNAIL_BASE_URL = S3_BASE_URL + S3_THUMBNAIL_SIZE_FOLDER;

FS.File.prototype.directUrl = function (baseUrl) {
  console.log(baseUrl);
  var self = this;
  // Make sure the file object is mounted in a cfs
  if (self.isMounted()) {
    var fileKey = encodeURIComponent(self.collectionName) + '/' + encodeURIComponent(self._id + '-' + self.name());
    return baseUrl + fileKey;
  }
  return null;
};

FS.File.prototype.fullUrl = function () {
  return this.directUrl(S3_FULL_BASE_URL);
};

FS.File.prototype.thumbnailUrl = function () {
  return this.directUrl(S3_THUMBNAIL_BASE_URL);
}; */

var thumbnailFormat = {width: 100, height: 100};

var thumbTransform = function(file, readStream, writeStream) {
  gm(readStream, file.name)
    .resize(thumbnailFormat.width, thumbnailFormat.height)
    .stream(function (err, stdout, stderr)  {
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

// cfs-filesystem
//
/* var fullPhotoStore = new FS.Store.FileSystem('photo', {path: '~/uploads/photos'});
var thumbnailStore = new FS.Store.FileSystem('thumb', {
  path: '~/uploads/thumbs',
  transformWrite: thumbTransform
}); */

// cfs-s3
var s3options = Meteor.isServer ? {
  region: Meteor.settings.AWS.region,
  accessKeyId: Meteor.settings.AWS.accessKeyId,
  secretAccessKey: Meteor.settings.AWS.secretAccessKey,
  bucket: 'seneca',
  // ACL: 'public-read'
} : {};

var photoStore = new FS.Store.S3("full", _.extend({}, s3options, {folder: 'full/'}));
var thumbStore = new FS.Store.S3("thumb", _.extend({}, s3options, {folder: 'thumbs/', transformWrite: thumbTransform}));

Photos = new FS.Collection("photos", {
  stores: [thumbStore, photoStore],
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
    return (userId && userId === doc.owner);
  },
  download: function()  {
    return true;
  }
});
