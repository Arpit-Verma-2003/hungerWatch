import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Location.css"; // Import CSS file

const Location = () => {
  const [currLocation, setCurrLocation] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const location = await axios.get("https://ipapi.co/json");
      setCurrLocation(location.data);
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="location-container">
      <h1>Your Location Details</h1>
      <h2>(Posts Would be Displayed According To Your Location)</h2>
      <div className="location-details">
        <p><strong>City:</strong> {currLocation.city}</p>
        <p><strong>State:</strong> {currLocation.region}</p>
        <p><strong>Country:</strong> {currLocation.country_name}</p>
        <p><strong>Connection:</strong> {currLocation.org}</p>
      </div>
      {isLoading && <div className="loading">Loading...</div>}
      {/* {error && <div className="error">Failed to fetch location data</div>} */}
    </div>
  );
};

export default Location;
