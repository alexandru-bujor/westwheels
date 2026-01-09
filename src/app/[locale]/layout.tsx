// Generate static params for all locales
export async function generateStaticParams() {
  return [{ locale: 'en' }]; // Add more locales if needed: 'en', 'pl', 'de', etc.
}

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

