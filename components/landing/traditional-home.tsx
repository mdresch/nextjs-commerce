import { Carousel } from "components/carousel";
import { ThreeItemGrid } from "components/grid/three-items";
import Footer from "components/layout/footer";
import Link from "next/link";

const { SITE_NAME } = process.env;

export async function TraditionalHome() {
  return (
    <>
      <div className="min-h-[calc(100vh-4rem)] bg-[#f5f0e8] dark:bg-[#1c1917]">
        <section className="border-b-4 border-double border-amber-900/25 dark:border-amber-700/30">
          <div className="mx-auto max-w-(--breakpoint-2xl) px-4 py-12 md:py-16">
            <div className="mx-auto max-w-3xl rounded-sm border border-amber-900/20 bg-[#faf8f3] p-8 shadow-sm dark:border-amber-800/40 dark:bg-[#292524] md:p-12">
              <p className="font-serif text-sm italic text-amber-900/80 dark:text-amber-200/90">
                Est. — your neighbourhood book table, online.
              </p>
              <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-amber-950 md:text-5xl dark:text-amber-50">
                Step inside {SITE_NAME ? `${SITE_NAME}` : "our shop"}
              </h1>
              <p className="mt-6 font-serif text-lg leading-relaxed text-amber-950/85 dark:text-stone-300">
                We stack the shelves the old-fashioned way: with stories worth
                holding, voices worth hearing, and editions you’ll want to lend
                — carefully — to a friend.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/search"
                  className="rounded-sm border-2 border-amber-900 bg-amber-900 px-6 py-2.5 font-serif text-sm font-medium text-[#faf8f3] transition-colors hover:bg-amber-950 dark:border-amber-600 dark:bg-amber-700 dark:hover:bg-amber-600"
                  prefetch={true}
                >
                  Browse the shelves
                </Link>
                <Link
                  href="/contact"
                  className="font-serif text-sm font-medium text-amber-900 underline decoration-amber-900/40 underline-offset-4 hover:decoration-amber-900 dark:text-amber-200 dark:decoration-amber-200/50"
                  prefetch={true}
                >
                  Ask the shopkeeper
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-(--breakpoint-2xl) px-4 pb-4 pt-6">
          <p className="mb-3 font-serif text-sm text-amber-900/70 dark:text-amber-200/70">
            Window display — staff favourites
          </p>
          <ThreeItemGrid />
        </div>

        <section className="border-t border-amber-900/15 bg-[#ebe4d8] px-4 py-8 dark:border-amber-800/25 dark:bg-[#232019]">
          <div className="mx-auto max-w-(--breakpoint-2xl)">
            <h2 className="mb-4 font-serif text-xl text-amber-950 dark:text-amber-100">
              New arrivals — from the storeroom
            </h2>
            <Carousel />
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
