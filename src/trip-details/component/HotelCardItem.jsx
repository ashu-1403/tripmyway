import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FcRating } from "react-icons/fc";
import { getPlacesData } from "../../Placeapi/PlaceApi";
import { PHOTO_REF_URL } from "../../Placeapi/PlaceApi";

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (hotel) {
      getPlacePhoto();
    }
  }, [hotel]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.HotelName,
    };

    try {
      const result = await getPlacesData(data);
      const photos = result.data.places[0]?.photos;

      if (photos && photos.length > 0) {
        console.log(photos); // Log available photos for debugging
        const photoUrl = PHOTO_REF_URL.replace("{NAME}", photos[0]?.name); // Use the first photo
        setPhotoUrl(photoUrl);
      } else {
        console.log("No photos available for this place.");
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  // Ensure the hotel address is fetched correctly
  const hotelAddress = hotel["Hotel address"] ;

  return (
    <div>
      <Link 
        to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotelAddress)}`}  
        target="_blank" // Open in a new tab
        rel="noopener noreferrer" // Security best practice
      >
        <div className="shadow-md p-4 rounded-lg bg-white transition-transform duration-300 hover:shadow-lg">
          <img 
            src={photoUrl || "https://via.placeholder.com/300"} // Fallback image
            alt={hotel.HotelName || "Hotel"} 
            className='rounded-lg hover:scale-105 transition-all duration-300 h-[300px] object-cover w-full' 
          />
          <div className='my-2'>
            <h2 className='font-medium text-lg'>{hotel?.HotelName}</h2>
            <h2 className='text-gray-500'>{hotelAddress}</h2>
            <h2 className='font-medium'>{hotel?.Price} per night</h2>
            <h2 className='flex items-center gap-1'>
              <FcRating />
              {hotel?.rating}
            </h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelCardItem;
