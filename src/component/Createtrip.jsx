import React, { useState, useEffect } from "react";
import GooglePlaceAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelOptions } from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { prompt, chatSession } from "../Gemini/GoogleAiConfig";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { db } from "../firebase/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setPlace] = useState("");
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const signInWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      getUserProfile(tokenResponse);
    },
    onError: (error) => {
      toast.error("Failed to sign in with Google");
    },
  });

  const createTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const FINAL_PROMPT = prompt({
        location: formData?.place?.label,
        totalDays: formData?.noOfDays,
        traveller: formData?.traveller,
        budget: formData?.budget,
      });

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripDataString = await result?.response?.text();
      const tripDataJson = JSON.parse(tripDataString);
      saveTrip(tripDataJson);
      toast.success("Your dream trip is ready! 🎉");
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    if (formData?.noOfDays > 5) {
      toast.error("Maximum trip duration is 5 days");
      return false;
    }
    if (!formData?.place) {
      toast.error("Please choose your destination");
      return false;
    }
    if (!formData?.budget) {
      toast.error("Please select your budget");
      return false;
    }
    if (!formData?.traveller) {
      toast.error("Please tell us who's traveling");
      return false;
    }
    return true;
  };

  const saveTrip = async (tripData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "Trips", docId), {
      userChoice: formData,
      tripData,
      userEmail: user?.email,
      id: docId,
    });
    navigate(`/trip-details/${docId}`);
  };

  const getUserProfile = async (tokenInfo) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(res?.data));
      setOpenDialog(false);
      createTrip();
    } catch (error) {
      toast.error("Failed to get user profile");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500" />
                Where's your dream destination?
              </h2>
              <div className="transform hover:scale-101 transition-transform duration-200">
                <GooglePlaceAutocomplete
                  apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                  selectProps={{
                    place,
                    onChange: (e) => {
                      setPlace(e);
                      handleInputChange("place", e);
                    },
                    styles: {
                      control: (provided) => ({
                        ...provided,
                        padding: '0.5rem',
                        borderRadius: '0.75rem',
                        border: '2px solid #e2e8f0',
                      }),
                    },
                  }}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <FaCalendarAlt className="text-blue-500" />
                How long is your adventure?
              </h2>
              <Input
                type="number"
                min="1"
                max="5"
                placeholder="Enter days (1-5)"
                onChange={(e) => handleInputChange("noOfDays", parseInt(e.target.value, 10) || 1)}
                className="text-lg p-6 rounded-xl border-2 hover:border-blue-400 transition-colors duration-200"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-fadeIn">
            <h2 className="text-2xl font-semibold">What's your budget like?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("budget", item.title)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transform hover:scale-105 transition-all duration-300 ${
                    formData.budget === item.title
                      ? "border-blue-500 bg-blue-50"
                      : "hover:border-blue-300"
                  }`}
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-fadeIn">
            <h2 className="text-2xl font-semibold">Who's joining the adventure?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SelectTravelOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("traveller", item.title)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transform hover:scale-105 transition-all duration-300 ${
                    formData.traveller === item.title
                      ? "border-blue-500 bg-blue-50"
                      : "hover:border-blue-300"
                  }`}
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Plan Your Dream Trip ✈️
          </h1>
          <p className="text-xl text-gray-600">
            Let's create your perfect itinerary together
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-8">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex items-center ${
                  step < 3 ? "flex-1" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step <= currentStep
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`flex-1 h-1 mx-4 ${
                      step < currentStep ? "bg-blue-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {renderStep()}

          <div className="flex justify-between mt-12">
            {currentStep > 1 && (
              <Button
                onClick={() => setCurrentStep(currentStep - 1)}
                variant="outline"
                className="px-6"
              >
                Back
              </Button>
            )}
            {currentStep < 3 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 ml-auto"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={createTrip}
                disabled={isLoading}
                className="px-6 ml-auto bg-blue-500 hover:bg-blue-600"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                    Creating your trip...
                  </div>
                ) : (
                  "Create My Trip"
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center mb-4">Sign In Required</DialogTitle>
            <DialogDescription className="text-center">
              To create your perfect trip itinerary, please sign in with your Google account.
            </DialogDescription>
          </DialogHeader>
          <Button
            variant="outline"
            onClick={signInWithGoogle}
            className="flex items-center justify-center gap-2 w-full p-6 text-lg hover:bg-gray-50"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;