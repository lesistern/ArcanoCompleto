export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            <div className="mb-12 space-y-3 border-l-4 border-gold-500 pl-6">
                <div className="h-12 w-64 bg-dungeon-700 animate-pulse rounded" />
                <div className="h-6 w-96 bg-dungeon-700 animate-pulse rounded" />
            </div>

            <div className="space-y-16">
                {/* Skeleton for sections */}
                {[1, 2, 3, 4].map((section) => (
                    <section key={section}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-8 w-8 bg-dungeon-700 animate-pulse rounded" />
                            <div className="h-8 w-48 bg-dungeon-700 animate-pulse rounded" />
                        </div>
                        <div className="grid gap-4 md:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div
                                    key={item}
                                    className="bg-dungeon-800 border border-dungeon-700 rounded-lg p-4 space-y-3"
                                >
                                    <div className="h-6 w-3/4 bg-dungeon-700 animate-pulse rounded" />
                                    <div className="h-4 w-full bg-dungeon-700 animate-pulse rounded" />
                                    <div className="h-4 w-5/6 bg-dungeon-700 animate-pulse rounded" />
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
