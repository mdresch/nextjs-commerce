import Link from "next/link";

import { getBlog, getCollectionProducts, getMenu } from "lib/shopify";
import { validateEnvironmentVariables } from "lib/utils";

type CheckResult =
  | { status: "pass"; label: string; detail?: string }
  | { status: "warn"; label: string; detail: string }
  | { status: "fail"; label: string; detail: string };

function ResultRow({ r }: { r: CheckResult }) {
  const badge =
    r.status === "pass"
      ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-200"
      : r.status === "warn"
        ? "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200"
        : "bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-200";

  const badgeText = r.status.toUpperCase();

  return (
    <li className="flex flex-col gap-2 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-black">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-medium text-neutral-900 dark:text-white">
            {r.label}
          </p>
          {r.detail ? (
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {r.detail}
            </p>
          ) : null}
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs ${badge}`}>
          {badgeText}
        </span>
      </div>
    </li>
  );
}

export default async function HealthPage() {
  const results: CheckResult[] = [];

  // 1) Env vars
  try {
    validateEnvironmentVariables();
    results.push({ status: "pass", label: "Environment variables" });
  } catch (e) {
    results.push({
      status: "fail",
      label: "Environment variables",
      detail: e instanceof Error ? e.message : "Missing required variables.",
    });
  }

  // Only run live Shopify checks if the two required env vars exist.
  const hasShopify =
    Boolean(process.env.SHOPIFY_STORE_DOMAIN) &&
    Boolean(process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN);

  // 2) Menus
  if (hasShopify) {
    const menuHandles = [
      { label: "Header menu", handle: "next-js-frontend-header-menu" },
      { label: "Footer menu", handle: "next-js-frontend-footer-menu" },
    ] as const;

    for (const m of menuHandles) {
      try {
        const items = await getMenu(m.handle);
        if (!items.length) {
          results.push({
            status: "warn",
            label: m.label,
            detail: `Menu handle '${m.handle}' returned 0 items.`,
          });
        } else {
          results.push({
            status: "pass",
            label: m.label,
            detail: `${items.length} items.`,
          });
        }
      } catch (e) {
        results.push({
          status: "fail",
          label: m.label,
          detail:
            e instanceof Error
              ? e.message
              : "Failed to fetch menu from Shopify.",
        });
      }
    }
  }

  // 3) Homepage collections
  if (hasShopify) {
    const collections = [
      {
        label: "Homepage featured items collection",
        handle: "hidden-homepage-featured-items",
        min: 3,
      },
      {
        label: "Homepage carousel collection",
        handle: "hidden-homepage-carousel",
        min: 1,
      },
    ] as const;

    for (const c of collections) {
      try {
        const products = await getCollectionProducts({ collection: c.handle });
        if (products.length < c.min) {
          results.push({
            status: "warn",
            label: c.label,
            detail: `Collection '${c.handle}' has ${products.length} product(s). Expected ≥ ${c.min}.`,
          });
        } else {
          results.push({
            status: "pass",
            label: c.label,
            detail: `${products.length} product(s).`,
          });
        }
      } catch (e) {
        results.push({
          status: "fail",
          label: c.label,
          detail:
            e instanceof Error
              ? e.message
              : "Failed to fetch collection products from Shopify.",
        });
      }
    }
  }

  // 4) Blog access (optional)
  if (hasShopify) {
    const blogHandle = (process.env.NEXT_PUBLIC_BLOG_PATH || "/blogs/adpa")
      .split("/")
      .filter(Boolean)[1];

    if (!blogHandle) {
      results.push({
        status: "warn",
        label: "Blog access",
        detail:
          "Blog handle could not be derived from NEXT_PUBLIC_BLOG_PATH. Default expected format: /blogs/<handle>.",
      });
    } else {
      try {
        const blog = await getBlog(blogHandle);
        if (!blog) {
          results.push({
            status: "warn",
            label: "Blog access",
            detail: `No blog found for handle '${blogHandle}'.`,
          });
        } else {
          results.push({
            status: "pass",
            label: "Blog access",
            detail: `Blog '${blog.handle}' loaded with ${blog.articles.length} article(s).`,
          });
        }
      } catch (e) {
        results.push({
          status: "fail",
          label: "Blog access",
          detail:
            e instanceof Error
              ? e.message
              : "Failed to fetch blog from Shopify.",
        });
      }
    }
  }

  const passCount = results.filter((r) => r.status === "pass").length;
  const warnCount = results.filter((r) => r.status === "warn").length;
  const failCount = results.filter((r) => r.status === "fail").length;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <header className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
          Developer page
        </p>
        <h1 className="text-3xl font-semibold text-neutral-900 dark:text-white">
          Storefront health check
        </h1>
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
          This page is intentionally not linked in the UI. Use it to verify that
          your Shopify connection and required content are configured.
        </p>
        <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
          Summary:{" "}
          <span className="text-emerald-700 dark:text-emerald-300">
            {passCount} pass
          </span>
          ,{" "}
          <span className="text-amber-700 dark:text-amber-300">
            {warnCount} warn
          </span>
          ,{" "}
          <span className="text-red-700 dark:text-red-300">
            {failCount} fail
          </span>
        </p>
      </header>

      <ul className="space-y-3">
        {results.map((r) => (
          <ResultRow key={`${r.status}-${r.label}`} r={r} />
        ))}
      </ul>

      <div className="mt-10 border-t border-neutral-200 pt-6 text-sm dark:border-neutral-800">
        <p className="text-neutral-600 dark:text-neutral-400">
          Useful links:{" "}
          <Link href="/search" className="text-blue-600 hover:underline">
            catalog
          </Link>{" "}
          ·{" "}
          <Link href="/contact" className="text-blue-600 hover:underline">
            contact page
          </Link>{" "}
          ·{" "}
          <Link href="/blogs/adpa" className="text-blue-600 hover:underline">
            blog
          </Link>
        </p>
      </div>
    </div>
  );
}
