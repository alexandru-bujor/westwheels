// Generate static params for all locales
export async function generateStaticParams() {
  return [{ locale: 'en' }]; // Add more locales if needed: 'en', 'pl', 'de', etc.
}

export default function LocalePage() {
  return <div>Locale Page</div>;
}

