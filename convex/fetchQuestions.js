import { query } from "./_generated/server";
import { v } from "convex/values";

export const fetchAllQuestions = query(async ({ db }) => {
  return await db.query("QuestionDatabase").collect();
});

export const listQuestions = query({
  args: {},
  handler: async (ctx) => {
    const questions = await ctx.db.query("questions").order("desc").take(50);
    
    return Promise.all(
      questions.map(async (question) => ({
        ...question,
        questionImageUrl: question.questionImageId 
          ? await ctx.storage.getUrl(question.questionImageId) 
          : null,
        options: await Promise.all(
          question.options.map(async (option) => ({
            ...option,
            imageUrl: option.imageId 
              ? await ctx.storage.getUrl(option.imageId) 
              : null,
          }))
        ),
      }))
    );
  },
});

export const searchQuestions = query({
  args: {
    searchText: v.optional(v.string()),
    subjectCode: v.optional(v.string()),
    year: v.optional(v.string()),
    topic: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let q;

    // If user entered search text, use search index
    if (args.searchText && args.searchText.trim() !== "") {
      q = ctx.db
        .query("questions")
        .withSearchIndex("search_question", (search) =>
          search.search("questionText", args.searchText)
        );
    } else {
      q = ctx.db.query("questions");
    }

    // Apply filters safely on all paths
    if (args.subjectCode) q = q.filter((q) => q.eq(q.field("subjectCode"), args.subjectCode));
    if (args.year) q = q.filter((q) => q.eq(q.field("year"), args.year));
    if (args.topic) q = q.filter((q) => q.eq(q.field("topic"), args.topic));

    // Fetch recent questions first
    const results = await q.order("desc").take(30);

    // Attach image URLs + option image URLs
    return Promise.all(
      results.map(async (question) => ({
        ...question,
        questionImageUrl: question.questionImageId
          ? await ctx.storage.getUrl(question.questionImageId)
          : null,
        options: await Promise.all(
          question.options.map(async (option) => ({
            ...option,
            imageUrl: option.imageId
              ? await ctx.storage.getUrl(option.imageId)
              : null,
          }))
        ),
      }))
    );
  },
});