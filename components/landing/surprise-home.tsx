import { Carousel } from "components/carousel";
import { ThreeItemGrid } from "components/grid/three-items";
import Footer from "components/layout/footer";
import { getBlogIndexPath } from "lib/landing-variant";
import Link from "next/link";

const { SITE_NAME } = process.env;

export async function SurpriseHome() {
  const blogPath = getBlogIndexPath();

  return (
    <>
      <section className="landing-aurora relative overflow-hidden bg-slate-950 px-4 py-16 text-white md:py-24">
        <div
          className="pointer-events-none absolute inset-0 landing-aurora-blobs"
          aria-hidden
        />
        <div className="relative mx-auto max-w-(--breakpoint-2xl)">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-violet-200/90 backdrop-blur-sm">
              Not your average stack
            </p>
            <h1 className="text-5xl font-light leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              <span className="block bg-linear-to-r from-white via-violet-100 to-fuchsia-200 bg-clip-text text-transparent">
                Read sideways.
              </span>
              <span className="mt-2 block font-medium text-white/95">
                Discover {SITE_NAME || "books"} in a new dimension.
              </span>
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-violet-100/85">
              A playful storefront for curious minds: bold type, soft motion,
              and shelves that keep moving. Scroll — the story doesn’t end at
              the hero.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/search"
                className="landing-glow-btn rounded-full bg-white px-7 py-3 text-sm font-semibold text-violet-950 shadow-lg shadow-violet-500/25 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                prefetch={true}
              >
                Start exploring
              </Link>
              <Link
                href={blogPath}
                className="rounded-full border border-white/25 px-7 py-3 text-sm font-medium text-white/90 backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/10"
                prefetch={true}
              >
                Read the journal
              </Link>
            </div>
          </div>

          <div className="mt-14 hidden md:block">
            <p className="mb-3 text-center text-xs uppercase tracking-[0.35em] text-violet-300/60">
              Turn the page
            </p>
            <div className="mx-auto h-px max-w-md bg-linear-to-r from-transparent via-fuchsia-400/50 to-transparent" />
          </div>
        </div>
      </section>

      <section className="relative bg-neutral-50 dark:bg-neutral-950">
        <div className="pointer-events-none absolute -top-8 left-1/2 h-16 w-[min(90vw,48rem)] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl dark:bg-fuchsia-500/15" />
        <div className="relative mx-auto max-w-(--breakpoint-2xl) px-4 pt-8 pb-2">
          <h2 className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Shelf picks — floating forward
          </h2>
          <div className="landing-float-section">
            <ThreeItemGrid />
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-white px-4 py-10 dark:border-neutral-800 dark:bg-black">
        <div className="mx-auto max-w-(--breakpoint-2xl)">
          <h2 className="mb-6 text-center text-2xl font-light text-neutral-800 dark:text-neutral-100">
            Momentum{" "}
            <span className="text-fuchsia-600 dark:text-fuchsia-400">→</span>{" "}
            always something new
          </h2>
          <Carousel />
        </div>
      </section>

      <Footer />
    </>
  );
}
