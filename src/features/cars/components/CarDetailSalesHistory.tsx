'use client';

import { Car } from '@/types/car';

interface CarDetailSalesHistoryProps {
  car: Car;
}

export function CarDetailSalesHistory({ car }: CarDetailSalesHistoryProps) {
  if (!car.salesHistory || car.salesHistory.length === 0) {
    return null;
  }

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="sales-history-table-wr">
      <div className="header">
        <div className="sec-name">
          <img src="/img/upd/trending-up.svg" width="20" height="20" alt="Sales History" />
          Sales History
        </div>
      </div>
      <table className="tabs-content table sales-history-table">
        <thead>
          <tr>
            <th scope="col">Auction</th>
            <th scope="col">Date</th>
            <th scope="col">Lot #</th>
            <th scope="col">Final bid</th>
            <th scope="col">Odometer</th>
            <th scope="col">Status</th>
            <th scope="col">Seller</th>
          </tr>
        </thead>
        <tbody>
          {car.salesHistory.map((sale, index) => (
            <tr key={index} style={{ position: 'relative' }}>
              <th scope="row">
                <span className={`seo-label ${sale.auction.toLowerCase()}`}>{sale.auction}</span>
              </th>
              <td>{sale.date}</td>
              <td>
                <a href={`/lot/${sale.lot}`} className="full-row-link" rel="nofollow">
                  {sale.lot}
                </a>
              </td>
              <td>
                <span className="status price">{formatPrice(sale.finalBid)}</span>
              </td>
              <td>{sale.odometer || '---'}</td>
              <td>
                <span className={`status ${sale.status === 'sold' ? 'sold' : 'not-sold'}`}>
                  {sale.status === 'sold' ? 'Sold' : 'Not sold'}
                </span>
              </td>
              <td>{sale.seller}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

