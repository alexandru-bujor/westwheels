'use client';

import { useState, useEffect } from 'react';
import { Car } from '@/types/car';
import { IconTag, IconCalculator, IconSecurity, IconAuctionBid, IconClose, IconQuestion, IconPlus, IconMinus, IconEU } from '@/components/common/Icons';

interface CarDetailCalculatorProps {
  car: Car;
}

export function CarDetailCalculator({ car }: CarDetailCalculatorProps) {
  const [currency, setCurrency] = useState<'EUR' | 'PLN'>('EUR');
  const [destination, setDestination] = useState<'EU' | 'Moldova'>('EU');
  const [calculatorType, setCalculatorType] = useState<'estimated' | 'bid' | 'buy-now'>('estimated');
  const [customsValue, setCustomsValue] = useState(car.currentBid);
  const [taxPercent, setTaxPercent] = useState(0);
  const [vatPercent, setVatPercent] = useState(9);
  
  // Update VAT when destination changes
  useEffect(() => {
    if (destination === 'Moldova') {
      setVatPercent(20);
    } else {
      setVatPercent(9);
    }
  }, [destination]);
  const [shippingPort, setShippingPort] = useState('995');

  const formatPrice = (amount: number, curr: 'EUR' | 'PLN' | 'USD' = currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: curr,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Parse estimated cost range (e.g., "$250 - $275" or "250 - 275")
  const parseEstimatedCost = (cost: string | undefined) => {
    if (!cost) return { min: 0, max: 0 };
    const match = cost.match(/\$?(\d+)\s*-\s*\$?(\d+)/);
    if (match) {
      return { min: parseInt(match[1]), max: parseInt(match[2]) };
    }
    const single = cost.match(/\$?(\d+)/);
    if (single) {
      const val = parseInt(single[1]);
      return { min: val, max: val + 25 };
    }
    return { min: 0, max: 0 };
  };

  const estimatedRange = parseEstimatedCost(car.estimatedCost);
  
  // Simplified calculations
  const lotPrice = calculatorType === 'estimated' 
    ? estimatedRange.min
    : calculatorType === 'bid' 
    ? car.currentBid 
    : car.fastBuyPrice || 0;
  
  const lotPriceMax = calculatorType === 'estimated' ? estimatedRange.max : lotPrice;
  const auctionFees = 240;
  const trucking = 410;
  const shippingCost = parseInt(shippingPort);
  const whestWheelsFee = 450;
  const subtotal = lotPrice + auctionFees + trucking + shippingCost + whestWheelsFee;
  const subtotalMax = lotPriceMax + auctionFees + trucking + shippingCost + whestWheelsFee;

  const customsValueMin = calculatorType === 'estimated' ? estimatedRange.min : customsValue;
  const customsValueMax = calculatorType === 'estimated' ? estimatedRange.max : customsValue;
  
  // Adjust VAT based on destination
  const effectiveVatPercent = destination === 'Moldova' ? 20 : vatPercent;
  
  const taxAmount = (customsValueMin * taxPercent) / 100;
  const taxAmountMax = (customsValueMax * taxPercent) / 100;
  const vatAmount = ((customsValueMin + taxAmount) * effectiveVatPercent) / 100;
  const vatAmountMax = ((customsValueMax + taxAmountMax) * effectiveVatPercent) / 100;
  const allIn = destination === 'Moldova' ? 400 : 500; // Different rate for Moldova
  const customsTotal = taxAmount + vatAmount + allIn;
  const customsTotalMax = taxAmountMax + vatAmountMax + allIn;
  const finalTotal = subtotal + customsTotal;
  const finalTotalMax = subtotalMax + customsTotalMax;

  return (
    <>
      <div className="box final_price_estimator" id="final-price-estimator">
        <div className="header">
          <h4>
            <IconTag />
            <label htmlFor="whatCurrency">Final Price Estimator</label>
          </h4>
          <div className="calculator-selectors">
            <select 
              className="select-your-destination" 
              id="whatDestination" 
              value={destination} 
              onChange={(e) => setDestination(e.target.value as 'EU' | 'Moldova')}
            >
              <option value="EU">EU</option>
              <option value="Moldova">Moldova</option>
            </select>
            <select 
              className="select-your-currency" 
              id="whatCurrency" 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value as 'EUR' | 'PLN')}
            >
              <option value="PLN">PLN</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        </div>
        <div className="estimator-wr">
          <ul className="price_tabs">
            <li>
              <a
                href="#"
                className={`est_based ${calculatorType === 'estimated' ? 'active' : ''}`}
                id="final-calculator-estimated-button"
                style={{ padding: '3px 13px !important' }}
                onClick={(e) => {
                  e.preventDefault();
                  setCalculatorType('estimated');
                }}
              >
                Estimated
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`est_bid ${calculatorType === 'bid' ? 'active' : ''}`}
                id="final-calculator-bid-button"
                onClick={(e) => {
                  e.preventDefault();
                  setCalculatorType('bid');
                }}
              >
                Current Bid
              </a>
            </li>
            {car.fastBuyPrice && (
              <li>
                <a
                  href="#"
                  className={`est_buy_now ${calculatorType === 'buy-now' ? 'active' : ''}`}
                  id="final-calculator-buy-now-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setCalculatorType('buy-now');
                  }}
                >
                  Fast buy
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="estimator_main_price_wr">
          <div className="estimator-price-wr total">
            <h4 id="final-in-currency-large">
              {calculatorType === 'estimated' 
                ? `€${Math.round(finalTotal * 0.8558).toLocaleString()} - €${Math.round(finalTotalMax * 0.8558).toLocaleString()}`
                : formatPrice(finalTotal)
              }
            </h4>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                className="bi bi-house-door"
                fill="#7F8FA4"
                viewBox="0 0 16 16"
                style={{ marginTop: '-3px', verticalAlign: 'middle' }}
              >
                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"></path>
              </svg>
              Estimated total price
            </span>
          </div>

          <div className="estimator-price-wr purchase">
            <h4 id="lot-price-large">
              {calculatorType === 'estimated'
                ? `$${estimatedRange.min.toLocaleString()} - $${estimatedRange.max.toLocaleString()}`
                : formatPrice(lotPrice, 'USD')
              }
            </h4>
            <span>
              <IconAuctionBid />
              Purchase amount
            </span>
          </div>

          <div className="estimator-price-wr declared">
            <h4 id="customs-amount-large">
              {calculatorType === 'estimated'
                ? `$${estimatedRange.min.toLocaleString()} - $${estimatedRange.max.toLocaleString()}`
                : formatPrice(customsValue, 'USD')
              }
            </h4>
            <span>
              <IconSecurity />
              Customs value
            </span>
          </div>
        </div>
      </div>

      <div className="box box_info" id="calculator-info">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#101828" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M16 9L10.5 14.5L8 12" stroke="#101828" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
        <a href="#" className="close_mess" id="calculator-info-close" onClick={(e) => e.preventDefault()}>
          <IconClose />
        </a>
        <p>
          Have you noticed that the competition offers to import this vehicle for a price lower by several thousands of euro? It is worth asking about
          <span>the customs value of the vehicle.</span>
          Make sure what exactly is included in their offer. Savings on customs clearance costs may be offset by additional,
          <span>hidden fees</span>.
          The submission of a customs value declaration is the sole responsibility of the client. Always ask for a detailed cost calculation and do not rely solely on the home delivery price. Be aware and make an
          <span>informed</span>
          choice!
        </p>
      </div>

      <div className="box" id="basic-calculator">
        <div className="header">
          <span className="markedby final-calculator-estimated-button">
            {calculatorType === 'estimated' ? 'Estimated' : calculatorType === 'bid' ? 'Current Bid' : 'Fast Buy'}
          </span>
          <h4>
            <IconCalculator />
            Final Price Calculator
          </h4>
        </div>
        <div className="exapanded_calc">
          <div className="options-list">
            <div className="option">
              <div className="num">1</div>
              Lot Price
              <span className="right-info" id="lot-price">
                {formatPrice(lotPrice, 'USD')}
              </span>
            </div>
            <div className="option">
              <div className="num">2</div>
              Auction Fees
              <a href="#" id="auction-fees-tooltip" className="tips-question" data-toggle="tooltip" data-placement="bottom" data-html="true" title="">
                <IconQuestion />
              </a>
              <span className="right-info" id="auction-fees">
                {formatPrice(auctionFees, 'USD')}
              </span>
            </div>
            <div className="option">
              <div className="num">3</div>
              Trucking to port
              <span className="right-info">{formatPrice(trucking, 'USD')}</span>
            </div>
            <div className="option">
              <div className="num">4</div>
              <label htmlFor="shipping">Shipping to</label>
              <select className="select-your-location" id="shipping" value={shippingPort} onChange={(e) => setShippingPort(e.target.value)}>
                <option value="995">Rotterdam, NL</option>
                <option value="1495">Gdynia, PL</option>
                <option value="995">Bremerhaven, DE</option>
                <option value="1145">Klaipeda, LT</option>
              </select>
              <span className="right-info" id="shipping-cost">
                {formatPrice(shippingCost, 'USD')}
              </span>
            </div>
            <div className="option">
              <div className="num">5</div>
              WhestWheels Fee (+ VAT/Tax)
              <span className="right-info">{formatPrice(whestWheelsFee, 'USD')}</span>
            </div>
          </div>
        </div>

        <div className="subtotal">
          <div className="option">
            <div className="num">1</div>
            <span className="line"></span>
            <div className="num">4</div>
            Subtotal
          </div>
          <div className="price">
            <span className="right-info" id="final-price">
              {formatPrice(subtotal, 'USD')}
            </span>
          </div>
        </div>

        <div className="footer">
          The calculator check location of the vehicle and shipment from one of the six ports in the USA depending on the branch location.
          <br />
          <a href="/help/payments?q=29">Penalties and additional auction fees</a>
        </div>
      </div>

      <div className="box" id="custom-clearance-calculator">
        <div className="header">
          <span className="markedby final-calculator-estimated-button">
            {calculatorType === 'estimated' ? 'Estimated' : calculatorType === 'bid' ? 'Current Bid' : 'Fast Buy'}
          </span>
          <h4>
            <IconSecurity />
            Customs Calculator
          </h4>
          <div className="flag">
            {destination === 'EU' ? 'EU' : 'Moldova'} {destination === 'EU' && <IconEU />}
          </div>
        </div>

        <div className="options-list">
          <div className="option with_input">
            <div className="num_wr">
              <label htmlFor="customs-input">
                <span className="num-range">
                  <div className="num">1</div>
                  <span className="line"></span>
                  <div className="num">4</div>
                </span>
                <span style={{ whiteSpace: 'nowrap' }}>Customs value</span>
              </label>
            </div>
            <div className="input-group right-info" id="customs-amount">
              <div className="input-group-prepend">
                <span className="input-group-text minus-btn" onClick={() => setCustomsValue(Math.max(0, customsValue - 100))}>
                  <IconMinus />
                </span>
              </div>
              <input
                type="text"
                name="customs-input"
                className="form-control"
                id="customs-input"
                value={customsValue}
                onChange={(e) => setCustomsValue(parseInt(e.target.value) || 0)}
              />
              <div className="input-group-append">
                <span className="input-group-text plus-btn" onClick={() => setCustomsValue(customsValue + 100)}>
                  <IconPlus />
                </span>
              </div>
            </div>
          </div>
          <div className="option">
            <div className="num_wr">
              <div className="num">6</div>
              <label htmlFor="taxPercent">Tax</label>
              <select
                className="select-your-location"
                id="taxPercent"
                value={taxPercent}
                onChange={(e) => setTaxPercent(parseFloat(e.target.value))}
                style={{ display: 'inline-block', maxWidth: '155px' }}
              >
                <option value="10">10% (Car)</option>
                <option value="22">22% (Truck)</option>
                <option value="6">6% (Motorcycle)</option>
                <option value="1.7">1.7% (Jet Ski/Boat)</option>
                <option value="0">
                  0% (Classic Car)
                </option>
              </select>
            </div>
            <span className="right-info" id="tax-amount">
              {formatPrice(taxAmount)}
            </span>
          </div>
          <div className="option">
            <div className="num_wr">
              <div className="num">7</div>
              <label htmlFor="vatPercent">VAT</label>
              <select 
                className="select-your-location" 
                id="vatPercent" 
                value={vatPercent} 
                onChange={(e) => setVatPercent(parseFloat(e.target.value))}
                disabled={destination === 'Moldova'}
              >
                {destination === 'EU' ? (
                  <>
                    <option value="19">19% (Bremerhaven)</option>
                    <option value="21">21% (Rotterdam)</option>
                    <option value="23">23% (Gdynia)</option>
                    <option value="9">9% (Classic Car)</option>
                  </>
                ) : (
                  <option value="20">20% (Moldova Standard VAT)</option>
                )}
              </select>
            </div>
            <span className="right-info" id="vat-amount">
              {formatPrice(vatAmount)}
            </span>
          </div>
          <div className="option with_copy">
            <div className="num_wr">
              <div className="num">8</div>
              Custom agency "All In"
              <a href="#" className="tips-question" data-toggle="tooltip" data-placement="bottom" title="">
                <IconQuestion />
              </a>
            </div>
            <span className="right-info" id="allIn-amount">
              {formatPrice(allIn)}
            </span>
          </div>
          <div className="option">
            <div className="num_wr">
              <span className="num-range">
                <div className="num">6</div>
                <span className="line"></span>
                <div className="num">8</div>
              </span>
              Custom clearance total
            </div>
            <span className="right-info" id="customs-final">
              {formatPrice(customsTotal)}
            </span>
          </div>
        </div>

        <div className="subtotal full-total">
          <div className="option">
            <div className="num">1</div>
            <span className="line"></span>
            <div className="num">8</div>
            Estimated total price
          </div>
          <div className="price">
            <span className="right-info" id="final-in-currency">
              {formatPrice(finalTotal)}
            </span>
          </div>
        </div>

        <div className="footer">
          Custom clearance calculator is for information purposes only
          <br />
          <br />
          Exchange rate: USD/EUR 0.8558, USD/PLN 3.6035, EUR/PLN 4.2105
          <br />
          Exchange rates updated: Jan 8, 2026, 10:00 AM
          <br />
          Rates of The National Bank of Poland <a href="http://www.nbp.pl/">nbp.pl</a>
        </div>
      </div>
    </>
  );
}

