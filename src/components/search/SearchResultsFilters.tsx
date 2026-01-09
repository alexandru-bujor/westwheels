'use client';

import { useState } from 'react';
import './searchResultsFilters.css';

interface SearchResultsFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  status: string;
  type: string;
  make: string;
  model: string;
  yearFrom: string;
  yearTo: string;
  auctionType: string;
  copart: boolean;
  iaai: boolean;
}

export function SearchResultsFilters({ onFilterChange }: SearchResultsFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    status: 'All',
    type: 'Automobile',
    make: 'All',
    model: 'All',
    yearFrom: '',
    yearTo: '',
    auctionType: 'All',
    copart: true,
    iaai: true,
  });

  const [isExpanded, setIsExpanded] = useState(true);

  const handleFilterChange = (key: keyof FilterState, value: string | boolean) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const makes = [
    'All makes',
    'Acura',
    'Audi',
    'BMW',
    'Chevrolet',
    'Dodge',
    'Ford',
    'Honda',
    'Mercedes-Benz',
    'Nissan',
    'Toyota',
    'Volkswagen',
  ];

  const years = Array.from({ length: 128 }, (_, i) => 2027 - i);

  return (
    <div className="search-filters-sidebar">
      <div className="filters-header">
        <h3>Filters</h3>
        <button
          className="toggle-filters"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {isExpanded && (
        <div className="filters-content">
          {/* Status Filter */}
          <div className="filter-group">
            <label className="filter-label">Status</label>
            <select
              className="filter-select"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="All">All</option>
              <option value="Current">Current</option>
              <option value="Archived">Archived</option>
              <option value="Fast-buy">Fast Buy</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="filter-group">
            <label className="filter-label">Type</label>
            <select
              className="filter-select"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="Automobile">Automobile</option>
              <option value="Motorcycle">Motorcycle</option>
              <option value="ATV">ATV</option>
              <option value="Truck">Truck</option>
              <option value="Boat">Boat</option>
              <option value="Trailer">Trailer</option>
            </select>
          </div>

          {/* Make Filter */}
          <div className="filter-group">
            <label className="filter-label">Make</label>
            <select
              className="filter-select"
              value={filters.make}
              onChange={(e) => handleFilterChange('make', e.target.value)}
            >
              {makes.map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>

          {/* Model Filter */}
          <div className="filter-group">
            <label className="filter-label">Model</label>
            <select
              className="filter-select"
              value={filters.model}
              onChange={(e) => handleFilterChange('model', e.target.value)}
              disabled={filters.make === 'All makes'}
            >
              <option value="All">All models</option>
              {/* In a real app, this would be populated based on selected make */}
              <option value="Mustang">Mustang</option>
              <option value="Camaro">Camaro</option>
              <option value="Challenger">Challenger</option>
            </select>
          </div>

          {/* Year From Filter */}
          <div className="filter-group">
            <label className="filter-label">Year From</label>
            <select
              className="filter-select"
              value={filters.yearFrom}
              onChange={(e) => handleFilterChange('yearFrom', e.target.value)}
            >
              <option value="">From</option>
              {years.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Year To Filter */}
          <div className="filter-group">
            <label className="filter-label">Year To</label>
            <select
              className="filter-select"
              value={filters.yearTo}
              onChange={(e) => handleFilterChange('yearTo', e.target.value)}
            >
              <option value="">To</option>
              {years.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Auction Type Filter */}
          <div className="filter-group">
            <label className="filter-label">Auction Type</label>
            <select
              className="filter-select"
              value={filters.auctionType}
              onChange={(e) => handleFilterChange('auctionType', e.target.value)}
            >
              <option value="All">All</option>
              <option value="Live">Live</option>
              <option value="Online">Online</option>
            </select>
          </div>

          {/* Platform Toggles */}
          <div className="filter-group">
            <label className="filter-label">Platform</label>
            <div className="platform-toggles">
              <label className="switch switch-copart">
                <input
                  type="checkbox"
                  checked={filters.copart}
                  onChange={(e) => handleFilterChange('copart', e.target.checked)}
                />
                <span className="slider round"></span>
                <span className="label">Copart</span>
              </label>
              <label className="switch switch-iaai">
                <input
                  type="checkbox"
                  checked={filters.iaai}
                  onChange={(e) => handleFilterChange('iaai', e.target.checked)}
                />
                <span className="slider round"></span>
                <span className="label">IAAI</span>
              </label>
            </div>
          </div>

          {/* Reset Filters Button */}
          <button
            className="reset-filters-btn"
            onClick={() => {
              const resetFilters: FilterState = {
                status: 'All',
                type: 'Automobile',
                make: 'All',
                model: 'All',
                yearFrom: '',
                yearTo: '',
                auctionType: 'All',
                copart: true,
                iaai: true,
              };
              setFilters(resetFilters);
              onFilterChange?.(resetFilters);
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

