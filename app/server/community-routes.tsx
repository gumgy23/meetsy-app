import { Hono } from "hono";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception"
import { communities, communityMembers, learningGoals } from "@/db/schema";
import { getOrCreateUserByClerkId } from "@/lib/user-utils";

type Variables = {
    userId: string;
}

const communitiesApp = new Hono<{ Variables: Variables }>()
    .get ("/all", async (c) => {
        const allCommunities = await db.select().from(communities);
        return c.json(allCommunities);
    })
    .get("/", async (c) => {
        const clerkId = c.get('userId');
        const user = await getOrCreateUserByClerkId(clerkId);

        if (!user) {
            return c.json([]);
        }

        const userCommunities = await db
            .select({
                id: communityMembers.id,
                userId: communityMembers.userId, 
                communityId: communityMembers.communityId,
                joinAt: communityMembers.joinedAt,
                community: communities
            }).from(communityMembers)
            .innerJoin(communities, eq
                (communityMembers.communityId, communities.id)
            ).where(eq
                (communityMembers.userId, user.id)
            );

        return c.json(userCommunities);
    })
    .post('/:communityId/join', async (c) => {
        const clerkId = c.get("userId") as string;
        const communityId = c.req.param("communityId");

        const user = await getOrCreateUserByClerkId(clerkId);
        if(!user){
            throw new HTTPException(404,{ message: "user not found" });
        }

        const [existing] = await db
        .select()
        .from(communityMembers)
        .where(
            and(
                eq(communityMembers.userId, user.id),
                eq(communityMembers.communityId, communityId)
            )
        );

        if(existing) {
            throw new HTTPException(400, { message:"user already joined community" })
        }

        await db.insert(communityMembers).values({
            userId: user.id,
            communityId: communityId
        });

        return c.json({ 
            message: "Joined community successfully",
            communityId: communityId
        });
    })
    .get("/:communityId/goals", async (c) => {
        const clerkId = c.get("userId");
        const communityId = c.req.param("communityId");

        if (!communityId) {
            throw new HTTPException(400, { message: "communityId is required" });
        }

        const user = await getOrCreateUserByClerkId(clerkId);
        if (!user) {
            throw new HTTPException(404, { message:"user not found" })
        };

        console.log(user.id)

        const goals = await db
            .select()
            .from(learningGoals)
            .where(
                and(
                    eq(learningGoals.userId, user.id),
                    eq(learningGoals.communityId, communityId)
                )
            );

        return c.json(goals);

    });

export { communitiesApp };
