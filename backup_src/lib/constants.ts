import {
    BookOpen,
    Swords,
    Scroll,
    Wand2,
    HelpCircle,
    Coffee,
    MessageSquare,
    LucideIcon,
} from 'lucide-react';

export type CategoryType = 'rules' | 'builds' | 'roleplay' | 'homebrew' | 'help' | 'offtopic';

export interface CategoryConfig {
    icon: LucideIcon;
    color: string;
    bgColor: string;
    borderColor: string;
}

export const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
    rules: {
        icon: BookOpen,
        color: 'text-blue-400',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/20',
    },
    builds: {
        icon: Swords,
        color: '!text-red-400',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/20',
    },
    roleplay: {
        icon: Scroll,
        color: 'text-gold-400',
        bgColor: 'bg-gold-500/10',
        borderColor: 'border-gold-500/20',
    },
    homebrew: {
        icon: Wand2,
        color: '!text-purple-400',
        bgColor: 'bg-purple-500/10',
        borderColor: 'border-purple-500/20',
    },
    help: {
        icon: HelpCircle,
        color: '!text-green-400',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/20',
    },
    offtopic: {
        icon: Coffee,
        color: '!text-slate-400',
        bgColor: 'bg-slate-500/10',
        borderColor: 'border-slate-500/20',
    },
    default: {
        icon: MessageSquare,
        color: 'text-dungeon-300',
        bgColor: 'bg-dungeon-500/10',
        borderColor: 'border-dungeon-500/20',
    },
};
