import { Header } from '@/components/layout/Header';
import { TopNavigation } from '@/components/layout/TopNavigation';
import { Footer } from '@/components/layout/Footer';
import { CarDetailHeader } from '@/features/cars/components/CarDetailHeader';
import { CarDetailGallery } from '@/features/cars/components/CarDetailGallery';
import { CarDetailInfo } from '@/features/cars/components/CarDetailInfo';
import { CarDetailBidding } from '@/features/cars/components/CarDetailBidding';
import { CarDetailCalculator } from '@/features/cars/components/CarDetailCalculator';
import { CarDetailSalesHistory } from '@/features/cars/components/CarDetailSalesHistory';
import { CarDetailSimilar } from '@/features/cars/components/CarDetailSimilar';
import { CarDetailFAQ } from '@/features/cars/components/CarDetailFAQ';
import { mockCars } from '@/lib/mockData';
import { Car } from '@/types/car';
import '@/features/cars/components/carDetail.css';

interface CarDetailPageProps {
  params: Promise<{ id: string; locale: string }>;
}

// Generate static params for all locales and car IDs
export async function generateStaticParams() {
  const locales = ['en']; // Add more locales if needed: 'en', 'pl', 'de', etc.
  const carIds = mockCars.map((car) => car.id);
  
  return locales.flatMap((locale) =>
    carIds.map((id) => ({
      locale,
      id,
    }))
  );
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { id, locale } = await params;
  
  // In a real app, fetch car data from API
  const car = mockCars.find((c) => c.id === id) || mockCars[0];
  
  // Enhance car data with additional fields for detail page
  const defaultImage = car.images && car.images.length > 0 ? car.images[0] : 'https://images.unsplash.com/photo-1606664515524-ed2f786a0ad6?w=600';
  const carDetail: Car = {
    ...car,
    images: car.images && car.images.length > 0 ? car.images : [
      defaultImage,
      defaultImage,
      defaultImage,
      defaultImage,
    ],
    peopleViewed: 119,
    estimatedDeliveryTime: {
      from: '12 April',
      to: '26 April',
    },
    damage: {
      primary: 'Minor dent / scratches',
      secondary: 'Normal wear',
    },
    mileage: car.mileage || 999999,
    mileageUnit: 'mi',
    mileageStatus: 'unknown',
    startCode: 'Run / Drive',
    key: 'Present',
    acv: 25500,
    erc: 0,
    exteriorColor: 'Two tone',
    transmission: 'Manual',
    saleStatus: 'On minimum bid',
    seller: 'Non-insurance Company',
    saleDocument: 'Vehicle cert of ownership-titl (WA)',
    saleDocumentType: 'pending',
    estimatedCost: 'No information',
    fastBuyPrice: 19900,
    auctionTime: '22:00',
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <TopNavigation />
      
      <main className="flex-1">
        <section id="content" className="item-single-page">
          <CarDetailHeader car={carDetail} />
          
          <div className="lot-wrapper-new">
            <div className="container container-transparent">
              <div className="two-column-layout">
                <div className="left-column" data-sticky-container="">
                  <div className="scroll-wrapper" data-margin-top="180" data-sticky-for="768" data-sticky-class="is-sticky">
                    <CarDetailGallery car={carDetail} />
                    <CarDetailInfo car={carDetail} />
                  </div>
                </div>

                <div className="right-column" data-sticky-container="">
                  <div className="col1 lot-details">
                    <CarDetailBidding car={carDetail} />
                    
                    {/* Final Price Calculator - Full Width Section */}
                    <div className="calculator-section-fullwidth">
                      <div className="container container-transparent">
                        <CarDetailCalculator car={carDetail} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="psa-tabs-content">
            <div className="container container-transparent">
              <CarDetailSalesHistory car={carDetail} />
              <CarDetailSimilar car={carDetail} />
            </div>
          </div>

          <div className="container container-transparent info_blocks">
            <CarDetailFAQ />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
