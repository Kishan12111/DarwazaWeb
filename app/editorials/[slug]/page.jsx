import { getEditorialBySlug } from "../../../utils/contentParser";
import Link from "next/link";

export default function EditorialPage({ params }) {
  const { slug } = params;
  const editorial = getEditorialBySlug(slug);

  if (!editorial) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-center text-xl text-muted-foreground">
          Editorial not found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link href="/editorials">
          <span className="text-primary hover:text-primary/80 font-medium mb-4 inline-block">
            ← Back to Editorials
          </span>
        </Link>

        {/* Title & meta */}
        <h1 className="text-4xl font-bold mb-2 text-balance">
          {editorial.frontmatter.title}
        </h1>
        <p className="text-muted-foreground mb-8">
          {editorial.frontmatter.date} • {editorial.frontmatter.readingTime} min read
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {editorial.frontmatter.tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Full content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          {/*
            If your content is Markdown, you could parse it to HTML first.
            For now, assuming it's plain text with Markdown-style bullets.
          */}
          {editorial.content.split("\n").map((line, i) => {
            // Simple markdown-like bullet parsing
            if (line.startsWith("## ")) {
              return (
                <h2 key={i} className="mt-8 mb-4">
                  {line.replace("## ", "")}
                </h2>
              );
            }
            if (line.startsWith("### ")) {
              return (
                <h3 key={i} className="mt-6 mb-3">
                  {line.replace("### ", "")}
                </h3>
              );
            }
            if (line.startsWith("- ")) {
              return (
                <ul key={i} className="ml-6 list-disc mb-2">
                  <li>{line.replace("- ", "")}</li>
                </ul>
              );
            }
            return (
              <p key={i} className="mb-4">
                {line}
              </p>
            );
          })}
        </article>
      </div>
    </div>
  );
}
