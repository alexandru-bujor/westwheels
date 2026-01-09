import { redirect } from 'next/navigation';
import { mockCars } from '@/lib/mockData';

interface CarPageProps {
  params: Promise<{ id: string }>;
}

// Generate static params for all car IDs
export async function generateStaticParams() {
  return mockCars.map((car) => ({
    id: car.id,
  }));
}

export default async function CarPage({ params }: CarPageProps) {
  const { id } = await params;
  // Redirect to the locale version with default locale 'en'
  redirect(`/en/car/${id}`);
}

