# Leaflet.CenterCross

Leaflet.CenterCross, a plugin that adds cross image on center to Leaflet powered maps.

Original program is developed by Geospatial Information Authority of Japan.

https://github.com/gsi-cyberjapan/gsimaps

Structure and build scripts are based Leaflet.draw.

https://github.com/Leaflet/Leaflet.draw

# How to use

include javascript.

```html
<script src="../dist/leaflet.CenterCross.js"></script>
```

add follow code:

```javascript
var control = L.control.centerCross();
map.addControl(control);
```

# Control.centerCross

CenterCross control provides toggle switch of center cross.

```javascript
var control = L.control.centerCross({show: true, position: "topright"});
map.addControl(control);
```

## Creation

|Factory|Description|
|-------|-----------|
|L.control.centerCross(<[Control.CenterCross options](#control_centercross_options)> *options?*)|Create a center cross control.|

## <a name="control_centercross_options"> Options

|Option|Type|Default|Description|
|------|-----------|-------------|
|position|String|'topleft|See [Control Positions](http://leafletjs.com/reference.html#control-positions)|
|toggleText|String|'C'|control's text|
|toggleTitle|String|'Toggle Center Cross'|control's title, show on mouse over in control like tooltip|
|show|Boolean|false|If true, show center cross when addControl|


# centerCross

Used to put center cross object in center of map.

```javascript
var centerCross = L.centerCross(map);
centerCross.setVisible(true);
```

## Creation

|Factory|Description|
|-------|-----------|
|L.centerCross(<[Map ](http://leafletjs.com/reference.html#map-class)> *map*, <[CenterCross options](#centercross_options)> *options?*)|Create a center cross object and put in map.|

## <a name="centercross_options"> Options

|Option|Type|Default|Description|
|------|-----------|-------------|
|visible|Boolean|true|If true, add center cross to map.|

## Methods

|Method|Returns|Description|
|------|------|-----------|
|getVisible()|Boolean|Reterns true if center cross show in map.|
|setVisible(< Boolean > *on*)|null|Update visible status|
