import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import image from "../assets/Around the world.png";

function Hero() {
  return (
    <div className="relative h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500">
      <div className="text-center max-w-3xl mx-auto px-4 sm:px-8 lg:px-12 bg-white bg-opacity-80 p-8 md:p-12 lg:p-16 rounded-2xl shadow-lg">
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-purple-800 leading-tight mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Discover the world, one journey at a time.
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Let us turn your travel dreams into reality with personalized trips, unforgettable experiences, and hassle-free planning. Your next adventure awaits!
        </motion.p>
        <Link to={"/createtrip"}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-md">
              Explore Now
            </Button>
          </motion.div>
        </Link>
      </div>
      <div className="absolute bottom-0 right-0 mr-10 mb-10">
        <motion.img
          src={image}
          alt="Around the world"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="w-32 sm:w-40 lg:w-48"
        />
      </div>
    </div>
  );
}

export default Hero;