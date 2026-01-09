'use client';

import { useState } from 'react';
import { Car } from '@/types/car';
import { IconQuestion, IconPlus, IconMinus } from '@/components/common/Icons';

interface CarDetailBiddingProps {
  car: Car;
}

export function CarDetailBidding({ car }: CarDetailBiddingProps) {
  const [bidAmount, setBidAmount] = useState(car.currentBid + 500);
  const [activeTab, setActiveTab] = useState<'bidding' | 'vehicle-information'>('bidding');

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <div className="box" id="box-options" data-sticky-class="is-sticky" data-margin-top="0" data-sticky-wrap="true">
        <div className="content">
          <div className="option">
            <a
              onClick={() => setActiveTab('bidding')}
              id="box-options-bidding"
              className={`gen_report ${activeTab === 'bidding' ? 'active' : ''}`}
              style={{ margin: '0px auto 0 auto' }}
            >
              Bidding
            </a>
          </div>
          <div className="option">
            <a
              onClick={() => setActiveTab('vehicle-information')}
              id="box-options-information"
              className={`gen_report ${activeTab === 'vehicle-information' ? 'active' : ''}`}
              style={{ margin: '0px auto 0 auto' }}
            >
              Vehicle information
            </a>
          </div>
        </div>
      </div>

      <div className="box" id="bidding-info">
        <div className="lot-price-info">
          <div>
            <div className="field-name">
              Current Bid
            </div>
            <span className="price current_bid">
              {formatPrice(car.currentBid)} USD
            </span>
          </div>
          <div>
            <div className="field-name">
              Your max bid
              <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '2px' }}>
                <IconQuestion />
              </span>
            </div>
            <span className="price max_bid black">{car.maxBid ? formatPrice(car.maxBid) : '---'}</span>
          </div>
        </div>
        <div className="price-section closing-bid">
          <div className="field-wr">
            <div className="field-name">Time left</div>
            <div className="field-desc">
              <div className="bid-status status-green">
                <label htmlFor="bid-input" id="time-left">
                  4 d 9 h 50 min 39 sec
                </label>
                <IconQuestion />
              </div>
            </div>
          </div>

          <div className="input-price-wr">
            <div className="input-group mb-3" id="bidInput">
              <div className="input-group-prepend">
                <span className="input-group-text minus-btn" onClick={() => setBidAmount(Math.max(0, bidAmount - 100))}>
                  <IconMinus />
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                value={bidAmount}
                id="bid-input"
                name="bidInput"
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  setBidAmount(value);
                }}
              />
              <div className="input-group-append">
                <span className="input-group-text plus-btn" onClick={() => setBidAmount(bidAmount + 100)}>
                  <IconPlus />
                </span>
              </div>
            </div>

            <div className="lit msg min-max hide"></div>
            <button className="btn btn-transparent bid" type="button" id="btn-login" onClick={() => (window.location.href = '/login')}>
              Bid Now
            </button>
            <p className="small-info" id="small-info-how-to">
              You don't know how to start bidding?
              <a target="_blank" href="/how-it-works">
                Purchase process
              </a>
            </p>
          </div>
        </div>
        {car.fastBuyPrice && (
          <div className="buy-now-wr">
            <div>
              <div className="field-name">Fast Buy Price:</div>
              <div className="price">{formatPrice(car.fastBuyPrice)} USD</div>
            </div>
            <div>
              <a href="#" className="btn btn-default" onClick={(e) => { e.preventDefault(); window.location.href = '/login'; }}>
                Buy Now
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

