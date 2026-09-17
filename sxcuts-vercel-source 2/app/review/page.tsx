import type { Metadata } from 'next';
import ReviewWorkspace from '@/components/review-workspace';
export const metadata: Metadata = { title: 'SXcuts · Atelier design review', description: 'Review the Atelier website, leave section comments and download your feedback as a PDF.', robots: { index: false, follow: false } };
export default function ReviewPage() { return <ReviewWorkspace />; }
