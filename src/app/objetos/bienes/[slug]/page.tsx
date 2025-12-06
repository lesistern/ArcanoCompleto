import { ItemDetail } from '@/components/equipment/ItemDetail';

export default async function GoodsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <ItemDetail slug={slug} category="goods" />;
}
