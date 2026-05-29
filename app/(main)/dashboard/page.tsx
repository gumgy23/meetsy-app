"use client";

import { useQuery } from "@tanstack/react-query";

export default function DashboardPage(){

    const {data, isLoading, error} = useQuery<{ id: number; name: string }[]>({
        queryKey: ['communities'],
        queryFn: () => {
            return new Promise<{ id: number; name: string }[]>((resolve) => {
                setTimeout(() => {
                    resolve([{ id:1, name:"community 1"}]);
                }, 1000)
            })
        }
    })
    
    if(isLoading) return <div>Loading..</div>
    if(error) return <div>Error: {error.message} </div>

    return (
        <div className="page-wrapper">
            <div>
                <h1 
                    className="text-3xl font-bold tracking-tight"
                    >Dashboard Page</h1>
                <p>Welcome Back Galih</p>
            </div>
            
            {data && 
                data.map((community: {
                    id: number, 
                    name: string
                }) => (
                    <div key={community.id}>{community.name}</div>
                ))

            }
        </div>
    );
}