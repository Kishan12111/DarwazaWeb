import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateUser = mutation({
  args: {
 name: v.string(),
    email: v.string(),
    ImageUrl: v.string(),
    points: v.number(),
    rank: v.number(),
    weeklyPoints: v.number(),
    badges: v.array(v.string()),
    streak: v.number(),
    level: v.number(),
lastLogin: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Check if a user with the given email already exists
    const user = await ctx.db
      .query("UserTable")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    if (user.length === 0) {
      // If not, insert the new user
      const data = {
        name: args.name,
        email: args.email,
        ImageUrl: args.ImageUrl,
        points: args.points ?? 0,
        rank: args.rank ?? 0,
        weeklyPoints: args.weeklyPoints ?? 0,
        badges: args.badges ?? [],
        streak: args.streak ?? 0,
        level: args.level ?? 0,
        lastLogin: args.lastLogin ?? null,
      };
      const result = await ctx.db.insert("UserTable", {
        ...data,
      });
      console.log(result);
      return {
        ...data,
        result,
      };
    }
    return user[0];
  },
});
