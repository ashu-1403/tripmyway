import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Map, Calendar, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import image from "../assets/travel.jpg";

const Hero = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full opacity-50 blur-3xl" />
        <div className="absolute top-20 -left-20 w-72 h-72 bg-teal-100 rounded-full opacity-50 blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative container mx-auto px-4 pt-20 pb-16 flex flex-col lg:flex-row items-center gap-12">
        {/* Left column - Text content */}
        <div className="flex-1 text-center lg:text-left space-y-8">
          <div className="inline-block px-4 py-2 bg-blue-50 rounded-full">
            <span className="text-blue-600 font-medium text-sm">Your next adventure awaits</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Transform Your 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500"> Travel Dreams </span>
            Into Reality
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl">
            Experience seamless journey planning with our intelligent travel companion. 
            Create unforgettable itineraries tailored just for you.
          </p>

          <div className="flex justify-center lg:justify-start">
            <Link to="/createtrip">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl flex items-center gap-2 text-lg transform hover:scale-105 transition-transform">
                Explore Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-8 justify-center lg:justify-start text-gray-600 pt-8">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <span>190+ Countries</span>
            </div>
            <div className="flex items-center gap-2">
              <Map className="w-5 h-5 text-blue-600" />
              <span>1000+ Routes</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Right column - Visual element */}
        <div className="flex-1 relative">
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-teal-50 rounded-full opacity-20" />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-100 rounded-full opacity-60" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-teal-100 rounded-full opacity-60" />
            
            {/* Placeholder for main image */}
            <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-2xl overflow-hidden">
              <img 
                src={image} 
                alt="Travel planning illustration" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;