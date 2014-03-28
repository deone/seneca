Reasons = new Meteor.Collection('reasons');

Reasons.allow({
  insert: ownsDocument
});
