'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { MegaMenuDropdown } from '../common/MegaMenuDropdown';
import { FeaturedSidePanel } from '../common/FeaturedSidePanel';
import { EstimatedCostSidePanel } from '../common/EstimatedCostSidePanel';
import './navigationMenu.css';

const megaMenuItems = [
  {
    id: 'menu-item0',
    label: 'Search',
    href: '/en/search/results?search-type=filters&status=All&type=Automobile&make=All&model=All&year-from=1900&year-to=2027&auction-type=All',
    height: 45,
  },
  {
    id: 'menu-item1',
    label: 'Featured',
    hasSidePanel: true,
    sidePanelContent: <FeaturedSidePanel />,
    height: 45,
  },
  {
    id: 'menu-item2',
    label: 'Estimated cost',
    hasSidePanel: true,
    sidePanelContent: <EstimatedCostSidePanel />,
    height: 45,
  },
  {
    id: 'menu-item3',
    label: 'Engine size, type, horsepower',
    height: 66,
  },
  {
    id: 'menu-item4',
    label: 'Body style',
    height: 45,
  },
  {
    id: 'menu-item5',
    label: 'Popular makes',
    height: 45,
  },
  {
    id: 'menu-item6',
    label: 'Popular models',
    height: 45,
  },
  {
    id: 'menu-item7',
    label: 'Loss type',
    height: 45,
  },
  {
    id: 'menu-item8',
    label: 'Motorcycles and ATV',
    height: 45,
  },
  {
    id: 'menu-item9',
    label: 'Personal Watercraft',
    height: 45,
  },
];

export function NavigationMenu() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (itemId: string) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  return (
    <nav className="navigation">
      <ul className="menu">
        <li className={`menu-item child devided mega-menu ${activeDropdown === 'mega-menu' ? 'active' : ''}`}>
          <a
            href="#"
            className="menu-link mega-menu-link"
            onClick={(e) => {
              e.preventDefault();
              handleDropdownToggle('mega-menu');
            }}
          >
            Search & Bid
            <img src="https://bid.cars/img/upd/arrow_down.svg" className="arrw" width="11" height="7" alt="Dropdown" />
          </a>
          <MegaMenuDropdown items={megaMenuItems} />
        </li>
        <li className="menu-item">
          <a
            href="/delivery-times"
            className="menu-link menu-link--simple"
          >
            Delivery Times
          </a>
        </li>
        <li className={`menu-item child ${activeDropdown === 'how-it-works' ? 'active' : ''}`}>
          <a
            href="#"
            className="menu-link"
            onClick={(e) => {
              e.preventDefault();
              handleDropdownToggle('how-it-works');
            }}
          >
            How it works
            <img src="https://bid.cars/img/upd/arrow_down.svg" className="arrw" width="11" height="7" alt="Dropdown" />
          </a>
          <ul className="menu-dropdown-wide">
            <li>
              <a
                href="/en/how-it-works"
                className="menu-dropdown-link"
              >
                Before purchase
              </a>
            </li>
            <li>
              <a
                href="/en/schedule"
                className="menu-dropdown-link"
              >
                After purchase
              </a>
            </li>
          </ul>
        </li>
        <li className="menu-item">
          <a
            href="/help"
            className="menu-link menu-link--simple"
          >
            Help
          </a>
        </li>
        <li className="menu-item">
          <a
            href="/about-us"
            className="menu-link menu-link--simple"
          >
            About Us
          </a>
        </li>
        <li className="menu-item">
          <a
            href="/contact"
            className="menu-link menu-link--simple"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}

