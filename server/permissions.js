Lamps = new Mongo.Collection('lamps');

// permissions
Lamps.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  }
});

// publications
Meteor.publish("lamps", function () {
  var res = Lamps.find({});
  return res;
});