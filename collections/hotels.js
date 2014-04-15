Hotels = new Meteor.Collection('hotels');

Hotels.allow({
  update: ownsDocument,
  remove: ownsDocument
});

/* Hotels.deny({
  update: function(userId, hotel, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'type', 'name').length > 0);
  }
}); */

Meteor.methods({
  post: function(hotelAttributes)  {
    var user = Meteor.user();

    if (!user)
      throw new Meteor.Error(401, "You need to login to post new stories");

    if (!hotelAttributes.type)
      throw new Meteor.Error(422, 'Please specify hotel type');

    if (!hotelAttributes.name)
      throw new Meteor.Error(422, 'Please fill in a name'); 

    if (!hotelAttributes.city)
      throw new Meteor.Error(422, 'Please fill in city');

    // check that there are no previous hotels with the same website
    /* var hotelWithSameWebsite = Hotels.findOne({website: hotelAttributes.website});

    if (hotelAttributes.website && hotelWithSameWebsite)  {
      throw new Meteor.Error(302, 'This hotel has already been posted', hotelWithSameWebsite._id);
    } */

    // pick out the whitelisted keys
    // var hotel = _.extend(_.pick(hotelAttributes, 'type', 'name', 'city'), {
    var hotel = _.extend(hotelAttributes, {
      userId: user._id,
      // manager: user.emails[0].address,
      listed: new Date().getTime()
    });

    var hotelId = Hotels.insert(hotel);

    return hotelId;
  }
});
