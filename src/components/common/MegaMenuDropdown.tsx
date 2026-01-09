'use client';

import './megaMenuDropdown.css';

interface MenuItem {
  id: string;
  label: string;
  href?: string;
  hasSidePanel?: boolean;
  sidePanelContent?: React.ReactNode;
  height?: number;
}

interface MegaMenuDropdownProps {
  items: MenuItem[];
}

export function MegaMenuDropdown({ items }: MegaMenuDropdownProps) {
  return (
    <div className="dropdown">
      <ul>
        {items.map((item) => (
          <li key={item.id} className={`${item.id} ${item.hasSidePanel ? 'has-side-panel' : ''}`}>
            {item.id === 'menu-item0' ? (
              <div>
                <a
                  href={item.href || '/en/search/results?search-type=filters&status=All&type=Automobile&make=All&model=All&year-from=1900&year-to=2027&auction-type=All'}
                  data-sec-preload={item.href || '/en/search/results?search-type=filters&status=All&type=Automobile&make=All&model=All&year-from=1900&year-to=2027&auction-type=All'}
                >
                  {item.label}
                </a>
              </div>
            ) : (
              <>
                <a href={item.href || '#'}>
                  {item.label}
                </a>
                {item.hasSidePanel && item.sidePanelContent && (
                  <div className={`side-panel ${item.id === 'menu-item2' ? 'plain-list' : ''}`}>
                    {item.sidePanelContent}
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

