"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { MessageCircleIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import StatsCard from "@/components/dashboard/stats-card";
import { useCommunities } from "@/hooks/use-communities";

export default function DashboardPage(){

    const user = useUser();

    // Fetch communities list from the API.
    // queryKey: cache key — React Query refetches when this changes.
    // queryFn: temporary mock with 1s delay; replace with a real API call later.
    const {
        data: Communities, 
        isLoading: isLoadingCommunities, 
        error: errorCommunities
    } = useCommunities();

    const pendingMatches=6;

    if(isLoadingCommunities) return <div>Loading..</div>
    if(errorCommunities) return <div>Error: {errorCommunities instanceof Error ? errorCommunities.message : "Something went wrong"}</div>

    return (
        <div className="page-wrapper">
            <div>
                <h1 
                    className="text-3xl font-bold tracking-tight"
                    >Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome Back, { user?.user?.firstName || "user" }!
                </p>
            </div>

            <Card className="border-primary">
                <CardHeader>
                    <CardTitle>
                        🎉 You have { pendingMatches } new {" "}
                        {pendingMatches === 1 ? "match" : "matches"}
                    </CardTitle>
                    <CardDescription>
                        Review and accept your matches to start chatting
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Link href="/chat">
                        <Button>Review Matches</Button>
                    </Link>
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-4">
                <StatsCard 
                    title="Your Communities"
                    value={Communities?.length || 0}
                />
                 <StatsCard 
                    title="learning Goals"
                    value={6}
                />
                 <StatsCard 
                    title="Active Matches"
                    value={1}
                />
                 <StatsCard 
                    title="Pending Matches"
                    value={pendingMatches}
                />
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
               
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center">
                                    <MessageCircleIcon className="size-4 mr-2 text-primary"/>
                                    Recent Chats
                                </CardTitle>
                                <Link href="/chat">
                                    <Button variant="outline" size="sm">
                                        View All
                                    </Button>
                                </Link>
                            </div>
                            <CardDescription>
                                Communities you&apos;re part of
                            </CardDescription>
                        </CardHeader>
                        
                        <CardContent>

                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center">
                                    <UsersIcon className="size-4 mr-2 text-primary"/>
                                    communities
                                </CardTitle>
                                <Link href="/communities">
                                    <Button variant="outline" size="sm">
                                        Manage
                                    </Button>
                                </Link>
                            </div>
                            <CardDescription>
                                Communities you&apos;re part of
                            </CardDescription>
                        </CardHeader>
                        
                        <CardContent>
                            <div className="space-y-3">
                                {/* community = one row from the query result (communityMembers joined with communities table)
                                    community.id         = communityMembers.id (NOT the community's own ID)
                                    community.community  = nested data from the communities table (name, description, etc.) */}
                                {Communities?.map((community: any) => (
                                        <Card  className="shadow-none" key={community.id}>

                                            <Link href={`/communities/${community.id}`}>
                                                <CardHeader>
                                                    <CardTitle className="text-sm">
                                                        {community.community.name}
                                                    </CardTitle>
                                                    <CardDescription className="text-sm">
                                                        {community.community.description}
                                                    </CardDescription>
                                                </CardHeader>
                                            </Link>
                                        </Card>
                                    ))
                                }
                            </div>
                        </CardContent>
                    </Card>
            </div>
        </div>
    );
}