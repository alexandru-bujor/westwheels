import { Car } from '@/types/car';
import { mockCars } from './mockData';

/**
 * Generate additional mock cars for pagination testing
 * This creates variations of existing cars with different IDs
 */
export function generateMockCars(count: number): Car[] {
  const baseCars = [...mockCars];
  const generated: Car[] = [];

  const makes = ['Ford', 'Chevrolet', 'Dodge', 'BMW', 'Mercedes-Benz', 'Audi', 'Honda', 'Toyota', 'Nissan', 'Volkswagen'];
  const models = ['Mustang', 'Camaro', 'Challenger', 'M3', 'C-Class', 'A4', 'Civic', 'Camry', 'Altima', 'Jetta'];
  const locations = ['Los Angeles, CA', 'Miami, FL', 'Dallas, TX', 'New York, NY', 'Chicago, IL', 'Phoenix, AZ', 'Houston, TX', 'Atlanta, GA'];
  const platforms: ('copart' | 'iaai')[] = ['copart', 'iaai'];
  const statuses: ('current' | 'archived')[] = ['current', 'archived'];

  for (let i = 0; i < count; i++) {
    const baseCar = baseCars[i % baseCars.length];
    const make = makes[i % makes.length];
    const model = models[i % models.length];
    const year = 2015 + (i % 10);
    const lotNumber = `${i + 1000}-${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`;
    const vin = `${make.substring(0, 3).toUpperCase()}${String(Math.random()).substring(2, 17).padEnd(17, '0')}`;

    generated.push({
      ...baseCar,
      id: `generated-${i + 1000}`,
      make,
      model,
      year,
      lotNumber,
      vin,
      currentBid: Math.floor(Math.random() * 50000) + 10000,
      fastBuyPrice: i % 3 === 0 ? Math.floor(Math.random() * 60000) + 20000 : undefined,
      location: locations[i % locations.length],
      platform: platforms[i % platforms.length],
      status: statuses[i % statuses.length],
      auctionDate: new Date(2024, 0, 15 + (i % 30)).toISOString().split('T')[0],
      mileage: Math.floor(Math.random() * 100000) + 10000,
      images: [
        `https://images.unsplash.com/photo-${1605559424843 + i}?w=400&h=300&fit=crop`,
        `https://images.unsplash.com/photo-${1605559424843 + i}?w=400&h=300&fit=crop`,
        `https://images.unsplash.com/photo-${1605559424843 + i}?w=400&h=300&fit=crop`,
      ],
    });
  }

  return generated;
}

/**
 * Get all available cars (base + generated)
 */
export function getAllMockCars(): Car[] {
  return [...mockCars, ...generateMockCars(200)]; // Total ~250+ cars for pagination
}

/**
 * Filter cars based on search criteria
 */
export function filterCars(
  cars: Car[],
  filters: {
    status?: string;
    type?: string;
    make?: string;
    model?: string;
    yearFrom?: string;
    yearTo?: string;
    auctionType?: string;
    copart?: boolean;
    iaai?: boolean;
  }
): Car[] {
  return cars.filter((car) => {
    // Status filter
    if (filters.status && filters.status !== 'All') {
      if (filters.status === 'Current' && car.status !== 'current') return false;
      if (filters.status === 'Archived' && car.status !== 'archived') return false;
      if (filters.status === 'Fast-buy' && !car.fastBuyPrice) return false;
    }

    // Platform filter
    if (filters.copart === false && car.platform === 'copart') return false;
    if (filters.iaai === false && car.platform === 'iaai') return false;

    // Make filter
    if (filters.make && filters.make !== 'All makes') {
      if (car.make.toLowerCase() !== filters.make.toLowerCase()) return false;
    }

    // Model filter
    if (filters.model && filters.model !== 'All' && filters.model !== 'All models') {
      if (car.model.toLowerCase() !== filters.model.toLowerCase()) return false;
    }

    // Year filters
    if (filters.yearFrom && car.year < parseInt(filters.yearFrom)) return false;
    if (filters.yearTo && car.year > parseInt(filters.yearTo)) return false;

    return true;
  });
}

