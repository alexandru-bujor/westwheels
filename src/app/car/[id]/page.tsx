import { redirect } from 'next/navigation';

interface CarPageProps {
  params: Promise<{ id: string }>;
}

export default async function CarPage({ params }: CarPageProps) {
  const { id } = await params;
  // Redirect to the locale version with default locale 'en'
  redirect(`/en/car/${id}`);
}

