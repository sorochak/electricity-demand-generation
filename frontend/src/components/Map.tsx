import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map: React.FC = () => {
  useEffect(() => {
    const map = L.map("map").setView([37.8, -96], 4);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    //   // Load GeoJSON (replace the URL with your API endpoint)
    //   fetch("/api/balancing-authorities-geojson")
    //     .then((res) => res.json())
    //     .then((data) => {
    //       L.geoJSON(data).addTo(map);
    //     });
    // }, []);

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ height: "500px", width: "100%" }} />;
};

export default Map;
