'use client';

import { Car } from '@/types/car';
import Link from 'next/link';
import { IconKey, IconSealCheck, IconClock, IconTrendingUp, IconCopy, IconArrowDown } from '@/components/common/Icons';

interface CarDetailHeaderProps {
  car: Car;
}

export function CarDetailHeader({ car }: CarDetailHeaderProps) {
  return (
    <div className="lot-header-new">
      <div className="item_top_bar">
        <div className="container">
          <div className="back-btn-overflow new_version">
            <span>
              <Link href="/">WhestWheels</Link>
              <span className="dropdown">
                <a id="type-dropdown" data-toggle="dropdown" href="#">
                  Automobile
                </a>
              </span>
              <span className="dropdown">
                <a id="make-dropdown" data-toggle="dropdown" href="#">
                  {car.make}
                </a>
              </span>
              <span className="dropdown">
                <a id="model-dropdown" data-toggle="dropdown" href="#">
                  {car.model}
                </a>
              </span>
              <Link href={`/car/${car.id}`}>
                {car.year} {car.make} {car.model} {car.vin}
              </Link>
            </span>
          </div>

          <div className="people-watch">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.9292 14.1684C15.5792 13.3393 15.0713 12.5862 14.4337 11.9511C13.7981 11.3141 13.0452 10.8063 12.2165 10.4556C12.209 10.4519 12.2016 10.45 12.1942 10.4463C13.3501 9.61133 14.1016 8.25127 14.1016 6.7168C14.1016 4.1748 12.042 2.11523 9.50005 2.11523C6.95805 2.11523 4.89848 4.1748 4.89848 6.7168C4.89848 8.25127 5.64995 9.61133 6.80591 10.4481C6.79848 10.4519 6.79106 10.4537 6.78364 10.4574C5.95239 10.8081 5.20649 11.3109 4.56636 11.9529C3.92939 12.5886 3.42154 13.3415 3.07085 14.1702C2.72633 14.9815 2.54052 15.8514 2.52348 16.7326C2.52299 16.7524 2.52646 16.7721 2.5337 16.7906C2.54094 16.809 2.55179 16.8258 2.56563 16.84C2.57946 16.8542 2.59599 16.8654 2.61425 16.8731C2.6325 16.8808 2.65211 16.8848 2.67192 16.8848H3.7852C3.86684 16.8848 3.93178 16.8198 3.93364 16.74C3.97075 15.3076 4.54594 13.9661 5.56274 12.9493C6.61479 11.8973 8.01196 11.3184 9.50005 11.3184C10.9881 11.3184 12.3853 11.8973 13.4374 12.9493C14.4541 13.9661 15.0293 15.3076 15.0665 16.74C15.0683 16.8217 15.1332 16.8848 15.2149 16.8848H16.3282C16.348 16.8848 16.3676 16.8808 16.3858 16.8731C16.4041 16.8654 16.4206 16.8542 16.4345 16.84C16.4483 16.8258 16.4592 16.809 16.4664 16.7906C16.4736 16.7721 16.4771 16.7524 16.4766 16.7326C16.4581 15.8457 16.2744 14.9829 15.9292 14.1684ZM9.50005 9.9082C8.64839 9.9082 7.84682 9.57607 7.2438 8.97305C6.64077 8.37002 6.30864 7.56846 6.30864 6.7168C6.30864 5.86514 6.64077 5.06357 7.2438 4.46055C7.84682 3.85752 8.64839 3.52539 9.50005 3.52539C10.3517 3.52539 11.1533 3.85752 11.7563 4.46055C12.3593 5.06357 12.6915 5.86514 12.6915 6.7168C12.6915 7.56846 12.3593 8.37002 11.7563 8.97305C11.1533 9.57607 10.3517 9.9082 9.50005 9.9082Z" fill="#7F8FA4"></path>
            </svg>
            <b>{car.peopleViewed || 0} people</b> viewed this vehicle
          </div>
        </div>
      </div>

      <div className="container container-transparent" id="mobile-start-container">
        <div className="left-side">
          <div className="extra-information">
            <div className="specs">
              {car.key === 'Present' && (
                <span>
                  <IconKey />
                </span>
              )}
              <span></span>
              {car.mileage && (
                <span>
                  {car.mileageUnit === 'mi' 
                    ? `${Math.round(car.mileage * 1.60934).toLocaleString()} km`
                    : `${car.mileage.toLocaleString()} ${car.mileageUnit}`
                  }
                </span>
              )}
            </div>
          </div>
          <div className="lot-name">
            <div className="title-row">
              <h2 className="title_lot">
                {car.year} {car.make} {car.model}
              </h2>
              <span className="vin_lot copy-vin">{car.vin}</span>
              <a
                href={`https://${car.platform}.com/lot/${car.lotNumber.replace(/^[^-]+-/, '')}`}
                className={`auction-label ${car.platform}`}
                target="_blank"
                rel="nofollow noreferrer"
              >
                {car.platform === 'copart' ? 'Copart' : 'IAAI'}
              </a>
            </div>
          </div>
          <div className="lot-info-row">
            <div className="info-item">
              <span className="info-label">Location:</span>
              <span className="info-value">{car.location}</span>
            </div>
            {car.shippingFrom && (
              <div className="info-item">
                <span className="info-label">Shipping from:</span>
                <span className="info-value">{car.shippingFrom}</span>
              </div>
            )}
            {car.distance && (
              <div className="info-item">
                <span className="info-label">Odległość:</span>
                <span className="info-value">{car.distance}</span>
              </div>
            )}
            <div className="info-item">
              <span className="info-label">Estimated cost:</span>
              <span className="info-value">
                {car.estimatedCost ? (
                  <>
                    {car.estimatedCost.includes('-') ? (
                      <>
                        <b>{car.estimatedCost.split('-')[0].trim()}</b>
                        &nbsp;-&nbsp;
                        <b>{car.estimatedCost.split('-')[1].trim()}</b>
                      </>
                    ) : (
                      <b>{car.estimatedCost}</b>
                    )}
                  </>
                ) : (
                  <b>No information</b>
                )}
              </span>
            </div>
            <div className="info-item">
              <button
                className="info-button-header"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                title="More information"
              >
                Info
              </button>
            </div>
          </div>
        </div>
        <div className="right-side">
          {car.estimatedDeliveryTime && (
            <div className="delivery-time-box">
              <a href="/status" className="button delivery_time">
                <span className="icon">
                  <IconClock />
                </span>
                <span className="content">
                  Estimated delivery time (EU)
                  <span>
                    {car.estimatedDeliveryTime.from} - {car.estimatedDeliveryTime.to}
                  </span>
                </span>
              </a>
            </div>
          )}
          <div className="choose-item">
            <a href="#" data-lot={car.lotNumber} className="button">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2 8.00008C0.5 6.00008 1 3.00008 3.5 2.00008C6 1.00008 7.5 3.00008 8 4.00008C8.5 3.00008 10.5 1.00008 13 2.00008C15.5 3.00008 15.5 6.00008 14 8.00008C12.5 10.0001 8 14.0001 8 14.0001C8 14.0001 3.5 10.0001 2 8.00008Z"
                  stroke="#7F8FA4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span className="added">Watching</span>
              <span className="to_add">Watch</span>
            </a>
          </div>
        </div>
      </div>

      <div className="bottom_bar">
        <div className="container container-transparent">
          <div className="left_side">
            <a href="#" className="button link-history" onClick={(e) => e.preventDefault()}>
              <IconTrendingUp />
              Sales History
              {car.salesHistory && <span>{car.salesHistory.length}</span>}
              <IconArrowDown />
            </a>
            <a
              href="#"
              data-type=""
              data-lot-attr={car.lotNumber}
              data-link-lang="/lot/"
              className="button link-history archived-section"
              onClick={(e) => e.preventDefault()}
            >
              <IconCopy />
              Similar archival offers
              <IconArrowDown />
            </a>
          </div>

          <div className="box live_auction_sec">
            <div className="header_box">
              <div className="time-frame before">
                <span>
                  <span className="indicator grey"></span> Live auction
                </span>
                <span>
                  {car.auctionDate} {car.auctionTime && `, ${car.auctionTime}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

