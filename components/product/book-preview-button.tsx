"use client";

import { Dialog, Transition } from "@headlessui/react";
import { BookOpenIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { BOOK_PREVIEW_PAGE_LIMIT } from "lib/product-book";
import Image from "next/image";
import { Fragment, useState } from "react";

type PreviewPage = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export function BookPreviewButton({
  productTitle,
  pages,
}: {
  productTitle: string;
  pages: PreviewPage[];
}) {
  const [open, setOpen] = useState(false);
  const previewPages = pages.slice(0, BOOK_PREVIEW_PAGE_LIMIT);

  if (previewPages.length === 0) return null;

  const close = () => setOpen(false);
  const count = previewPages.length;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mb-6 flex w-full items-center justify-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-900 transition-colors hover:border-neutral-300 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:border-neutral-600 dark:hover:bg-neutral-800"
      >
        <BookOpenIcon className="h-5 w-5 shrink-0" aria-hidden />
        Preview sample pages
        <span className="text-neutral-500 dark:text-neutral-400">
          (up to {BOOK_PREVIEW_PAGE_LIMIT})
        </span>
      </button>

      <Transition show={open}>
        <Dialog onClose={close} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-200 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" aria-hidden />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition duration-150 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
              <Dialog.Panel className="flex max-h-[min(90vh,900px)] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-black">
                <div className="flex shrink-0 items-start justify-between gap-4 border-b border-neutral-200 px-4 py-3 dark:border-neutral-700 sm:px-5">
                  <div className="min-w-0">
                    <Dialog.Title className="text-base font-semibold text-neutral-900 dark:text-white">
                      Sample pages
                    </Dialog.Title>
                    <p className="mt-0.5 truncate text-sm text-neutral-500 dark:text-neutral-400">
                      {productTitle}
                      <span className="text-neutral-400 dark:text-neutral-500">
                        {" "}
                        · {count} of {BOOK_PREVIEW_PAGE_LIMIT} max
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Close preview"
                    onClick={close}
                    className="shrink-0 rounded-md border border-neutral-200 p-2 text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-900"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
                  <ol className="mx-auto max-w-2xl space-y-8">
                    {previewPages.map((page, index) => {
                      const hasSize = page.width > 0 && page.height > 0;
                      const aspectStyle = hasSize
                        ? ({
                            aspectRatio: `${page.width} / ${page.height}`,
                          } as const)
                        : ({ aspectRatio: "2 / 3" } as const);

                      return (
                        <li key={`${page.url}-${index}`}>
                          <p className="mb-2 text-center text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                            Page {index + 1}
                          </p>
                          <figure
                            className="relative w-full max-h-[min(70vh,800px)] overflow-hidden rounded-md border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900"
                            style={aspectStyle}
                          >
                            <Image
                              src={page.url}
                              alt={page.altText}
                              fill
                              className="object-contain"
                              sizes="(min-width: 768px) 42rem, 100vw"
                              loading={index < 2 ? "eager" : "lazy"}
                            />
                          </figure>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
