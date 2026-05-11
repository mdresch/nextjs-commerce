import type { Image, Product } from "lib/shopify/types";

const BOOK_PRODUCT_TYPES = new Set(["book", "books"]);

/** Sample-page images: put `[preview]` in the image alt text in Shopify to hide them from the main gallery (books only). */
const SAMPLE_PAGE_ALT = /\[preview\]/i;

export const BOOK_PREVIEW_PAGE_LIMIT = 20;
const GALLERY_IMAGE_LIMIT = 5;

function norm(s: string) {
  return s.trim().toLowerCase();
}

export function isBookProduct(product: Pick<Product, "productType" | "tags">) {
  const type = norm(product.productType || "");
  if (BOOK_PRODUCT_TYPES.has(type)) return true;
  return product.tags.some((tag) => norm(tag) === "book");
}

export function isSamplePageImage(altText: string) {
  return SAMPLE_PAGE_ALT.test(altText || "");
}

export function bookHasMarkedSamplePages(images: Pick<Image, "altText">[]) {
  return images.some((img) => isSamplePageImage(img.altText));
}

/** Main carousel: excludes `[preview]` images when this is a book and at least one image is marked. */
export function getBookGalleryImages(
  images: Image[],
  isBook: boolean,
): Image[] {
  if (!isBook || !bookHasMarkedSamplePages(images)) {
    return images;
  }
  const storefront = images.filter((img) => !isSamplePageImage(img.altText));
  return storefront.length > 0 ? storefront : images;
}

/** Modal: marked sample pages only when any are marked; otherwise first pages of the full list (legacy). */
export function getBookPreviewPages(images: Image[]): Image[] {
  if (bookHasMarkedSamplePages(images)) {
    return images
      .filter((img) => isSamplePageImage(img.altText))
      .slice(0, BOOK_PREVIEW_PAGE_LIMIT);
  }
  return images.slice(0, BOOK_PREVIEW_PAGE_LIMIT);
}

export function getGalleryImagesForProduct(product: Product): Image[] {
  const book = isBookProduct(product);
  return getBookGalleryImages(product.images, book).slice(
    0,
    GALLERY_IMAGE_LIMIT,
  );
}
