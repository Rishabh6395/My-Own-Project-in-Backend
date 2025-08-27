import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// A helper component that re-centers the map when position changes
const RecenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom(), { animate: true });
    }
  }, [position, map]);
  return null;
};

const LiveTracking = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    let intervalId;

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            setPosition([latitude, longitude]);
            console.log("position updated", latitude, longitude);
          },
          (err) => console.error(err),
          { enableHighAccuracy: true }
        );
      }
    };

    updateLocation(); // Initial fetch
    intervalId = setInterval(updateLocation, 1000); // Update every 1 sec

    return () => clearInterval(intervalId);
  }, []);

  return (
    <MapContainer
      center={position || [20.5937, 78.9629]} // fallback to India center
      zoom={15}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {position && (
        <>
          <Marker position={position}>
            <Popup>You are here 🚀</Popup>
          </Marker>
          <RecenterMap position={position} />
        </>
      )}
    </MapContainer>
  );
};

export default LiveTracking;
