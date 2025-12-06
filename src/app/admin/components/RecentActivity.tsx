'use client';

import Link from 'next/link';
import { Clock, Edit, FileText } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils/text';

interface ActivityItem {
    id: string;
    type: 'create' | 'update' | 'delete';
    resourceType: string;
    resourceTitle: string;
    resourceHref?: string;
    user: {
        name: string;
        username: string;
    };
    timestamp: Date;
}

interface RecentActivityProps {
    activities: ActivityItem[];
    loading?: boolean;
}

const activityIcons = {
    create: FileText,
    update: Edit,
    delete: FileText,
};

const activityColors = {
    create: 'text-green-400 bg-green-900/20 border-green-400/30',
    update: 'text-blue-400 bg-blue-900/20 border-blue-400/30',
    delete: 'text-red-400 bg-red-900/20 border-red-400/30',
};

const activityLabels = {
    create: 'creó',
    update: 'editó',
    delete: 'eliminó',
};

export function RecentActivity({ activities, loading = false }: RecentActivityProps) {
    return (
        <div className="bg-dungeon-800 rounded-lg border border-dungeon-700 p-6">
            <h2 className="text-xl font-bold text-gold-400 mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Actividad reciente
            </h2>

            {loading ? (
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-dungeon-900 rounded-lg animate-pulse">
                            <div className="h-10 w-10 bg-dungeon-700 rounded-lg" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-dungeon-700 rounded w-3/4" />
                                <div className="h-3 bg-dungeon-700 rounded w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : activities.length === 0 ? (
                <div className="text-center py-8 text-dungeon-400">
                    <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No hay actividad reciente</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {activities.map((activity) => {
                        const Icon = activityIcons[activity.type];
                        const colorClass = activityColors[activity.type];
                        const actionLabel = activityLabels[activity.type];

                        const content = (
                            <div className="flex items-start gap-3 p-3 bg-dungeon-900 rounded-lg hover:bg-dungeon-800 transition-colors">
                                <div className={`p-2 rounded-lg border ${colorClass}`}>
                                    <Icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm text-dungeon-100">
                                        <span className="font-semibold text-gold-300">
                                            @{activity.user.username}
                                        </span>
                                        {' '}{actionLabel}{' '}
                                        <span className="font-semibold">
                                            {activity.resourceType}
                                        </span>
                                        {' "'}
                                        <span className="text-gold-400">
                                            {activity.resourceTitle}
                                        </span>
                                        {'"'}
                                    </div>
                                    <div className="text-xs text-dungeon-400 mt-1 flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {formatRelativeTime(activity.timestamp)}
                                    </div>
                                </div>
                            </div>
                        );

                        return activity.resourceHref ? (
                            <Link key={activity.id} href={activity.resourceHref}>
                                {content}
                            </Link>
                        ) : (
                            <div key={activity.id}>{content}</div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
