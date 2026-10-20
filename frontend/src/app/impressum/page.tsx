import type { Metadata } from 'next';
import { PermanentLegalPage } from '@/components/sections/PermanentLegalPage';
export const metadata: Metadata = { title: 'Impressum | NOVARCH', robots: { index: false, follow: true } };
export default function Page() { return <PermanentLegalPage />; }
