import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import Information from "../../trip-details/component/Information";
import Hotel from "../../trip-details/component/Hotel";
import Places from "../../trip-details/component/Places";
import Footer from "../../trip-details/component/Footer";

function TripDetails() {
  const { tripId } = useParams();
  const [tripDetails, setTripDetails] = useState(null);

  useEffect(() => {
    if (tripId) {
      GetTripDetails();
    }
  }, [tripId]);

  const GetTripDetails = async () => {
    const docRef = doc(db, "Trips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data());
      setTripDetails(docSnap.data());
    } else {
      console.log("No such document exists");
      toast("No trip exists");
    }
  };

  return (
    <div className="min-h-screen p-6 sm:p-10 md:px-20 lg:px-36 xl:px-56 bg-gradient-to-br from-gray-50 to-blue-50">
      {tripDetails ? (
        <div className="space-y-8">
          {/* Section Styling */}
          <div className="bg-gradient-to-r from-blue-200 to-blue-100 rounded-2xl shadow-lg p-6 md:p-8 lg:p-10">
            <Information tripData={tripDetails} />
          </div>

          <div className="bg-gradient-to-r from-teal-200 to-teal-100 rounded-2xl shadow-lg p-6 md:p-8 lg:p-10">
            <Hotel trip={tripDetails} />
          </div>

          <div className="bg-gradient-to-r from-indigo-200 to-indigo-100 rounded-2xl shadow-lg p-6 md:p-8 lg:p-10">
            <Places trip={tripDetails} />
          </div>

          <div className="bg-gradient-to-r from-purple-200 to-purple-100 rounded-2xl shadow-lg p-6 md:p-8 lg:p-10">
            <Footer trip={tripDetails} />
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-20">
          <p>Loading trip details...</p>
        </div>
      )}
    </div>
  );
}

export default TripDetails;
