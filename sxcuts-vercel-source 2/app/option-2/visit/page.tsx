import type { Metadata } from 'next';
import AtelierLight from '@/components/atelier-light';
export const metadata: Metadata = { title: 'Visit & Book | SXcuts', description: 'Book with Saul, find the St Ives studio and prepare for your appointment.' };
export default function Page(){return <AtelierLight page="visit"/>}
