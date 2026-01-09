'use client';

import Image from 'next/image';
import { Car } from '@/types/car';
import { Calendar, MapPin, Gauge, AlertCircle } from 'lucide-react';

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden hover:shadow-xl transition-all duration-200 cursor-pointer border border-gray-200">
      {/* Image */}
      <div className="relative w-full h-48 bg-gray-200">
        <Image
          src={car.images && car.images.length > 0 ? car.images[0] : 'https://images.unsplash.com/photo-1606664515524-ed2f786a0ad6?w=600'}
          alt={`${car.year} ${car.make} ${car.model}`}
          fill
          className="object-cover"
        />
        {/* Platform Badge */}
        <div className={`absolute top-2 right-2 px-2.5 py-1 rounded-md text-xs font-bold shadow-sm ${
          car.platform === 'copart' 
            ? 'bg-[#007bff] text-white' 
            : 'bg-[#dc3545] text-white'
        }`}>
          {car.platform.toUpperCase()}
        </div>
        {/* Damage Badge */}
        {car.damage && (
          <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-black/80 text-xs font-bold text-white shadow-sm">
            {car.damage.primary || car.damage.loss || 'Damage'}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 text-gray-900">
          {car.year} {car.make} {car.model}
        </h3>
        <p className="text-sm text-gray-500 mb-3 font-medium">Lot #{car.lotNumber}</p>

        {/* Current Bid */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1 font-medium">Current Bid</p>
          <p className="text-2xl font-bold text-[#007bff]">
            {formatCurrency(car.currentBid)}
          </p>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{new Date(car.auctionDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>{car.location}</span>
          </div>
          {car.mileage && (
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-gray-400" />
              <span>{car.mileage.toLocaleString()} {car.mileageUnit || 'miles'}</span>
            </div>
          )}
        </div>

        {/* Bid Button */}
        <button className="w-full mt-4 bg-[#007bff] text-white py-2.5 rounded-md font-bold hover:bg-[#0056b3] transition-all shadow-sm hover:shadow-md text-sm">
          Place Bid
        </button>
      </div>
    </div>
  );
}
