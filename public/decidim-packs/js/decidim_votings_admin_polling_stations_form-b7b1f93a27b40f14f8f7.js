!function(){"use strict";function t(t,a,n){var e="".concat(t,"Name");if(n[e])return n[e];var i=a.attr("name"),o=/\[[^\]]+\]$/;return i.match(o)?i.replace(o,"[".concat(t,"]")):t}function a(a,n,e){var i=$.extend({},n),o=a.attr("id").split("_");o.pop();var d="".concat(o.join("_")),c="latitude",l="longitude";a.length>0&&(c=t("latitude",a,i),l=t("longitude",a,i));var u=$.extend({latitudeId:"".concat(d,"_latitude"),longitudeId:"".concat(d,"_longitude"),latitudeName:c,longitudeName:l},n),r=!1,g=function(t){!function(){var t=$("#".concat(u.latitudeId));t.length<1&&(t=$('<input type="hidden" name="'.concat(u.latitudeName,'" id="').concat(u.latitudeId,'" />')),a.after(t));var n=$("#".concat(u.longitudeId));n.length<1&&(n=$('<input type="hidden" name="'.concat(u.longitudeName,'" id="').concat(u.longitudeId,'" />')),a.after(n))}(),$("#".concat(u.latitudeId)).val(t[0]).attr("value",t[0]),$("#".concat(u.longitudeId)).val(t[1]).attr("value",t[1])};a.on("change.decidim",(function(){r||($("#".concat(u.latitudeId)).val("").removeAttr("value"),$("#".concat(u.longitudeId)).val("").removeAttr("value"))})),a.on("geocoder-suggest-coordinates.decidim",(function(t,a){g(a),r=!0,e(a)}));var v="".concat(a.data("coordinates")).split(",").map(parseFloat);Array.isArray(v)&&2===v.length&&g(v)}$((function(){a($(".edit_polling_station, .new_polling_station").find("#polling_station_address"))}))}();
//# sourceMappingURL=decidim_votings_admin_polling_stations_form-b7b1f93a27b40f14f8f7.js.map