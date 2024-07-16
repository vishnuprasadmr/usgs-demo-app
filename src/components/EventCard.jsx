import { useCallback, useEffect, useState } from "react";
import { haversineDistance } from "../utils/haversineDistance";

export const EventCard = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [isLoading, setIsLoading] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [nearestEarthquake, setNearestEarthquake] = useState();
  const [title, setTitle] = useState("USGS Earthquakes");

  const apiURL =
    // "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
    // "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

  const fetchData = useCallback(async () => {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
      const response = await fetch(apiURL);
      const data = await response.json();
      // sort data based on magnitude of earthquakes
      data.features.sort((a, b) => b.properties.mag - a.properties.mag);
      setTitle(data.metadata.title);
      setEventData(data.features);

      // Find the nearest earthquake
      const nearest = data.features.reduce((nearest, feature) => {
        const distance = haversineDistance(
          [location.lat, location.lng],
          feature.geometry.coordinates.slice(0, 2)
        );
        if (nearest === null || distance < nearest.distance) {
          return { ...feature, distance };
        }
        return nearest;
      }, null);

      setNearestEarthquake(nearest);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [apiURL]);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [fetchData]);

  console.log(nearestEarthquake);

  return (
    <>
      <h2 className="font-bold">{title}</h2>
      {isLoading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <>
            {location.lat && location.lng && (
              <div className="shadow-md bg-slate-700 text-white p-4">
                <h3>Your Location:</h3>
                <p>Latitude: {location.lat}</p>
                <p>Longitude: {location.lng}</p>
              </div>
            )}
            {nearestEarthquake && (
              <div className="shadow-md bg-red-700 text-white p-4">
                <h3>Nearest Earthquake:</h3>
                <p>{nearestEarthquake.properties.title}</p>
                <p>Distance: {nearestEarthquake.distance.toFixed(2)} km</p>
                <a
                  href={nearestEarthquake.properties.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  More Info
                </a>
              </div>
            )}
          </>
          <div className="overflow-auto max-h-screen">
            {eventData.length > 0 ? (
              eventData.map((event) => (
                <div
                  key={event.id}
                  className={`transition ease-in-out ${
                    event.id === nearestEarthquake?.id
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-slate-500 hover:bg-slate-600"
                  } hover:-translate-y-1 hover:scale-110 duration-300 flex text-sm py-2 cursor-pointer text-white p-4`}
                >
                  <a
                    href={event.properties.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p>{event.properties.title}</p>
                  </a>
                </div>
              ))
            ) : (
              <p>No events found</p>
            )}
          </div>
        </>
      )}
    </>
  );
};
