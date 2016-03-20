window.notifications = {

	emit: function (name, data) {
		$('body').trigger(name, data);
	},

	on: function (name, callback) {
		$('body').on(name, callback);
	}

};
