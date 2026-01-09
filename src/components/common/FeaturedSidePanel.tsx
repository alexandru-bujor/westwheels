'use client';

import './featuredSidePanel.css';

export function FeaturedSidePanel() {
  return (
    <>
      <h3 style={{ display: 'none' }}>
        <img src="https://bid.cars/img/upd/arrow_down.svg" className="arrw_back" width="11" height="7" alt="Back" />
        Featured
      </h3>
      <div className="section">
        <div className="heading">Auction Type</div>
        <a
          href="/en/search/results?search-type=filters&status=All&type=Automobile&make=All&model=All&year-from=1900&year-to=2027&auction-type=Copart"
          data-sec-preload="/en/search/results?search-type=filters&status=All&type=Automobile&make=All&model=All&year-from=1900&year-to=2027&auction-type=Copart"
          className="featured-link"
        >
          Copart
        </a>
        <a
          href="/en/search/results?search-type=filters&status=All&type=Automobile&make=All&model=All&year-from=1900&year-to=2027&auction-type=IAAI"
          data-sec-preload="/en/search/results?search-type=filters&status=All&type=Automobile&make=All&model=All&year-from=1900&year-to=2027&auction-type=IAAI"
          className="featured-link"
        >
          IAAI
        </a>
      </div>
      <div className="section">
        <div className="heading">Status</div>
        {['All', 'Opened Auction', 'Live', 'Finished Today', 'Fast Buy'].map((status, idx) => {
          const statusParam = idx === 0 ? 'All' : status === 'Opened Auction' ? 'Active' : status === 'Finished Today' ? 'Ended' : status === 'Fast Buy' ? 'Fast-buy' : status;
          const href = `/en/search/results?search-type=filters&status=${statusParam}&type=Automobile&make=All&model=All&year-from=1900&year-to=2027&auction-type=All`;
          return (
            <a
              key={status}
              href={href}
              data-sec-preload={href}
              className="featured-link"
            >
              {status}
            </a>
          );
        })}
      </div>
      <div className="section">
        <div className="heading">Vehicle Type</div>
        {[
          { href: '/en/search/results?search-type=filters&status=All&type=Automobile&make=Muscle-Pony&model=All&year-from=1900&year-to=2027&auction-type=All', label: 'Muscle / Pony cars' },
          { href: '/en/search/results?search-type=filters&status=All&type=Automobile&make=Supercars&model=All&year-from=1900&year-to=2027&auction-type=All', label: 'Supercars' },
          { href: '/en/search/results?search-type=filters&status=All&type=Automobile&make=All&model=All&year-from=1900&year-to=1990&auction-type=All', label: 'Classic Cars' },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            data-sec-preload={item.href}
            className="featured-link"
          >
            {item.label}
          </a>
        ))}
      </div>
      <div className="section">
        <div className="heading">Archived</div>
        <a
          href="/en/search/results?search-type=filters&status=Archived&type=Automobile&make=All&model=All&year-from=1900&year-to=2027&auction-type=All"
          data-sec-preload="/en/search/results?search-type=filters&status=Archived&type=Automobile&make=All&model=All&year-from=1900&year-to=2027&auction-type=All"
          className="featured-link"
        >
          Archived Auctions
        </a>
      </div>
    </>
  );
}

