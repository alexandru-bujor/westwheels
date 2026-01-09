import { Header } from '@/components/layout/Header';
import { TopNavigation } from '@/components/layout/TopNavigation';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/common/HeroSection';
import { SearchFilterModule } from '@/components/common/SearchFilterModule';
import { CarListingsSection } from '@/features/cars/components/CarListingsSection';
import { mockCars } from '@/lib/mockData';
import { Car } from '@/types/car';

// Filter and prepare cars for different sections
const getDefaultImages = (car: Car): string[] => {
  if (car.images && car.images.length > 0) {
    return car.images;
  }
  const defaultImage = 'https://images.unsplash.com/photo-1606664515524-ed2f786a0ad6?w=400&h=300&fit=crop';
  return [defaultImage, defaultImage, defaultImage, defaultImage, defaultImage];
};

const classicCars: Car[] = mockCars
  .filter((car) => car.year < 1990)
  .slice(0, 6)
  .map((car) => ({
    ...car,
    images: getDefaultImages(car),
    auctionTime: car.auctionTime || '22:00:00',
  }));

const harleyCars: Car[] = mockCars
  .filter((car) => car.make.toLowerCase().includes('harley') || car.make.toLowerCase().includes('motorcycle'))
  .slice(0, 6)
  .map((car) => ({
    ...car,
    images: getDefaultImages(car),
    auctionTime: car.auctionTime || '18:00:00',
  }));

const supercars: Car[] = mockCars
  .filter((car) => ['Lamborghini', 'Ferrari', 'Porsche'].some((make) => car.make.includes(make)))
  .slice(0, 6)
  .map((car) => ({
    ...car,
    images: getDefaultImages(car),
    auctionTime: car.auctionTime || '20:30:00',
  }));

const fridayAuctionCars: Car[] = mockCars.slice(0, 6).map((car) => ({
  ...car,
  images: getDefaultImages(car),
  auctionTime: car.auctionTime || '15:00:00',
}));

const buyNowCars: Car[] = mockCars
  .filter((car) => car.fastBuyPrice)
  .slice(0, 6)
  .map((car) => ({
    ...car,
    images: getDefaultImages(car),
    auctionTime: car.auctionTime || '18:30:00',
  }));

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col home-page-wrapper">
      <Header />
      <TopNavigation />
      
      <main className="flex-1 home-page-main" role="main">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Search/Filter Module */}
        <SearchFilterModule />
        
        {/* Car Listings Sections */}
        <section id="offers" className="offers-section" aria-label="Car listings">
          <div className="container offers-container">
            <CarListingsSection
              title="American Classic Cars"
              count={827}
              cars={classicCars}
              seeAllUrl="/search/results?search-type=filters&status=All&type=Automobile&make=All&model=All&year-from=1900&year-to=1990&auction-type=All"
              swiperClass="swiperSliderHomeClassics"
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
