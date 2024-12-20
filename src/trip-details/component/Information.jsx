import React, { useEffect, useState } from "react";
import { FaShare } from "react-icons/fa6";
import { Button } from "../../components/ui/button";
import { getPlacesData } from "../../Placeapi/PlaceApi";
import { PHOTO_REF_URL } from "../../Placeapi/PlaceApi";

// const PHOTO_REF_URL = "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=2000&maxWidthPx=2000&key=" + import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function Information({ tripData }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (tripData) {
      getPlacePhoto();
    }
  }, [tripData]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery: tripData?.userChoice?.place?.label,
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

  return (
    <div className="pb-3">
      <img
        src={photoUrl}
        alt="travel"
        className="h-[240px] md:h-[340px] w-full object-cover rounded-xl"
      />

      {/* Flex container for title and button */}
      <div className="flex justify-between items-center mt-4">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="text-xl md:text-2xl font-bold">
            {tripData?.userChoice?.place?.label || "Location not available"}
          </h2>
          <div className="flex flex-wrap gap-3">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅 {tripData?.userChoice?.noOfDays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {tripData?.userChoice?.budget} budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              ✈️ {tripData?.userChoice?.traveller} traveller
            </h2>
          </div>
        </div>

        {/* Align Share button to the right */}
        <Button className="ml-auto md:p-2 md:px-4 mt-2">
          <FaShare />
        </Button>
      </div>
    </div>
  );
}

export default Information;
