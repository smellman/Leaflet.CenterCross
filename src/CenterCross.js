
L.CenterCross = L.Class.extend({

	marker : null,
	options : {
		visible : true
	},

	initialize: function (map, options) {
		options = L.setOptions(this, options);
		this.map = map;
		this.setVisible(this.options.visible);
	},

	refresh: function () {
		if (this.options.visible) {
			var pos = this.map.getCenter();
			if (!this.marker) {
				var icon = L.icon({
					iconUrl: 'data:image:png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAHVJREFUWMPt1rENgDAMRNEPi3gERmA0RmAERgmjsAEjhMY0dOBIWHCWTulOL5UN8VmACpRoUdcAU1v19SQaYYQRRhhhhMmIMV//9WGuG/xudmA6C+YApGUGgNF1b0KKjithhBFGGGGE+Rtm9XfL8CHzS8340hzaXWaR1yQVAAAAAABJRU5ErkJggg==',
					iconSize:     [32, 32],
					iconAnchor:   [16, 16]
				});

				this.marker = L.marker(pos, {
					icon: icon,
					clickable: false,
					draggable: false,
					keyboard: false,
					opacity: 0.8,
					zIndexOffset: 0
				});
				this.marker.addTo(this.map);
			} else {
				this.marker.setLatLng(pos);
			}
		} else if (this.marker) {
			this.map.removeLayer(this.marker);
			this.marker = null;
		}
	},

	setVisible: function (on) {
		this.options.visible = on;
		if (this.options.visible) {
			this.map.on('move', this.refresh, this);
		} else {
			this.map.off('move', this.refresh, this);
		}
		this.refresh();
	},

	getVisible: function () {
		return this.options.visible;
	}
});

L.centerCross = function (map, options) {
	return new L.CenterCross(map, options);
};
