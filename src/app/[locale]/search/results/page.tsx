import { Header } from '@/components/layout/Header';
import { TopNavigation } from '@/components/layout/TopNavigation';
import { Footer } from '@/components/layout/Footer';
import { SearchResultsPageClient } from './SearchResultsPageClient';

interface SearchResultsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Generate static params for all locales
export async function generateStaticParams() {
  return [{ locale: 'en' }]; // Add more locales if needed: 'en', 'pl', 'de', etc.
}

export default async function SearchResultsPage({ params, searchParams }: SearchResultsPageProps) {
  const { locale } = await params;
  const searchParamsResolved = await searchParams;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <TopNavigation />
      <SearchResultsPageClient searchParams={searchParamsResolved} />
      <Footer />
    </div>
  );
}
