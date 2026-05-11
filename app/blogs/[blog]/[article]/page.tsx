import { BlogArticleSummaryExcerpt } from "components/blog/article-summary";
import Prose from "components/prose";
import { getBlogArticle } from "lib/shopify";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ blog: string; article: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const post = await getBlogArticle(params.blog, params.article);

  if (!post) return notFound();

  const plainSummary =
    post.excerpt ||
    (post.excerptHtml
      ? post.excerptHtml
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim()
      : "");

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || plainSummary || undefined,
    openGraph: {
      publishedTime: post.publishedAt,
      type: "article",
    },
  };
}

export default async function BlogArticlePage(props: {
  params: Promise<{ blog: string; article: string }>;
}) {
  const params = await props.params;
  const post = await getBlogArticle(params.blog, params.article);

  if (!post) return notFound();

  return (
    <>
      <nav className="mb-6 text-sm text-neutral-500 dark:text-neutral-400">
        <Link href={`/blogs/${post.blogHandle}`} className="hover:underline">
          {post.blogTitle}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-800 dark:text-neutral-200">
          {post.title}
        </span>
      </nav>

      <article>
        <h1 className="mb-4 text-5xl font-bold">{post.title}</h1>
        <p className="mb-8 text-sm text-neutral-500 dark:text-neutral-400">
          {new Intl.DateTimeFormat("nl-NL", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(post.publishedAt))}
          {post.author?.name ? ` · ${post.author.name}` : ""}
        </p>

        {post.image?.url ? (
          <div className="relative mb-10 aspect-[2/1] w-full overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
            <Image
              src={post.image.url}
              alt={post.image.altText || post.title}
              fill
              className="object-cover"
              sizes="(min-width: 640px) 42rem, 100vw"
              priority
            />
          </div>
        ) : null}

        {(post.excerptHtml || post.excerpt) && (
          <div className="mb-8 border-b border-neutral-200 pb-8 dark:border-neutral-700">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Samenvatting
            </p>
            <BlogArticleSummaryExcerpt
              excerptHtml={post.excerptHtml}
              excerpt={post.excerpt}
              contentPreview=""
              className="text-lg text-neutral-800 dark:text-neutral-200"
            />
          </div>
        )}

        <Prose className="mb-8" html={post.contentHtml} />
      </article>
    </>
  );
}
