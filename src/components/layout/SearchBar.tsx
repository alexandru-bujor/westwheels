'use client';

import { Search, ChevronDown } from 'lucide-react';
import './searchBar.css';

interface SearchBarProps {
  isCurrentActive: boolean;
  onCurrentClick: () => void;
  onArchivedClick: () => void;
}

export function SearchBar({ isCurrentActive, onCurrentClick, onArchivedClick }: SearchBarProps) {
  return (
    <div className="search-cross">
      <div className="input-wrapper">
        {/* Current/Archived Toggle */}
        <div className="type-selector">
          <a
            href="#"
            className={`type-selector-link ${isCurrentActive ? 'type-selector-link--active' : 'type-selector-link--inactive'}`}
            onClick={(e) => {
              e.preventDefault();
              onCurrentClick();
            }}
          >
            Current
          </a>
          <a
            href="#"
            className={`type-selector-link ${!isCurrentActive ? 'type-selector-link--active' : 'type-selector-link--inactive'}`}
            onClick={(e) => {
              e.preventDefault();
              onArchivedClick();
            }}
          >
            Archived
          </a>
          <ChevronDown className="type-selector-chevron" />
        </div>

        {/* Search Input */}
        <input
          type="text"
          className="search-input"
          placeholder="Search for vehicle by Make, Model, Lot or VIN..."
          id="search_field"
          autoComplete="off"
        />

        {/* Search Count */}
        <span className="search-count">0</span>

        {/* Search Submit Button */}
        <a
          href="#"
          className="search-submit"
          id="submit_search"
        >
            <img src="https://bid.cars/img/upd/search.svg" width="24" height="24" className="arrw" alt="Search"/>
        </a>
      </div>
    </div>
  );
}

