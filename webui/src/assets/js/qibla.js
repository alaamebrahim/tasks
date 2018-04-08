function getParameterByName(a) { return (a = (new RegExp("[?&]" + a + "=([^&]*)")).exec(window.location.search)) && decodeURIComponent(a[1].replace(/\+/g, " ")) }
var lat = getParameterByName("lat") ? parseFloat(getParameterByName("lat")) : 51.50093, lng = getParameterByName("lng") ? parseFloat(getParameterByName("lng")) : -.14279, zoom = getParameterByName("zoom") ? parseInt(getParameterByName("zoom")) : 5, type = getParameterByName("type") ? getParameterByName("type") : "roadmap", qbLat = 21.422508, qbLng = 39.826138, addrBox, mapDiv, map, line, country = "GB", xMrk, qbMrk, path, emulator, browser = navigator.userAgent, gaId = "UA-1059171-11";
function init() { mapDiv = document.getElementById("map"); addrBox = document.getElementById("addr"); initMap(); flyCrow(); google.maps.event.addDomListener(window, "resize", function () { google.maps.event.trigger(map, "resize"); map.setCenter({ lat: lat, lng: lng }); flyCrow(); emulator && emulator.draw() }) }
function initMap() {
    map = new google.maps.Map(mapDiv, { center: { lat: lat, lng: lng }, zoom: zoom, streetViewControl: !1, mapTypeId: type }); xMrk = new google.maps.Marker({ position: { lat: lat, lng: lng }, map: map, icon: { url: "sprite3.png", size: new google.maps.Size(20, 20), origin: new google.maps.Point(0, 62), anchor: new google.maps.Point(10, 10) } }); qbMrk = new google.maps.Marker({ position: { lat: qbLat, lng: qbLng }, map: map, icon: { url: "kaba_16x.png" } }); var a = new google.maps.places.Autocomplete(addrBox); a.bindTo("bounds", map); geo = new google.maps.Geocoder;
    google.maps.event.addListener(a, "place_changed", function () { var b = a.getPlace().geometry; b.viewport ? map.fitBounds(b.viewport) : (map.setCenter(b.location), map.setZoom(15)); map.setMapTypeId("satellite"); lat = b.location.lat(); lng = b.location.lng(); flyCrow(); ga("send", "event", "address", "select") }); google.maps.event.addListener(map, "drag", function () { var a = map.getCenter(); lat = a.lat(); lng = a.lng(); flyCrow() }); google.maps.event.addListener(map, "center_changed", function () {
        var a = map.getCenter(); lat = a.lat(); lng = a.lng();
        flyCrow()
    }); -1 == browser.search(/Chrome|Safari|Firefox|MSIE|Trident|Opera/i) && (emulatorControl = new EmulatorControl(map), map.controls[google.maps.ControlPosition.RIGHT].push(emulatorControl))
} function setMap(a, b, c, d) { lat = a; lng = b; map.setCenter({ lat: lat, lng: lng }); map.setZoom(c); d && map.setMapTypeId(d); flyCrow() } function setViewport(a, b) { map.fitBounds(a); lat = b.lat(); lng = b.lng(); flyCrow() }
function geocode() { var a = addrBox.value; 1 < a.length && (geo.geocode({ address: a, region: country }, geoResults), ga("send", "event", "address", "geocode")); return !1 } function geoResults(a, b) { b == google.maps.GeocoderStatus.OK && a[0] && setViewport(a[0].geometry.viewport, a[0].geometry.location) }
function flyCrow() { path = []; path.push({ lat: lat, lng: lng }); path.push({ lat: qbLat, lng: qbLng }); line && line.setMap(null); line = new google.maps.Polyline({ map: map, path: path, geodesic: !0, strokeColor: "#FF0000", strokeOpacity: 1, strokeWeight: 2, icons: [{ icon: { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, strokeWeight: 1.5, fillColor: "yellow", fillOpacity: 1, scale: 3 }, offset: "95px", repeat: "100px" }] }); xMrk.setPosition({ lat: lat, lng: lng }) }
function EmulatorControl(a) { var b = document.createElement("div"); b.id = "compass"; b.title = 'Show a line to the Qibla'; google.maps.event.addDomListener(b, "click", function () { emulator = new Emulator(a); ga("send", "event", "emulator", "start") }); return b } function Emulator(a) { this.map = a; this.div = null; this.mapDiv = a.getDiv(); this.setMap(a) } Emulator.prototype = new google.maps.OverlayView;
Emulator.prototype.onAdd = function () { this.div = document.createElement("div"); this.div.id = "emulator"; google.maps.event.addListener(this.map, "zoom_changed", function () { emulator.draw() }); google.maps.event.addListener(this.map, "idle", function () { emulator.draw() }); google.maps.event.addListener(this.map, "maptypeid_changed", function () { emulator.draw() }); this.getPanes().overlayLayer.appendChild(this.div) };
Emulator.prototype.draw = function () {
    var a = this.getProjection().fromLatLngToDivPixel(this.map.getCenter()), b = this.mapDiv.offsetWidth, c = this.mapDiv.offsetHeight; 640 < b && (b = 640); 640 < c && (c = 640); a = "left:" + (a.x - parseInt(b / 2)) + "px;top:" + (a.y - parseInt(c / 2)) + "px;width:" + b + "px;height:" + c + "px;"; a += "background-image: url('//maps.google.com/maps/api/staticmap?center=" + this.map.getCenter().toUrlValue(5) + "&zoom=" + this.map.getZoom() + "&size=" + b + "x" + c + "&maptype=" + this.map.getMapTypeId() + "&path=color:0xff0000|weight:2|geodesic:true|" +
        this.map.getCenter().toUrlValue(5) + "|" + qbLat + "," + qbLng + "&sensor=false');"; this.div.style.cssText = a; ga("send", "event", "emulator", "draw")
}; Emulator.prototype.onRemove = function () { this.div.parentNode.removeChild(this.div); this.div = null }; function receive(a) { (a = a.data.split(",")) && 1 < a.length && (isNaN(a[0]) || isNaN(a[1]) ? alert("Invalid coordinates") : (setMap(parseFloat(a[0]), parseFloat(a[1]), a[2] ? parseInt(a[2]) : 18, a[3] ? a[3] : "satellite"), ga("send", "event", "coordinates", "received"))) };
window.addEventListener ? window.addEventListener("message", receive, !1) : window.attachEvent("onmessage", receive);
init();