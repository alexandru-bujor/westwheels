export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  lotNumber: string;
  vin: string;
  images: string[];
  currentBid: number;
  maxBid?: number;
  fastBuyPrice?: number;
  auctionDate: string;
  auctionTime?: string;
  location: string;
  shippingFrom?: string;
  distance?: string;
  seller: string;
  saleDocument?: string;
  saleDocumentType?: string;
  estimatedCost?: string;
  estimatedDeliveryTime?: {
    from: string;
    to: string;
  };
  damage?: {
    loss?: string;
    primary?: string;
    secondary?: string;
  };
  mileage?: number;
  mileageUnit?: 'mi' | 'km';
  mileageStatus?: 'unknown' | 'actual' | 'exceeds';
  startCode?: 'Run / Drive' | 'Starts' | 'No Start';
  key?: 'Present' | 'Missing';
  acv?: number;
  erc?: number;
  exteriorColor?: string;
  transmission?: string;
  saleStatus?: string;
  platform: 'copart' | 'iaai';
  status: 'current' | 'archived' | 'live' | 'ended';
  peopleViewed?: number;
  salesHistory?: Array<{
    auction: string;
    date: string;
    lot: string;
    finalBid: number;
    odometer?: string;
    status: 'sold' | 'not-sold';
    seller: string;
  }>;
  similarCars?: Car[];
}
