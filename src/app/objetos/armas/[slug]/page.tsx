import { WeaponDetail } from '@/components/weapons/WeaponDetail';

export default async function WeaponDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <WeaponDetail slug={slug} />;
}
