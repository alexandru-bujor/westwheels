'use client';

import './estimatedCostSidePanel.css';

const estimatedCostItems = [
  { href: '/en/search/results?search-type=filters&status=All&type=Automobile&make=All&model=All&year-from=1900&year-to=2027&auction-type=All&estimated-max=2000', label: 'Four Wheels to Start', price: 'to $2000' },
  { href: '/en/search/results?search-type=filters&status=All&type=Automobile&make=All&model=All&year-from=1900&year-to=2027&auction-type=All&estimated-min=2000&estimated-max=5000', label: 'Budget Racer', price: 'to $5000' },
  { href: '/en/search/results?search-type=filters&status=All&type=Automobile&make=All&model=All&year-from=1900&year-to=2027&auction-type=All&estimated-min=5000&estimated-max=10000', label: 'Golden Mean', price: 'to $10 000' },
  { href: '/en/search/results?search-type=filters&status=All&type=Automobile&make=All&model=All&year-from=1900&year-to=2027&auction-type=All&estimated-min=10000&estimated-max=15000', label: 'Style and Elegance', price: 'to $15 000' },
  { href: '/en/search/results?search-type=filters&status=All&type=Automobile&make=All&model=All&year-from=1900&year-to=2027&auction-type=All&estimated-min=15000&estimated-max=20000', label: 'Business Ride', price: 'to $20 000' },
  { href: '/en/search/results?search-type=filters&status=All&type=Automobile&make=All&model=All&year-from=1900&year-to=2027&auction-type=All&estimated-min=20000&estimated-max=30000', label: 'Prestige on Wheels', price: 'to $30 000' },
  { href: '/en/search/results?search-type=filters&status=All&type=Automobile&make=All&model=All&year-from=1900&year-to=2027&auction-type=All&estimated-min=30000&estimated-max=50000', label: 'Relaxed Luxury', price: 'to $50 000' },
  { href: '/en/search/results?search-type=filters&status=All&type=Automobile&make=All&model=All&year-from=1900&year-to=2027&auction-type=All&estimated-min=50000&estimated-max=100000', label: 'Living Room on Wheels', price: 'to $100 000' },
  { href: '/en/search/results?search-type=filters&status=All&type=Automobile&make=All&model=All&year-from=1900&year-to=2027&auction-type=All&estimated-min=100000&estimated-max=200000', label: 'Millionaire on Asphalt', price: 'to $200 000' },
];

export function EstimatedCostSidePanel() {
  return (
    <>
      <h3 style={{ display: 'none' }}>
        <img src="https://bid.cars/img/upd/arrow_down.svg" className="arrw_back" width="11" height="7" alt="Back" />
        Estimated cost
      </h3>
      <ul>
        {estimatedCostItems.map((item, index) => (
          <li key={index}>
            <a
              href={item.href}
              data-sec-preload={item.href}
              className="estimated-cost-link"
            >
              {item.label}<br />({item.price})
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

