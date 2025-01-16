import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Polyline,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { memo, useCallback, useEffect, useState } from "react";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const MyGoogleMap = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Check if geolocation is available
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        error: "Geolocation is not supported by your browser",
      }));
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => {
        setLocation((prev) => ({
          ...prev,
          error: error.message,
        }));
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000,
      }
    );

    // Cleanup: Stop watching when the component unmounts
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBfhvUWK3-OVzPFUQAF1R_lt0Ylds-ffTg",
  });

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    try {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const locations = [
    { id: 1, lat: 23.2671323, lng: 77.3752047, name: "Zeeshan" }, // Location 1
    { id: 2, lat: 34.0522, lng: 118.2437, name: "Los Angeles" }, // Location 2
    { id: 3, lat: 36.1699, lng: 115.1398, name: "Las Vegas" }, // Location 3
  ];

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: locations[0].lat, lng: locations[0].lng }}
      zoom={40}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={(click) => {
        console.log("onUnmount", click);
      }}
    >
      {/* <Marker position={{ lat: location.latitude, lng: location.longitude }} /> */}

      {locations.map((location) => (
        <>
          <Polyline />
          <DirectionsRenderer />
          {/* <Marker

            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            label={location.name}
          /> */}
        </>
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default memo(MyGoogleMap);
