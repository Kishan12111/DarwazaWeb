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
    let query = ctx.db.query("questions");
    
    if (args.searchText) {
      query = ctx.db
        .query("questions")
        .withSearchIndex("search_question", (q) => {
          let searchQuery = q.search("questionText", args.searchText);
          if (args.subjectCode) searchQuery = searchQuery.eq("subjectCode", args.subjectCode);
          if (args.year) searchQuery = searchQuery.eq("year", args.year);
          if (args.topic) searchQuery = searchQuery.eq("topic", args.topic);
          return searchQuery;
        });
    } else {
      if (args.subjectCode && args.year) {
        query = query.withIndex("by_subject_year", (q) => 
          q.eq("subjectCode", args.subjectCode).eq("year", args.year)
        );
      } else if (args.topic) {
        query = query.withIndex("by_topic", (q) => q.eq("topic", args.topic));
      }
    }
    
    const questions = await query.order("desc").take(20);
    
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