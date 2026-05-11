import { BlogArticleSummaryExcerpt } from "components/blog/article-summary";
import { getBlog } from "lib/shopify";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ blog: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const blog = await getBlog(params.blog);

  if (!blog) return notFound();

  return {
    title: blog.seo?.title || blog.title,
    description: blog.seo?.description || undefined,
  };
}

export default async function BlogIndexPage(props: {
  params: Promise<{ blog: string }>;
}) {
  const params = await props.params;
  const blog = await getBlog(params.blog);

  if (!blog) return notFound();

  return (
    <>
      <header className="mb-10">
        <h1 className="text-5xl font-bold">{blog.title}</h1>
        {blog.seo?.description ? (
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            {blog.seo.description}
          </p>
        ) : null}
      </header>

      {blog.articles.length === 0 ? (
        <p className="text-neutral-600 dark:text-neutral-400">
          Er zijn nog geen berichten.
        </p>
      ) : (
        <ul className="space-y-10">
          {blog.articles.map((article) => (
            <li key={article.id}>
              <article className="border-b border-neutral-200 pb-10 last:border-0 dark:border-neutral-700">
                <Link
                  href={`/blogs/${blog.handle}/${article.handle}`}
                  className="group block"
                  prefetch={true}
                >
                  <h2 className="text-2xl font-semibold text-black group-hover:underline dark:text-white">
                    {article.title}
                  </h2>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    {new Intl.DateTimeFormat("nl-NL", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(new Date(article.publishedAt))}
                    {article.author?.name ? ` · ${article.author.name}` : ""}
                  </p>
                  {article.image?.url ? (
                    <div className="relative mt-4 aspect-[2/1] w-full max-w-xl overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
                      <Image
                        src={article.image.url}
                        alt={article.image.altText || article.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 640px) 36rem, 100vw"
                      />
                    </div>
                  ) : null}
                  <BlogArticleSummaryExcerpt
                    excerptHtml={article.excerptHtml}
                    excerpt={article.excerpt}
                    contentPreview={article.contentPreview}
                    className="mt-4"
                  />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
