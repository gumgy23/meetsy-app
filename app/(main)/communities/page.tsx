"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCommunities, useCommunityGoals } from "@/hooks/use-communities";
import { BotIcon } from "lucide-react";
import { startTransition, useEffect, useState } from "react";
import AIMatching from "@/components/communities/ai-matching";
import Link from "next/link";

export default function CommunitiesPage() {
    const [ActiveTab,SetActiveTab] = 
    useState<"goals" | "partner">(
        "goals"
    );

    const [selectedCommunity, setSelectedCommunity] = 
    useState<string | null>(
        null
    );

    const {
        data: communities, 
        isLoading: isLoadingCommunities, 
        error: errorCommunities
    } = useCommunities();

    const {
        data: communityGoals, 
        isLoading: isLoadingGoals, 
        error: errorGoals
    } = useCommunityGoals(selectedCommunity);

    console.log(selectedCommunity);

    useEffect(() => {
        if(communities && communities.length > 0 && 
            !selectedCommunity){
                startTransition(() => {
                    setSelectedCommunity(communities[0].community.id);
                });
        }
    }, [communities?.length]);

    return (
        
            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Communities</CardTitle>
                        <CardDescription>
                            {communities?.length} joined
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {communities?.map((c) => (
                           <Button 
                            key={c.community.id} 
                            className="w-full justify-start"
                            onClick={() => 
                                setSelectedCommunity(c.community.id)
                            }
                            variant={
                                selectedCommunity === c.community.id ?
                                "default": "outline"
                            }>
                                {c.community.name}
                           </Button>
                        ))}
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex gap-2 mb-4">
                            <Button
                                onClick={() => 
                                    SetActiveTab("goals")
                                }
                                variant={
                                    ActiveTab === "goals" ?
                                    "default": "outline"
                                }
                            >
                                My Goals
                            </Button>
                            <Button
                                onClick={() => 
                                    SetActiveTab("partner")
                                }
                                variant={
                                    ActiveTab === "partner" ?
                                    "default": "outline"
                                }
                            >
                                <BotIcon className="size-4"/>
                                Find Partners with AI
                            </Button>
                        </div>
                        <CardTitle>
                            {ActiveTab === "goals"
                                ? "Learning Goals"
                                : "Potential Learning Partners"
                            }
                        </CardTitle>
                        <CardDescription>
                            {ActiveTab === "goals"
                                ? `${communityGoals?.length} 
                                ${communityGoals?.length === 1 ? "goal" : "goals"} 
                                in selected community`
                                :"Members with similar learning goals"
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {ActiveTab === "goals" ? (
                            <div className="space-y-2">
                                {communityGoals?.map((c) => (
                                <Card key={c.id}
                                className="shadow-none">
                                    <CardHeader>
                                        <CardTitle className="text-based">
                                            {c.title}
                                        </CardTitle>
                                        <CardDescription>
                                            {c.description}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                                ))}
                            </div>
                        ):(
                            <AIMatching totalGoals={communityGoals?.length || 0 } />
                        )}
                    </CardContent>
                </Card>
            </div>
        
    )
}