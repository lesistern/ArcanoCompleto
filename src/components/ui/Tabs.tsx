"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const TabsContext = React.createContext<{
    value: string
    onValueChange: (value: string) => void
} | null>(null)

const Tabs = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        defaultValue?: string
        value?: string
        onValueChange?: (value: string) => void
    }
>(({ className, defaultValue, value, onValueChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || "")

    const handleValueChange = React.useCallback(
        (newValue: string) => {
            if (onValueChange) {
                onValueChange(newValue)
            } else {
                setInternalValue(newValue)
            }
        },
        [onValueChange]
    )

    const currentValue = value !== undefined ? value : internalValue

    return (
        <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
            <div ref={ref} className={cn("", className)} {...props} />
        </TabsContext.Provider>
    )
})
Tabs.displayName = "Tabs"

const TabsList = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "inline-flex h-10 items-center justify-center rounded-md bg-dungeon-900/50 p-1 text-dungeon-400",
            className
        )}
        {...props}
    />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
>(({ className, value, ...props }, ref) => {
    const context = React.useContext(TabsContext)
    if (!context) throw new Error("TabsTrigger must be used within Tabs")

    return (
        <button
            ref={ref}
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                "data-[state=active]:bg-dungeon-800 data-[state=active]:text-dungeon-100 data-[state=active]:shadow-sm",
                context.value === value && "bg-dungeon-800 text-dungeon-100 shadow-sm",
                className
            )}
            onClick={() => context.onValueChange(value)}
            data-state={context.value === value ? "active" : "inactive"}
            {...props}
        />
    )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => {
    const context = React.useContext(TabsContext)
    if (!context) throw new Error("TabsContent must be used within Tabs")

    if (context.value !== value) return null

    return (
        <div
            ref={ref}
            className={cn(
                "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                className
            )}
            {...props}
        />
    )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
