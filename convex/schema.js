import { defineSchema } from "convex/server";
import { defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  UserTable: defineTable({
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
  }),
  QuestionDatabase: defineTable({
    questionId: v.number(),
    questionLatex: v.string(),
    year: v.number(),
    shift: v.string(),
    subjectcode: v.string(),
    imageUrl: v.string(),
    options: v.array(v.string()),
    solution: v.string(),
  })
   .index("by_questionId", ["questionId"])
});

