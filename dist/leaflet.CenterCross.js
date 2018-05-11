/*
	Leaflet.CenterCross, a plugin that adds cross image on center to Leaflet powered maps.
	Original program is developed by Geospatial Information Authority of Japan.
	(c) 2015, Taro Matsuzawa and Geospatial Information Authority of Japan

	https://github.com/smellman/Leaflet.CenterCross
	http://leafletjs.com
	Original: https://github.com/gsi-cyberjapan/gsimaps
*/
!function(t,e,i){L.centerCrossVersion="0.0.4",L.CenterCross=L.Layer.extend({marker:null,options:{visible:!0},initialize:function(t){t=L.setOptions(this,t)},addTo:function(t){return this.onAdd(t),this},onAdd:function(t){this._map=t,this.setVisible(this.options.visible)},onRemove:function(t){t.off("move",this.refresh,this),this.marker&&(t.removeLayer(this.marker),this.marker=null)},refresh:function(){if(this.options.visible){var t=this._map.getCenter();if(this.marker)this.marker.setLatLng(t);else{var e=L.icon({iconUrl:"data:image:png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAHVJREFUWMPt1rENgDAMRNEPi3gERmA0RmAERgmjsAEjhMY0dOBIWHCWTulOL5UN8VmACpRoUdcAU1v19SQaYYQRRhhhhMmIMV//9WGuG/xudmA6C+YApGUGgNF1b0KKjithhBFGGGGE+Rtm9XfL8CHzS8340hzaXWaR1yQVAAAAAABJRU5ErkJggg==",iconSize:[32,32],iconAnchor:[16,16]});this.marker=L.marker(t,{icon:e,clickable:!1,draggable:!1,keyboard:!1,opacity:.8,zIndexOffset:0}),this.marker.addTo(this._map)}}else this.marker&&(this._map.removeLayer(this.marker),this.marker=null)},setVisible:function(t){return this.options.visible=t,this.options.visible?this._map.on("move",this.refresh,this):this._map.off("move",this.refresh,this),this.refresh(),this},getVisible:function(){return this.options.visible}}),L.centerCross=function(t){return new L.CenterCross(t)},L.Control.CenterCross=L.Control.extend({options:{position:"topleft",toggleText:"C",toggleTitle:"Toggle Center Cross",show:!1},initialize:function(t){L.Control.prototype.initialize.call(this,t)},onAdd:function(t){var e=L.DomUtil.create("div","leaflet-center-cross leaflet-bar");return this._map=t,this._toggleButton=this._createButton(e,this),this._centerCross=L.centerCross({visible:this.options.show}).addTo(this._map),this._updateButton(),e},_createButton:function(t,e){var i=L.DomUtil.create("a","leaflet-center-cross-toggle",t);i.innerHTML=this.options.toggleText,i.href="#",i.title=this.options.toggleTitle;var o=L.DomEvent.stopPropagation;return L.DomEvent.on(i,"click",o).on(i,"mousedown",o).on(i,"dblclick",o).on(i,"click",L.DomEvent.preventDefault).on(i,"click",this._toggle,e),i},_toggle:function(){var t=!this._centerCross.getVisible();this._centerCross.setVisible(t),this._updateButton()},_updateButton:function(){var t=this._centerCross.getVisible(),e="leaflet-disabled";L.DomUtil.removeClass(this._toggleButton,e),t&&L.DomUtil.addClass(this._toggleButton,e)}}),L.control.centerCross=function(t){return new L.Control.CenterCross(t)}}(window,document);