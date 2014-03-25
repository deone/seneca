Hotels = new Meteor.Collection('hotels');

Hotels.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Hotels.deny({
  update: function(userId, hotel, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'name', 'website').length > 0);
  }
});

Meteor.methods({
  post: function(hotelAttributes)  {
    var user = Meteor.user(), hotelWithSameWebsite = Hotels.findOne({website: hotelAttributes.website});

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to post new stories");

    // ensure the hotel has a name
    if (!hotelAttributes.name)
      throw new Meteor.Error(422, 'Please fill in a name');

    // check that there are no previous hotels with the same website
    if (hotelAttributes.website && hotelWithSameWebsite)  {
      throw new Meteor.Error(302, 'This hotel has already been posted', hotelWithSameWebsite._id);
    }

    // pick out the whitelisted keys
    var hotel = _.extend(_.pick(hotelAttributes, 'website', 'name', 'description'), {
      userId: user._id,
      manager: user.emails[0].address,
      listed: new Date().getTime()
    });

    var hotelId = Hotels.insert(hotel);

    return hotelId;
  }
});
