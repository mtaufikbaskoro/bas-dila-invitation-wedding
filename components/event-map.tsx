"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { wedding } from "@/lib/wedding";

const venue = wedding.location;

const markerIcon = L.divIcon({
  className: "event-map-marker",
  html: '<span aria-hidden="true"></span>',
  iconSize: [28, 36],
  iconAnchor: [14, 36],
  popupAnchor: [0, -32],
});

export function EventMap() {
  return (
    <div className="event-map relative h-64 w-full overflow-hidden rounded-2xl" aria-label={venue.mapLabel} role="application">
      <MapContainer center={venue.coordinates} zoom={16} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={venue.coordinates} icon={markerIcon}>
          <Popup>
            <strong>{venue.venueName}</strong>
            <br />
            {venue.venueAddress}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
