import { Header } from '@/components/layout/Header';
import { TopNavigation } from '@/components/layout/TopNavigation';
import { Footer } from '@/components/layout/Footer';
import { SearchResultsPageClient } from './SearchResultsPageClient';

interface SearchResultsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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
