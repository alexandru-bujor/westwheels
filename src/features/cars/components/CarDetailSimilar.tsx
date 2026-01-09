'use client';

import { Car } from '@/types/car';
import { CarCard } from './CarCard';

interface CarDetailSimilarProps {
  car: Car;
}

export function CarDetailSimilar({ car }: CarDetailSimilarProps) {
  // In a real app, fetch similar cars from API
  const similarCars = car.similarCars || [];

  if (similarCars.length === 0) {
    return null;
  }

  return (
    <div className="tabs-content archived-offers-section">
      <div className="header">
        <div className="sec-name">
          <img src="/img/upd/copy.svg" alt="Similar archival offers" />
          Similar archival offers
        </div>
        <div className="conent-right">
          <a href="/search/archived/results" className="show-more-auctions" rel="nofollow">
            Go to archive
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </a>
        </div>
      </div>

      <div className="archieved-items-wrapper">
        <div className="psa-row mobile-hide">
          {similarCars.slice(0, 5).map((similarCar) => (
            <CarCard key={similarCar.id} car={similarCar} />
          ))}
        </div>
      </div>
    </div>
  );
}

