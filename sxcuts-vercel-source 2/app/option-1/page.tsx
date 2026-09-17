import type { Metadata } from 'next';
import { EditorialOption } from '@/components/design-options';
export const metadata: Metadata = { openGraph: {title: 'SXcuts — The Editorial', description: 'Personal barbering. Clean fades, considered shape and a finish that feels like you.', url: '/option-1'}, title: 'SXcuts — The Editorial | Option 01', description: 'Personal barbering by Saul. Explore cuts, fades and texture at SXcuts in St Ives.' };
export default function Page(){return <EditorialOption/>}
