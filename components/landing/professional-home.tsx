import { Carousel } from "components/carousel";
import { ThreeItemGrid } from "components/grid/three-items";
import Footer from "components/layout/footer";
import Link from "next/link";

const { SITE_NAME } = process.env;

export async function ProfessionalHome() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-10 px-4 py-14 md:flex-row md:items-end md:justify-between md:py-20 lg:py-24">
          <div className="max-w-xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              Professional bookstore
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl dark:text-white">
              Curated titles for discerning readers.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
              {SITE_NAME} brings you a focused selection with clear pricing,
              fast discovery, and a storefront built for serious book buyers and
              teams.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/search"
                className="inline-flex rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                prefetch={true}
              >
                Browse the catalog
              </Link>
              <Link
                href="/contact"
                className="inline-flex rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-400 dark:border-neutral-600 dark:text-white dark:hover:border-neutral-500"
                prefetch={true}
              >
                Request a quote
              </Link>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-6 text-sm md:text-right">
            <div>
              <dt className="text-neutral-500 dark:text-neutral-400">
                Assortment
              </dt>
              <dd className="mt-1 font-semibold text-neutral-900 dark:text-white">
                Professionally listed
              </dd>
            </div>
            <div>
              <dt className="text-neutral-500 dark:text-neutral-400">
                Checkout
              </dt>
              <dd className="mt-1 font-semibold text-neutral-900 dark:text-white">
                Secure via Shopify
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <ThreeItemGrid />

      <section className="mx-auto max-w-(--breakpoint-2xl) px-4 pt-2">
        <div className="mb-4 flex items-end justify-between gap-4 border-b border-neutral-200 pb-3 dark:border-neutral-800">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Featured this week
          </h2>
          <Link
            href="/search"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            prefetch={true}
          >
            View all →
          </Link>
        </div>
        <Carousel />
      </section>

      <Footer />
    </>
  );
}
