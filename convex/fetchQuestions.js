import { query } from "./_generated/server";

export const fetchAllQuestions = query(async ({ db }) => {
  return await db.query("QuestionDatabase").collect();
});

