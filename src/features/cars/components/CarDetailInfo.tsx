'use client';

import { useState } from 'react';
import { Car } from '@/types/car';
import { IconClipboard, IconKey, IconQuestion, IconSealCheck, IconYellowClock, IconLotTitle, IconSliders } from '@/components/common/Icons';

interface CarDetailInfoProps {
  car: Car;
}

export function CarDetailInfo({ car }: CarDetailInfoProps) {
  const [showMoreSpecs, setShowMoreSpecs] = useState(false);
  const [showMoreServices, setShowMoreServices] = useState(false);

  return (
    <>
      <div className="box" id="main-info">
        <div className="options-list">
          <div className="option">
            Lot
            <span className="right-info">
              <span className="copy-lot">
                <span className="lot-drop">
                  {car.lotNumber.split('-')[0]}-<h2 style={{ display: 'inline', fontSize: '14px' }}>
                    {car.lotNumber.split('-')[1]}
                  </h2>
                </span>
                <IconClipboard />
              </span>
            </span>
          </div>
          <div className="option">
            VIN
            <span className="right-info">
              <span className="copy-vin">
                <span className="vin-drop">{car.vin}</span>
                <IconClipboard />
              </span>
            </span>
          </div>

          <div className="option">
            Seller
            <span className="right-info inline">
              <span
                className="tips-question yellow_alert"
                data-toggle="tooltip"
                data-placement="bottom"
                title="The seller has not been considered trustworthy by WhestWheels, or detailed information is missing. Please exercise caution when making a purchase decision."
              >
                <span style={{ fontWeight: 'bold' }}>{car.seller}</span>
              </span>
            </span>
          </div>

          {car.saleDocument && (
            <div className="option sale_doc">
              Sale Document
              <span className="right-info inline">
                <span
                  className="tips-question green_alert"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Export possible / registration in Poland possible with current documentation"
                >
                  {car.saleDocumentType === 'pending' && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '4px' }}>
                      <IconYellowClock />
                    </span>
                  )}
                  <span style={{ fontWeight: 'bold' }}>{car.saleDocument}</span>
                  {car.saleDocumentType === 'approved' && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '4px' }}>
                      <IconSealCheck />
                    </span>
                  )}
                </span>
              </span>
            </div>
          )}
          {car.saleDocument && (
            <div className="option sale_doc img_tltp_wrapper">
              <a href="#" className="img_tltp_preview rotation_anim" onClick={(e) => e.preventDefault()}>
                <span>
                  <IconLotTitle />
                  Show sale document
                </span>
              </a>
            </div>
          )}

          <div className="expert_message normal">
            <div className="image">
              <img src="/images/contact/people/patryk.png" width="50" height="50" alt="Patryk Szwałek" />
            </div>
            <div className="content">
              <h3>Patryk Szwałek</h3>
              <h4>WhestWheels Expert</h4>
              <p>
                <b>Sold by a non-recommended seller</b>
              </p>
              <p style={{ textAlign: 'justify' }}>
                The vehicle is offered by a seller who has not been verified by WhestWheels as trustworthy, or the available
                information about them is incomplete. We recommend caution when making a purchase decision. The documentation
                is complete and allows registration of the vehicle in Poland.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="box" id="secondary-info">
        <div className="options-list">
          {car.damage?.loss && (
            <div className="option">
              Loss
              <span className="right-info tips-question" data-toggle="tooltip" data-placement="bottom" title="">
                {car.damage.loss || '-'}
              </span>
            </div>
          )}
          {car.damage?.primary && (
            <div className="option">
              Primary damage
              <span className="right-info tips-question" data-toggle="tooltip" data-placement="bottom" title="">
                {car.damage.primary}
              </span>
            </div>
          )}
          {car.damage?.secondary && (
            <div className="option">
              Secondary damage
              <span className="right-info tips-question" data-toggle="tooltip" data-placement="bottom" title="">
                {car.damage.secondary}
              </span>
            </div>
          )}
          {car.mileage !== undefined && (
            <div className="option">
              Odometer
              <span className="right-info tips-question" data-toggle="tooltip" data-placement="bottom" title="">
                {car.mileage.toLocaleString()} {car.mileageUnit || 'mi'}
                {car.mileageUnit === 'mi' && (
                  <> ({Math.round(car.mileage * 1.60934).toLocaleString()} km)</>
                )}
              </span>
            </div>
          )}
          {car.startCode && (
            <div className="option start_code" data-start-code={car.startCode}>
              Start code
              <span className="right-info tips-question" data-toggle="tooltip" data-placement="bottom" title="">
                {car.startCode}
              </span>
            </div>
          )}
          {car.key && (
            <div className="option">
              Key
              <span className="right-info tips-question" data-toggle="tooltip" data-placement="bottom" title="">
                {car.key}
                {car.key === 'Present' && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '5px' }}>
                    <IconKey />
                  </span>
                )}
              </span>
            </div>
          )}
          {(car.acv !== undefined || car.erc !== undefined) && (
            <div className="option">
              ACV / ERC
              <span className="right-info tips-question" data-toggle="tooltip" data-placement="bottom" title="">
                ${car.acv?.toLocaleString() || 0} USD / ${car.erc?.toLocaleString() || 0} USD
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="box" id="tertiary-info">
        <div className="options-list icons_list">
          {car.exteriorColor && (
            <div className="option no-wrap-text-ellipsis">
              Exterior color
              <span className="right-info">{car.exteriorColor}</span>
            </div>
          )}

          <div className="more-specs" style={{ display: showMoreSpecs ? 'block' : 'none' }}>
            <div className="option no-wrap-text-ellipsis" style={{ marginTop: '10px', borderTop: '0px !important', fontWeight: 'bold' }}>
              Data fetched from the platform {car.platform === 'copart' ? 'Copart' : 'IAAI'}
            </div>
            {car.model && (
              <div className="option no-wrap-text-ellipsis">
                Model<span className="right-info">{car.model}</span>
              </div>
            )}
            {car.transmission && (
              <div className="option no-wrap-text-ellipsis">
                Transmission<span className="right-info">{car.transmission}</span>
              </div>
            )}
            {car.saleStatus && (
              <div className="option no-wrap-text-ellipsis">
                Sale Status<span className="right-info">{car.saleStatus}</span>
              </div>
            )}
          </div>

          <a href="#" className="show-more-specs" onClick={(e) => { e.preventDefault(); setShowMoreSpecs(!showMoreSpecs); }}>
            <span className="more-text" style={{ display: showMoreSpecs ? 'none' : 'inline' }}>
              Show more
            </span>
            <span className="less-text" style={{ display: showMoreSpecs ? 'inline' : 'none' }}>
              Show less
            </span>
            <span className="num">3</span>
          </a>
        </div>
      </div>

      <div className="box additional_services_wr" id="additional-services">
        <div className="header">
          <h4>
            <IconSliders />
            Additional Services
          </h4>
        </div>

        <div className="options-list">
          <div className="more-additional-services" style={{ display: showMoreServices ? 'block' : 'none' }}>
            <div className="option">
              <div className="form-check form-check-inline">
                <div className="num num-large">11</div>
                <input className="form-check-input" type="checkbox" id="inlineCheckbox4" />
                <label className="form-check-label" htmlFor="inlineCheckbox4">
                  Vehicle with purchase restriction
                  <a href="#" className="tips-question" data-toggle="tooltip" data-placement="bottom" title="">
                    <IconQuestion />
                  </a>
                </label>
              </div>
              <span className="right-info" id="restricted-states-amount">$0</span>
            </div>
            <div className="option">
              <div className="form-check form-check-inline">
                <div className="num num-large">12</div>
                <input className="form-check-input" type="checkbox" id="inlineCheckbox5" />
                <label className="form-check-label" htmlFor="inlineCheckbox5">
                  Hazardous cargo
                  <a href="#" className="tips-question" data-toggle="tooltip" data-placement="bottom" title="">
                    <IconQuestion />
                  </a>
                </label>
              </div>
              <span className="right-info" id="hazardous-cargo-amount">$0</span>
            </div>
            <div className="option">
              <div className="form-check form-check-inline">
                <div className="num num-large">13</div>
                <input className="form-check-input" type="checkbox" id="inlineCheckbox6" />
                <label className="form-check-label" htmlFor="inlineCheckbox6">
                  Oversized vehicle
                  <a href="#" className="tips-question" data-toggle="tooltip" data-placement="bottom" title="">
                    <IconQuestion />
                  </a>
                </label>
              </div>
              <span className="right-info" id="oversized-vehicle-amount">$0</span>
            </div>
            <div className="option">
              <div className="form-check form-check-inline">
                <div className="num num-large">14</div>
                <input className="form-check-input" type="checkbox" id="inlineCheckbox7" />
                <label className="form-check-label" htmlFor="inlineCheckbox7">
                  Oversized+ vehicle
                  <a href="#" className="tips-question" data-toggle="tooltip" data-placement="bottom" title="">
                    <IconQuestion />
                  </a>
                </label>
              </div>
              <span className="right-info" id="oversized-vehicle-plus-amount">$0</span>
            </div>
            <div className="lit msg" style={{ textAlign: 'justify' }}>
              Selecting a check mark will add the given amount to the estimated total price.
            </div>
          </div>
          <a
            href="#"
            className="show-more-additional-services"
            onClick={(e) => {
              e.preventDefault();
              setShowMoreServices(!showMoreServices);
            }}
          >
            <span className="more-text" style={{ display: showMoreServices ? 'none' : 'inline' }}>
              Show more
            </span>
            <span className="less-text" style={{ display: showMoreServices ? 'inline' : 'none' }}>
              Show less
            </span>
            <span className="num" style={{ display: showMoreServices ? 'none' : 'inline' }}>3</span>
          </a>
        </div>
      </div>
    </>
  );
}

