'use client';

import { useState, useMemo, useEffect } from 'react';
import { SearchResultsFilters, FilterState } from '@/components/search/SearchResultsFilters';
import { Pagination } from '@/components/search/Pagination';
import { ViewToggle } from '@/components/search/ViewToggle';
import { CarListingItem } from '@/features/cars/components/CarListingItem';
import { getAllMockCars, filterCars } from '@/lib/mockDataUtils';
import './searchResults.css';

// Helper to parse URL search params
function getSearchParams(): { [key: string]: string } {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const result: { [key: string]: string } = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

export function SearchResultsPageClient() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState<{ [key: string]: string }>({});
  
  // Read search params from URL on mount and when URL changes
  useEffect(() => {
    const params = getSearchParams();
    setSearchParams(params);
    
    // Listen for popstate (back/forward navigation)
    const handlePopState = () => {
      const newParams = getSearchParams();
      setSearchParams(newParams);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [filters, setFilters] = useState<FilterState>({
    status: searchParams.status || 'All',
    type: searchParams.type || 'Automobile',
    make: searchParams.make || 'All',
    model: searchParams.model || 'All',
    yearFrom: searchParams['year-from'] || '',
    yearTo: searchParams['year-to'] || '',
    auctionType: searchParams['auction-type'] || 'All',
    copart: searchParams.copart !== 'false',
    iaai: searchParams.iaai !== 'false',
  });

  // Update filters when searchParams change
  useEffect(() => {
    setFilters({
      status: searchParams.status || 'All',
      type: searchParams.type || 'Automobile',
      make: searchParams.make || 'All',
      model: searchParams.model || 'All',
      yearFrom: searchParams['year-from'] || '',
      yearTo: searchParams['year-to'] || '',
      auctionType: searchParams['auction-type'] || 'All',
      copart: searchParams.copart !== 'false',
      iaai: searchParams.iaai !== 'false',
    });
  }, [searchParams]);

  const itemsPerPage = 20;
  const allCars = getAllMockCars();

  // Filter cars based on current filters
  const filteredCars = useMemo(() => {
    return filterCars(allCars, filters);
  }, [filters]);

  // Paginate filtered results
  const paginatedCars = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCars.slice(startIndex, endIndex);
  }, [filteredCars, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="flex-1">
      <div className="search-results-container">
        <div className="container">
          {/* Page Header */}
          <div className="search-results-header">
            <div>
              <h1 className="search-results-title">Search Results</h1>
              <p className="search-results-subtitle">
                Found {filteredCars.length} vehicle{filteredCars.length !== 1 ? 's' : ''}
              </p>
            </div>
            <ViewToggle view={view} onViewChange={setView} />
          </div>

          <div className="search-results-layout">
            {/* Filters Sidebar */}
            <aside className="search-results-sidebar">
              <SearchResultsFilters onFilterChange={handleFilterChange} />
            </aside>

            {/* Results Grid */}
            <div className="search-results-content">
              {paginatedCars.length > 0 ? (
                <>
                  <div className={`search-results-grid ${view === 'list' ? 'list-view' : ''}`}>
                    {paginatedCars.map((car) => (
                      <CarListingItem key={car.id} car={car} />
                    ))}
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredCars.length}
                  />
                </>
              ) : (
                <div className="no-results">
                  <h2>No vehicles found</h2>
                  <p>Try adjusting your filters to see more results.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

