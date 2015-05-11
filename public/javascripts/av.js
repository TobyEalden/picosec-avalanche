/**
 * Created by toby on 11/05/15.
 *
 * - link to webinos api
 * - subscribe to updates (actuator?)
 * - receive update - change marker colour
 * - add entry to log
 * - change overall warning indicator
 *
 */
webix.require("../../avData.js");
webix.debug = true;

function showSensors() {
  var map = $$("mapPanel").map;
  for (var i = 0; i < sensorData.length; i++) {
    var latlng = new google.maps.LatLng(sensorData[i].sensorLatColumn, sensorData[i].sensorLngColumn);
    new google.maps.Marker({
      position: latlng,
      map: map,
      title: sensorData[i].sensorDescColumn
    });
  }
}

webix.ready(function() {
  webix.ui({
    id: "mainLayout",
    rows:[
      {
        view:"toolbar",
        height: 45,
        elements: [
          { view: "label", template: "<div id='picoHeader'><span class='picoHeaderTitle'> &mdash; avalanche monitor</span>"},
          {},
          {view:"label", template: "<div style='text-align: right;'>toby.ealden</div>" },
          {view:"icon", icon:"user"},
          {view:"icon", icon:"cog"}
        ]
      },
      { view: "label", template: '<div style="background-color: green; font-size: 2em;text-align: center;color: white;">risk level: low</div>' },
      {
        type: "space",
        cols: [
          {
            gravity: 0.2,
            rows: [
              { type: "header", template: "filter" },
              { view: "list", id: "sideBar", scroll: false, select: true, template: "#value#", data: [
                { id: "sensors", value: "sensors" },
                { id: "map", value: "map" },
                { id: "log", value: "activity log"},
                { id: "config", value: "configuration"}
              ],
              on: {
                onItemClick: function(id) {
                  $$("mainPanel").showBatch(id);
                }
              }}
            ]
          },
          {
            id: "mainPanel", visibleBatch: "map",
            rows: [
              {
                id: "sensorsPanel",
                view: "datatable",
                batch: "sensors",
                columns: [
                  { id: "sensorIdColumn", header: "sensor id" },
                  { id: "sensorLatColumn", header: "latitude" },
                  { id: "sensorLngColumn", header: "longitude" },
                  { id: "sensorActiveColumn", header: "active"},
                  { id: "sensorDescColumn", header: "description", fillspace: true }
                ],
                data: sensorData
              },
              { id: "mapPanel", view: "google-map", batch: "map", center: [54.300499, -2.109375] },
              {
                view: "datatable", batch: "log",
                columns: [
                  { id: "activityIdColumn", header: "sensor id" },
                  { id: "activityDateColumn", header: "date" },
                  { id: "activitySeverityColumn", header: "severity" },
                  { id: "activityDescColumn", header: "description", fillspace: true }
                ],
                resizeColumn: true,
                data: activityData
              },
              {
                id: "configurationPanel",
                batch: "config",
                view: "property",
                elements: [
                  { label: "notification email", type: "text", value: "toby.ealden@gmail.com"},
                  { label: "auto-calibrate sensors", type: "text", value: "on"}
                ]
              }
            ]
          }
        ]
      },
      {
        view: "toolbar",
        height: 45,
        elements: [
          { view: "label", id: "version", template: "<div style='font-size: .8em;'>v 0.0.12</div>" },
          {},
          { view: "label", id: "timestamp", template: "<div style='text-align: right;font-size: .8em;'>" + (new Date().toUTCString()) + "</div>" }
        ]
      }
    ]
  });

  showSensors();
});