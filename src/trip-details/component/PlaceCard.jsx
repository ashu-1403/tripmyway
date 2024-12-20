import React, { useEffect, useState } from 'react';
import image from "../../assets/ph.jpg";
import { FaMapMarker } from "react-icons/fa";
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';
import { getPlacesData } from '../../Placeapi/PlaceApi';
import { PHOTO_REF_URL } from '../../Placeapi/PlaceApi';

function PlaceCard({ place }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (place) {
      getPlacePhoto();
    }
  }, [place]);

  const getPlacePhoto = async () => {
    const data = { textQuery: place?.placeName };
    try {
      const result = await getPlacesData(data);
      const photos = result.data.places[0]?.photos;
      if (photos && photos.length > 0) {
        const photoUrl = PHOTO_REF_URL.replace("{NAME}", photos[0]?.name);
        setPhotoUrl(photoUrl);
      } else {
        console.log("No photos available for this place.");
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  return (
    <Link 
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.placeName)}`} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block transform transition-all duration-300 hover:-translate-y-1 hover:scale-105"
    >
      <div className="relative bg-white shadow-md hover:shadow-2xl transition-all duration-300 p-4 rounded-xl flex gap-4 max-w-2xl border border-gray-200 hover:border-primary/30 group overflow-hidden">
        <img
          src={photoUrl || image}
          alt="place"
          className="w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] object-cover rounded-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-md"
        />
        <div className="flex flex-col min-w-0 flex-grow">
          <h2 className="text-sm sm:text-lg font-semibold text-gray-800 line-clamp-1 group-hover:text-primary transition-colors duration-300">
            {place?.placeName}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mt-1 flex-grow group-hover:text-gray-900 transition-colors duration-300">
            {place?.["place Details"]}
          </p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-primary/80 transition-colors duration-300">
              {place?.["time to travel"]} to travel
            </span>
            <Button 
              size="sm" 
              className="h-8 w-8 p-0 bg-primary/80 text-white rounded-full shadow-md transition-all duration-300 group-hover:bg-primary/90 group-hover:scale-110"
            >
              <FaMapMarker className="w-4 h-4 group-hover:animate-bounce" />
            </Button>
          </div>
        </div>
        {/* Badge for ticket pricing */}
        {place?.["ticket pricing"] && (
          <span className="absolute top-2 right-2 bg-primary/10 text-primary text-xs font-semibold py-1 px-2 rounded-full">
            {place["ticket pricing"] === "Free" ? "Free Entry" : place["ticket pricing"]}
          </span>
        )}
      </div>
    </Link>
  );
}

export default PlaceCard;
  