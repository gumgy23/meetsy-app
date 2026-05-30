import { client } from "@/lib/api-client";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCommunities = () => {
    // Fetch communities list from the API.
    // queryKey: cache key — React Query refetches when this changes.
    // queryFn: temporary mock with 1s delay; replace with a real API call later.
    return useQuery({
        queryKey: ['communities'],
        queryFn: async () => {
           const res = await client.api.communities.$get();
            if (!res.ok) {
                throw new Error("Failed to fetch communities");
            }
           return res.json();
        }
    });
}

export const useAllCommunities = () => {
    return useQuery({
        queryKey: ['all-communities'],
        queryFn: async () => {
           const res = await client.api.communities.all.$get();
            if (!res.ok) {
                throw new Error("Failed to fetch communities");
            }
           return res.json();
        }
    });
}

export const useCommunityGoals = (communityId: string | null) => {
    return useQuery({
        queryKey: ['communityGoals', communityId],
        queryFn: async () => {
           const res = await client.api.communities
           [":communityId"].goals.$get({
                param: { communityId: communityId! }
           });
            if (!res.ok) {
                throw new Error("Failed to fetch community goals");
            }
           return res.json();
        },
        enabled: !!communityId,
    });
}

export const useJoinCommunity = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (communityId: string) => {
           const res = await client.api.communities
           [":communityId"].join.$post({
                param: { communityId: communityId! }
           });
            if (!res.ok) {
                throw new Error("Failed to join");
            }
           return res.json();
        },
        onSuccess: ()=> {
            queryClient.invalidateQueries({
                queryKey: ["communities"]
            });
        },
        onError: (error) => {
            console.error(error.message);
        }
    });
}