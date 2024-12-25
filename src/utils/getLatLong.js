import axios from "axios";
export async function getLatLong(address) {
    const apiKey = '1910725eac824c56a5954075170fc2c8'; // Replace with your OpenCage API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;
    
    try {
      const response = await axios.get(url);
      if (response.data.results.length > 0) {
        const lat = response.data.results[0].geometry.lat;
        const lng = response.data.results[0].geometry.lng;
        return { lat, lng };
      } else {
        throw new Error('Geocoding failed: No results found');
      }
    } catch (error) {
      throw new Error(`Geocoding API request failed: ${error.message}`);
    }
  }