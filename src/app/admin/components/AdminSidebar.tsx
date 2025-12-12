'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    BookOpen,
    Users,
    Zap,
    Wand2,
    Sword,
    Church,
    FileText,
    TrendingUp,
    MessageSquare,
    Settings,
    ChevronLeft,
    ChevronRight,
    Shield,
    Sparkles
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface SidebarItem {
    icon: LucideIcon;
    label: string;
    href: string;
    children?: SidebarItem[];
}

const sidebarItems: SidebarItem[] = [
    {
        icon: LayoutDashboard,
        label: 'Dashboard',
        href: '/admin'
    },
    {
        icon: BookOpen,
        label: 'Contenido',
        href: '/admin/clases',
        children: [
            { icon: BookOpen, label: 'Clases', href: '/admin/clases' },
            { icon: Users, label: 'Razas', href: '/admin/razas' },
            { icon: Zap, label: 'Dotes', href: '/admin/dotes' },
            { icon: Wand2, label: 'Conjuros', href: '/admin/conjuros' },
            { icon: Sword, label: 'Objetos', href: '/admin/objetos' },
            { icon: Church, label: 'Deidades', href: '/admin/deidades' },
            { icon: Sparkles, label: 'Habilidades', href: '/admin/habilidades' },
        ]
    },
    {
        icon: MessageSquare,
        label: 'Foro',
        href: '/admin/foro'
    },
    {
        icon: FileText,
        label: 'Tickets',
        href: '/admin/tickets'
    },
    {
        icon: Users,
        label: 'Usuarios',
        href: '/admin/usuarios'
    },
    {
        icon: TrendingUp,
        label: 'Reportes',
        href: '/admin/reportes'
    },
    {
        icon: Settings,
        label: 'Configuración',
        href: '/admin/configuracion'
    }
];

export function AdminSidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [expandedSections, setExpandedSections] = useState<string[]>(['Contenido']);
    const pathname = usePathname();

    // Load collapsed state from localStorage
    useEffect(() => {
        const savedState = localStorage.getItem('admin-sidebar-collapsed');
        if (savedState !== null) {
            setCollapsed(JSON.parse(savedState));
        }
    }, []);

    // Save collapsed state to localStorage
    const toggleCollapsed = () => {
        const newState = !collapsed;
        setCollapsed(newState);
        localStorage.setItem('admin-sidebar-collapsed', JSON.stringify(newState));
    };

    const toggleSection = (label: string) => {
        setExpandedSections(prev =>
            prev.includes(label)
                ? prev.filter(l => l !== label)
                : [...prev, label]
        );
    };

    const isActive = (href: string) => {
        if (href === '/admin') {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    return (
        <aside
            className={`
        relative bg-gray-900 border-r border-gray-700
        transition-all duration-300 ease-out
        z-30 flex flex-col h-screen
        ${collapsed ? 'w-20' : 'w-64'}
      `}
        >
            {/* Collapse/Expand toggle button - Same style as public sidebar */}
            <button
                onClick={toggleCollapsed}
                className="absolute -right-3 top-12 z-50 w-6 h-6 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-gold-400 hover:bg-gray-700 hover:border-gold-500 transition-all duration-200 shadow-lg"
                aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
            >
                {collapsed ? (
                    <ChevronRight className="h-3.5 w-3.5" />
                ) : (
                    <ChevronLeft className="h-3.5 w-3.5" />
                )}
            </button>

            {/* Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700 flex-shrink-0">
                {!collapsed ? (
                    <div className="flex items-center gap-2">
                        <Shield className="h-6 w-6 text-red-500" />
                        <span className="font-bold text-red-500">Admin</span>
                    </div>
                ) : (
                    <div className="flex items-center justify-center w-full">
                        <Shield className="h-6 w-6 text-red-500" />
                    </div>
                )}
            </div>

            {/* Navigation - Scrollable area */}
            <nav className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 py-2">
                <ul className="space-y-1">
                    {sidebarItems.map((item) => {
                        const hasChildren = item.children && item.children.length > 0;
                        const isExpanded = expandedSections.includes(item.label);
                        const active = isActive(item.href);

                        return (
                            <li key={item.href}>
                                {hasChildren ? (
                                    <>
                                        <button
                                            onClick={() => !collapsed && toggleSection(item.label)}
                                            className={`
                                                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                                                transition-all duration-200
                                                ${active
                                                    ? 'bg-gold-900/30 text-gold-400 border border-gold-400/30'
                                                    : 'text-gray-300 hover:bg-gray-800 hover:text-gold-400'
                                                }
                                                ${collapsed ? 'justify-center px-2' : ''}
                                            `}
                                            title={collapsed ? item.label : undefined}
                                        >
                                            <item.icon className="h-5 w-5 flex-shrink-0" />
                                            {!collapsed && (
                                                <>
                                                    <span className="flex-1 text-left text-sm font-medium">
                                                        {item.label}
                                                    </span>
                                                    <ChevronRight
                                                        className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                                                    />
                                                </>
                                            )}
                                        </button>
                                        {!collapsed && isExpanded && item.children && (
                                            <ul className="ml-4 mt-1 space-y-1 border-l border-gray-700 pl-2">
                                                {item.children.map((child) => (
                                                    <li key={child.href}>
                                                        <Link
                                                            href={child.href}
                                                            className={`
                                                                flex items-center gap-3 px-3 py-2 rounded-lg
                                                                transition-all duration-200 text-sm
                                                                ${isActive(child.href)
                                                                    ? 'bg-gold-900/30 text-gold-400 border border-gold-400/30'
                                                                    : 'text-gray-400 hover:bg-gray-800 hover:text-gold-400'
                                                                }
                                                            `}
                                                        >
                                                            <child.icon className="h-4 w-4 flex-shrink-0" />
                                                            <span>{child.label}</span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={`
                                            flex items-center gap-3 px-3 py-2.5 rounded-lg
                                            transition-all duration-200
                                            ${active
                                                ? 'bg-gold-900/30 text-gold-400 border border-gold-400/30'
                                                : 'text-gray-300 hover:bg-gray-800 hover:text-gold-400'
                                            }
                                            ${collapsed ? 'justify-center px-2' : ''}
                                        `}
                                        title={collapsed ? item.label : undefined}
                                    >
                                        <item.icon className="h-5 w-5 flex-shrink-0" />
                                        {!collapsed && (
                                            <span className="text-sm font-medium">{item.label}</span>
                                        )}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}
