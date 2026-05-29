"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react";

export function QueryProvider({
    children
}:{
    children: React.ReactNode
}){

    // Create a stable QueryClient instance once per component mount.
    // refetchOnWindowFocus: false disables automatic re-fetching when the user returns to the tab.
    // staleTime: 60s — cached data is considered fresh for 1 minute before React Query marks it stale and re-fetches.
    const [queryClient] = useState(
        () => 
            new QueryClient({
            defaultOptions:{
                queries:{
                    refetchOnWindowFocus: false,
                    staleTime: 1000 * 60
                }
            }
    })
)

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
