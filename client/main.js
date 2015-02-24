Lamps = new Mongo.Collection('lamps');

Template.lampManager.created = function() {
    var self = this;
    self.ge = new EventEmitter();
    self.ge.setMaxListeners();
    self.newLamp = new ReactiveVar(null);

    Lamps.find({}).observeChanges({
      changed: function(id, doc) {
        _.extend(doc, {_id:id})
        self.ge.emit('changed', doc );
        // console.debug('change remote '+id);
      }
    });

    self.autorun(function() {
        self.subscription = Meteor.subscribe('lamps');
    });

    // shared with children
    self.ge.on('changed', function (payload) {
        Lamps.update({_id:payload._id}, {$set: _.pick(payload, 'status') });
    });
    
    // Blaze.renderWithData(Template.lamp, {ee:self.ge}, document.getElementById('lamp-placeholder'));
};

Template.lampManager.helpers({
    lamps: function() {
        return Lamps.find({});
    },
    ge: function() {
        return Template.instance().ge;
    }
});

Template.lampManager.events({
    'click .js-create-lamp':function() {
        Lamps.insert( Template.instance().newLamp.get() );
    }
});