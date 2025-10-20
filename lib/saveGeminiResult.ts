import fs from "fs";
import path from "path";

/**
 * Saves Gemini AI response text to a Markdown file
 */
export async function saveGeminiResponse(fileName: string, text: string) {
  const dirPath = path.join(process.cwd(), "content");
  const filePath = path.join(dirPath, `${fileName}.md`);

  // make sure folder exists
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // format content for Markdown
  const markdownContent = `\n\n## Gemini Output (${new Date().toLocaleString()})\n\n${text}\n`;

  // append if file exists, else create new
  if (fs.existsSync(filePath)) {
    fs.appendFileSync(filePath, markdownContent, "utf-8");
  } else {
    fs.writeFileSync(filePath, `# Gemini Responses\n${markdownContent}`, "utf-8");
  }

  return filePath;
}
