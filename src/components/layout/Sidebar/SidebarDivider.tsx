interface SidebarDividerProps {
    className?: string;
}

export default function SidebarDivider({ className = '' }: SidebarDividerProps) {
    return (
        <div className={`border-t border-dungeon-700/50 my-4 ${className}`} />
    );
}
