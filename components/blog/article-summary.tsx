import Prose from "components/prose";

type Props = {
  excerptHtml: string;
  excerpt: string;
  contentPreview: string;
  className?: string;
};

export function BlogArticleSummaryExcerpt({
  excerptHtml,
  excerpt,
  contentPreview,
  className = "",
}: Props) {
  if (excerptHtml) {
    return (
      <Prose
        className={`max-w-none text-base leading-relaxed prose-p:my-2 prose-a:text-blue-600 dark:prose-a:text-blue-400 ${className}`}
        html={excerptHtml}
      />
    );
  }
  if (excerpt) {
    return (
      <p className={`text-neutral-700 dark:text-neutral-300 ${className}`}>
        {excerpt}
      </p>
    );
  }
  if (contentPreview) {
    return (
      <p className={`text-neutral-700 dark:text-neutral-300 ${className}`}>
        {contentPreview}
      </p>
    );
  }
  return null;
}
