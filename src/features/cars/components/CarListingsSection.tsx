'use client';

import Link from 'next/link';
import { Car } from '@/types/car';
import { CarListingItem } from './CarListingItem';
import './carListing.css';

interface CarListingsSectionProps {
  title: string;
  titleMobile?: string;
  count: number;
  cars: Car[];
  seeAllUrl: string;
  swiperClass?: string;
}

export function CarListingsSection({
  title,
  titleMobile,
  count,
  cars,
  seeAllUrl,
  swiperClass,
}: CarListingsSectionProps) {
  return (
    <>
      <div className="row-title">
        <h4 className="h4-home-desktop">
          {title} &nbsp; <span style={{ whiteSpace: 'nowrap' }}>{count}</span>
        </h4>
        {titleMobile && (
          <h4 className="h4-home-mobile">
            {titleMobile} &nbsp; <span style={{ whiteSpace: 'nowrap' }}>{count}</span>
          </h4>
        )}
        <a
          href={seeAllUrl}
          data-sec-preload={seeAllUrl}
          className="link-right all-button-home-desktop"
          style={{ whiteSpace: 'nowrap' }}
          {...({ preload: 'yes' } as any)}
        >
          See All <img src="/img/upd/arr-w.svg" width="12" height="12" alt="Show more" />
        </a>
        <a
          href={seeAllUrl}
          data-sec-preload={seeAllUrl}
          className="link-right all-button-home-mobile"
          style={{ whiteSpace: 'nowrap' }}
          {...({ preload: 'yes' } as any)}
        >
          All <img src="/img/upd/arr-w.svg" width="12" height="12" alt="Show more" />
        </a>
      </div>

      <div className="psa-row recent home-page mobile-hide-1024px">
        {cars.map((car) => (
          <CarListingItem key={car.id} car={car} />
        ))}
      </div>

      <div className={`psa-row recent home-page psa-row-homepage-m desktop-hide-1024px ${swiperClass || ''} swiper-initialized swiper-horizontal`}>
        <div className="swiper-wrapper" aria-live="polite">
          {cars.map((car) => (
            <div key={car.id} className="swiper-slide" style={{ width: '225px', marginRight: '10px' }}>
              <CarListingItem car={car} />
            </div>
          ))}
        </div>
        <div className="swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal"></div>
        <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
      </div>
    </>
  );
}

