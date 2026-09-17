import type { Metadata } from 'next';
import AtelierLight from '@/components/atelier-light';
export const metadata: Metadata = { title: 'The Studio | SXcuts', description: 'Meet Saul and take a look inside the SXcuts studio in St Ives.' };
export default function Page(){return <AtelierLight page="studio"/>}
