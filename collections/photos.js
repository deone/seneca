Photos = new FS.Collection("photos", {
  stores: [new FS.Store.FileSystem("photos", {path: "~/uploads"})],
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
