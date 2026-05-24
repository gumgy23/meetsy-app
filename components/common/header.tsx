"use client";

import { Show, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { MessageCircleIcon, TrophyIcon, UserIcon } from "lucide-react";

export default function Header({
    isPro
}:{
    isPro: Boolean
}) {
  const  { isSignedIn } = useUser();

  return (
    <header>
        <div className="layout-container">
            <div className="flex items-center gap-6 space-y-2">
                <Link
                    href="/"
                    className="text-xl font-bold">
                    Meetsy
                </Link>
                <Show when="signed-in">
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                            <Button variant={"ghost"} size={"sm"}>
                                Dashboard
                            </Button>
                        </Link>
                        <Link href="/community" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                            <Button variant={"ghost"} size={"sm"}>
                                <UserIcon className="size-4 text-primary" />
                                Community
                            </Button>
                        </Link>
                        <Link href="/chat" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                            <Button variant={"ghost"} size={"sm"}>
                                <MessageCircleIcon className="size-4 text-primary" />
                                Chat
                            </Button>
                        </Link>
                    </nav>
                </Show>
            </div>
            <div className="flex items-center gap-4">
                {isSignedIn ? (
                    <>
                    { isPro ? (
                        <Badge className="flex items-center gap-2"
                            variant="outline">
                            <TrophyIcon className="size-3 text-primary" />
                            PRO
                        </Badge>
                    ): (
                        <Badge className="flex items-center gap-2"
                            variant="outline">
                            Free
                        </Badge>
                    )}
                    <UserButton 
                    appearance={{
                        elements: {
                            avatarBox:"size-9"
                        }
                    }}
                    />
                   </>
                ) : (
                    <div>
                      <Show when="signed-out">
                        <Link href="/sign-in">
                            <Button  variant="ghost">Sign In</Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button variant="default">Sign Up</Button>
                        </Link>
                    </Show>      
                    </div>
                )}
                
                
                
            </div>
            
            
        </div>
    </header>
  );
}
