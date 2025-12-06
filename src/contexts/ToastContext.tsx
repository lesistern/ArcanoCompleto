'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
}

interface ToastContextValue {
    toasts: Toast[];
    showToast: (type: ToastType, message: string, duration?: number) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((type: ToastType, message: string, duration = 5000) => {
        const id = Math.random().toString(36).substring(7);
        const toast: Toast = { id, type, message, duration };

        setToasts(prev => [...prev, toast]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
}

interface ToastContainerProps {
    toasts: Toast[];
    onRemove: (id: string) => void;
}

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
            {toasts.map(toast => (
                <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
            ))}
        </div>
    );
}

interface ToastItemProps {
    toast: Toast;
    onRemove: (id: string) => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
    const config = {
        success: {
            icon: CheckCircle,
            className: 'bg-green-900/90 border-green-400/30 text-green-100',
            iconClassName: 'text-green-400',
        },
        error: {
            icon: AlertCircle,
            className: 'bg-red-900/90 border-red-400/30 text-red-100',
            iconClassName: 'text-red-400',
        },
        warning: {
            icon: AlertTriangle,
            className: 'bg-yellow-900/90 border-yellow-400/30 text-yellow-100',
            iconClassName: 'text-yellow-400',
        },
        info: {
            icon: Info,
            className: 'bg-blue-900/90 border-blue-400/30 text-blue-100',
            iconClassName: 'text-blue-400',
        },
    };

    const { icon: Icon, className, iconClassName } = config[toast.type];

    return (
        <div
            className={`
        flex items-start gap-3 p-4 rounded-lg border backdrop-blur-sm
        shadow-lg animate-in slide-in-from-right duration-300
        ${className}
      `}
        >
            <Icon className={`h-5 w-5 flex-shrink-0 mt-0.5 ${iconClassName}`} />
            <p className="flex-1 text-sm">{toast.message}</p>
            <button
                onClick={() => onRemove(toast.id)}
                className="p-1 rounded hover:bg-black/20 transition-colors"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}
