'use client';

export function TopNavigation() {
  return (
    <div id="info-bar">
      <div
        className="info_bar bg-[#28a745] text-white cursor-pointer"
        style={{ padding: '7px 10px' }}
        onClick={() => (window.location.href = '/search')}
      >
        <span>
          <span className="font-semibold">1</span>{' '}
          <span className="font-bold text-lg">848</span> Auctions currently in progress{' '}
          <a
            href="/search"
            className="font-semibold hover:underline underline-offset-2"
            onClick={(e) => e.stopPropagation()}
          >
            Live Auctions
          </a>
        </span>
      </div>
    </div>
  );
}

