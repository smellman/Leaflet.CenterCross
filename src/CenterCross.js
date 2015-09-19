
L.CenterCross = L.Class.extend({

	marker : null,
	options : {
		visible : true
	},

	initialize: function (options) {
		options = L.setOptions(this, options);
	},

	addTo: function(map) {
		this.onAdd(map);
		return this;
	},

	onAdd: function(map) {
		this._map = map;
		this.setVisible(this.options.visible);
	},

	onRemove: function(map) {
		this._map.off('move', this.refresh, this);
		if (this.marker) {
			this._map.removeLayer(this.marker);
			this.marker = null;
		}
	},

	refresh: function () {
		if (this.options.visible) {
			var pos = this._map.getCenter();
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
				this.marker.addTo(this._map);
			} else {
				this.marker.setLatLng(pos);
			}
		} else if (this.marker) {
			this._map.removeLayer(this.marker);
			this.marker = null;
		}
	},

	setVisible: function (on) {
		this.options.visible = on;
		if (this.options.visible) {
			this._map.on('move', this.refresh, this);
		} else {
			this._map.off('move', this.refresh, this);
		}
		this.refresh();
		return this;
	},

	getVisible: function () {
		return this.options.visible;
	}
});

L.centerCross = function (options) {
	return new L.CenterCross(options);
};
