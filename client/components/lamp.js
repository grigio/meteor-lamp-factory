Template.lamp.created = function () {
	var self = this;
	self.status = new ReactiveVar(self.data && self.data.status || 'off');

	self.le = self.data ? self.data.ee : new EventEmitter();
	self._id = self.data && self.data.lid || ''; //|| 'null';

	self.toggleVal = function(val) {
		var newStatus = (val === 'off') ? 'on' : 'off';
		console.debug('change local '+self._id);
		self.le.emit('changed', {_id:self._id, status:newStatus});
	}

	// shared with parent
	self.le.on('changed', function(payload) {
		if (payload._id === self._id)
			self.status.set(payload.status);
	});
}

Template.lamp.helpers({
	_id: function (argument) {
		return Template.instance()._id;
	},
	status: function () {
		return Template.instance().status.get();
	}
});

Template.lamp.events({
	'click .js-switch':function (ev,template) {
		template.toggleVal(template.status.get());
	}
});