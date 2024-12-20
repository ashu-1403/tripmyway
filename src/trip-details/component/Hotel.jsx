import React from 'react';
import { Link } from 'react-router-dom';

import HotelCardItem from './HotelCardItem';

function Hotel({ trip }) {
  return (
    <div>
      <h2 className='text-sm md:text-xl mb-2 md:mb-5 font-bold mt-5'>Hotels recommended for you</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 '>
        {trip?.tripData?.hotels?.map((hotel) => (
          <HotelCardItem hotel={hotel}/>
        ))}
      </div>
    </div>
  );
}

export default Hotel;