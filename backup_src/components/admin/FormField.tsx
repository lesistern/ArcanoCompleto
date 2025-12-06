'use client';

import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
    label: string;
    name: string;
    required?: boolean;
    error?: string;
    hint?: string;
    children: React.ReactNode;
}

export function FormField({
    label,
    name,
    required = false,
    error,
    hint,
    children,
}: FormFieldProps) {
    return (
        <div className="space-y-2">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-dungeon-200"
            >
                {label}
                {required && (
                    <span className="text-red-400 ml-1" title="Campo requerido">
                        *
                    </span>
                )}
            </label>

            {children}

            {error && (
                <div className="flex items-center gap-2 text-sm text-red-400">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {hint && !error && (
                <p className="text-sm text-dungeon-400">{hint}</p>
            )}
        </div>
    );
}
