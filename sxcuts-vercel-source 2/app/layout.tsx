import type { Metadata } from 'next';
import './globals.css';
import { site } from '@/lib/site';
export const metadata: Metadata = {
 title: 'SXcuts | Fades, cuts & detail. St Ives.',
 description: 'Barbering by Saul in St Ives. Explore the cuts, hear from clients and book your next appointment at SXcuts, 53 Kitchener Street.',
 metadataBase: new URL('https://sxcuts.com'),
 openGraph: { title: 'SXcuts — Your next good haircut.', description: 'Fades, cuts & detail. Barbering by Saul in St Ives.', type: 'website', locale: 'en_AU' },
 icons: { icon: '/favicon.svg' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en-AU"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"BarberShop",name:"SXcuts",url:"https://sxcuts.com",email:site.email,address:{"@type":"PostalAddress",streetAddress:"53 Kitchener Street",addressLocality:"St Ives",addressRegion:"NSW",postalCode:"2075",addressCountry:"AU"},sameAs:[site.instagramUrl]})}}/></body></html>; }
