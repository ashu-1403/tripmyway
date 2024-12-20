import React from 'react';
import PlaceCard from './PlaceCard';

function Places({ trip }) {
  return (
    <div>
      <h2 className='text-xl md:text-2xl font-bold'>
        Places you should visit
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {trip?.tripData?.itinerary?.length > 0 ? (
          trip.tripData.itinerary.map((item, index) => (
            <div key={index}>
              <h2 className='font-medium mt-5 text-lg'>Day {item?.Day}</h2>
              {item?.DayPlan?.map((place, index) => (
                <div key={index}>
                  <PlaceCard place={place} />
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No itinerary available</p>
        )}
      </div>
    </div>
  );
}

export default Places;
