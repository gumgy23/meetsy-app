import { BotIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function AIMatching({ 
    totalGoals 
}:{
    totalGoals: number
}) {
    
    return (
        <div className="text-center py-8">
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">
                    AI-Powered Matching
                </h3>
                <p>
                    Our AI will analyze your learning goals and
                    automatically match you
                    with the most compatible learanaing partner 
                    in the community.
                </p>
            </div>
            <Button size="lg" disabled={totalGoals === 0}>
                <BotIcon className="size-4" />
                Find Partner with AI
            </Button>
            {totalGoals > 0 && (
                <p className="mt-4 text-sm text-muted-foreground">
                    You have {totalGoals} learning goals set
                </p>     
            )}
            {totalGoals === 0 && (
                <p className="mt-4 text-sm text-muted-foreground">
                    Add learning goals first to enable AI Matching
                </p>     
            )}
        </div>
    )
}