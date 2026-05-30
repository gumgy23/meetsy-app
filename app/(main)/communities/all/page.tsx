"use client";

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckIcon, ChevronsLeftIcon } from "lucide-react"
import Link from "next/link"
import { useAllCommunities, useJoinCommunity, useCommunities } from "@/hooks/use-communities"

export default function AllCommunitiesPage() {

    const {
            data: allcommunities, 
            isLoading: isLoadingallCommunities, 
            error: errorallCommunities
    } = useAllCommunities();
    
    const {
        data: usercommunities
    } = useCommunities();

    const isJoined = (communityId: string ) => {
        return usercommunities?.some(
            (community) => community.community.id === communityId
        );  
    };

    const joinCommunityMutation = useJoinCommunity();
   

    const handleJoinCommunity= async (communityId: string ) => {
        console.log("joining community", communityId);
        await joinCommunityMutation.mutateAsync(communityId);
    }

    if(isLoadingallCommunities) return <div>Loading...</div>;
    if(errorallCommunities)
        return <div>Error: {errorallCommunities.message}</div>;

    return (
       <div>
        <Link href="/communities">
            <Button 
                variant={"outline"}
                >
                <ChevronsLeftIcon className="size-4" />
                Back to My Communities
            </Button>
        </Link>
        
        <div className="space-y-4 mt-4">
            <h2 className="text-2xl font-bold">
                Browse Community
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {allcommunities?.map((community) => (

                
                <Card key={community.id}>
                    <CardHeader>
                        <CardTitle>
                           {community.name}
                        </CardTitle>
                        <CardDescription>
                            {community.description}
                        </CardDescription>
                        <CardFooter  className="px-0 mt-2">
                            <Button 
                                className="w-full" 
                                disabled={isJoined(community.id)}
                                onClick={() => handleJoinCommunity(community.id)}
                                >
                                {isJoined ? (
                                    <>
                                        <CheckIcon className="size-4" />
                                        Joined
                                    </>
                                ) : "Join Community"}
                            </Button>
                        </CardFooter>
                    </CardHeader>
                </Card>
                ))}
            </div>
        </div>
        
       </div>
    )
}