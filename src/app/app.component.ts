import { Component, OnInit } from "@angular/core";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import "leaflet.animatedmarker/src/AnimatedMarker";

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  animatedMarker;

  ngOnInit() {
    var map = L.map("map").setView([51.505, -0.09], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const line = L.polyline(
      [
        [40.6851, -73.94136],
        [40.68576, -73.94149],
        [40.68649, -73.94165]
      ],
      {
        color: "#02929b",
        weight: 1.5
      }
    ).addTo(map);

    this.animatedMarker = L.animatedMarker(line.getLatLngs(), {
      autoStart: false,
      icon
    });

    map.addLayer(this.animatedMarker);

    const group = new L.featureGroup([this.animatedMarker]);

    map.fitBounds(group.getBounds());
  }

  startAnimation() {
    console.log('started')
    this.animatedMarker.start();
  }
}
