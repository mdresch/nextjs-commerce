import type { Menu } from "lib/shopify/types";

function normalizePath(path: string) {
  const p = path.trim().toLowerCase();
  if (p.length > 1 && p.endsWith("/")) {
    return p.slice(0, -1);
  }
  return p;
}

/** Shown in the footer when missing from the Shopify footer menu. */
function defaultFooterExtras(): { title: string; path: string }[] {
  const blogPath = process.env.NEXT_PUBLIC_BLOG_PATH?.trim() || "/blogs/adpa";
  return [
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "Privacy", path: "/data-sharing-opt-out" },
    { title: "Blog", path: blogPath },
  ];
}

export function mergeDefaultFooterPageLinks(menu: Menu[]): Menu[] {
  const paths = new Set(menu.map((item) => normalizePath(item.path)));
  const extras = defaultFooterExtras().filter(
    (item) => !paths.has(normalizePath(item.path)),
  );
  return extras.length ? [...menu, ...extras] : menu;
}
