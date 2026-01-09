'use client';

import { useState } from 'react';
import { Car } from '@/types/car';
import { IconExpand } from '@/components/common/Icons';

interface CarDetailGalleryProps {
  car: Car;
}

export function CarDetailGallery({ car }: CarDetailGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const defaultImage = 'https://images.unsplash.com/photo-1606664515524-ed2f786a0ad6?w=600';
  const images = car.images && car.images.length > 0 ? car.images : [defaultImage];

  return (
    <div className="gallery">
      <div className="mobile-version status gray">
        {car.auctionDate} {car.auctionTime && `, ${car.auctionTime}`}
      </div>

      <div id="productContainer">
        <div id="productCarousel" className="f-carousel is-ltr is-horizontal">
          <div className="f-carousel__viewport is-draggable">
            <div className="f-carousel__track" aria-live="polite">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`f-carousel__slide ${index === currentImageIndex ? 'is-selected' : ''}`}
                  data-thumb-src={img}
                  data-fancybox="gallery"
                  data-src={img}
                  data-index={index}
                >
                  <img
                    src={img}
                    alt={`${car.vin} ${car.year} ${car.make} ${car.model} photo no. ${index + 1}`}
                    style={{ visibility: 'visible', width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="top-buttons new-ver">
            <a href="#" className="open-fullscreen" onClick={(e) => e.preventDefault()}>
              <IconExpand />
              View {images.length} Photos
            </a>
          </div>

          <div className="f-carousel__nav">
            <button
              tabIndex={0}
              title="Next slide"
              className="f-button is-next"
              data-carousel-next="true"
              onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabIndex={-1}>
                <path d="M9 3l9 9-9 9"></path>
              </svg>
            </button>
            <button
              tabIndex={0}
              title="Previous slide"
              className="f-button is-prev"
              data-carousel-prev="true"
              onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabIndex={-1}>
                <path d="M15 3l-9 9 9 9"></path>
              </svg>
            </button>
          </div>
        </div>

        <div id="galleryThumbs">
          {images.map((img, index) => (
            <div
              key={index}
              className={`f-carousel__thumb ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
              onMouseEnter={() => setCurrentImageIndex(index)}
            >
              <img
                src={img}
                data-lazy-src={img}
                alt={`${car.vin} ${car.year} ${car.make} ${car.model} Thumbnail photo no. ${index + 1}`}
                style={{ opacity: 1 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

