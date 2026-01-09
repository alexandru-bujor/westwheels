'use client';

import { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import './quickLinks.css';

export function QuickLinks() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (itemId: string) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  return (
    <ul className="quick-links">
      <li className={`quick-link-item contacts-dropdown no-mobile group ${activeDropdown === 'contacts' ? 'active' : ''}`}>
        <a
          href="#"
          className="quick-link"
          onClick={(e) => {
            e.preventDefault();
            handleDropdownToggle('contacts');
          }}
        >
          +48 726 099 099
          <ChevronDown className="quick-link-chevron" />
        </a>
      </li>
      <li className={`quick-link-item group ${activeDropdown === 'language' ? 'active' : ''}`}>
        <a
          href="#"
          className="quick-link"
          onClick={(e) => {
            e.preventDefault();
            handleDropdownToggle('language');
          }}
        >
          <Globe className="quick-link-icon" />
          English
          <ChevronDown className="quick-link-chevron" />
        </a>
      </li>
    </ul>
  );
}

