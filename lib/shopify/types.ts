export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type Cart = Omit<ShopifyCart, "lines"> & {
  lines: CartItem[];
};

export type CartProduct = {
  id: string;
  handle: string;
  title: string;
  featuredImage: Maybe<Image>;
};

export type CartItem = {
  id: string | undefined;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: CartProduct;
  };
};

export type Collection = ShopifyCollection & {
  path: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Menu = {
  title: string;
  path: string;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type Product = Omit<ShopifyProduct, "variants" | "images"> & {
  variants: ProductVariant[];
  images: Image[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type SEO = {
  title: string;
  description: string;
};

export type ShopifyCart = {
  id: string | undefined;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};

export type ShopifyCollection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Maybe<Image>;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  productType: string;
  updatedAt: string;
};

export type ShopifyCartOperation = {
  data: {
    cart: ShopifyCart;
  };
  variables: {
    cartId: string;
  };
};

export type ShopifyCreateCartOperation = {
  data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyAddToCartOperation = {
  data: {
    cartLinesAdd: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyRemoveFromCartOperation = {
  data: {
    cartLinesRemove: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type ShopifyUpdateCartOperation = {
  data: {
    cartLinesUpdate: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyCollectionOperation = {
  data: {
    collection: ShopifyCollection;
  };
  variables: {
    handle: string;
  };
};

export type ShopifyCollectionProductsOperation = {
  data: {
    collection: {
      products: Connection<ShopifyProduct>;
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type ShopifyCollectionsOperation = {
  data: {
    collections: Connection<ShopifyCollection>;
  };
};

export type ShopifyMenuOperation = {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
      }[];
    };
  };
  variables: {
    handle: string;
  };
};

export type ShopifyPageOperation = {
  data: { pageByHandle: Page };
  variables: { handle: string };
};

export type ShopifyPagesOperation = {
  data: {
    pages: Connection<Page>;
  };
};

export type ArticleAuthor = {
  name: string;
};

export type BlogArticleSummary = {
  id: string;
  title: string;
  handle: string;
  excerpt: string;
  excerptHtml: string;
  /** Plain-text preview from body when excerpt is empty (Storefront API). */
  contentPreview: string;
  publishedAt: string;
  author: ArticleAuthor;
  image: Maybe<Image>;
};

export type BlogIndex = {
  id: string;
  title: string;
  handle: string;
  seo: SEO;
  articles: BlogArticleSummary[];
};

export type BlogArticle = {
  title: string;
  handle: string;
  contentHtml: string;
  excerpt: string;
  excerptHtml: string;
  publishedAt: string;
  author: ArticleAuthor;
  image: Maybe<Image>;
  seo: SEO;
  blogTitle: string;
  blogHandle: string;
};

export type ShopifyArticleRaw = {
  id: string;
  title: string;
  handle: string;
  excerpt: string | null;
  excerptHtml?: string | null;
  /** Present on list query via content(truncateAt: n). */
  content?: string | null;
  publishedAt: string;
  author: ArticleAuthor;
  image: Maybe<Image>;
  contentHtml?: string;
  seo?: SEO;
};

export type ShopifyBlog = {
  id: string;
  title: string;
  handle: string;
  seo: SEO;
  articles: Connection<ShopifyArticleRaw>;
};

export type ShopifyBlogOperation = {
  data: { blogByHandle: ShopifyBlog | null };
  variables: { handle: string };
};

export type ShopifyBlogArticleOperation = {
  data: {
    blogByHandle: {
      title: string;
      handle: string;
      articleByHandle: ShopifyArticleRaw | null;
    } | null;
  };
  variables: { blog: string; article: string };
};

export type ShopifyBlogsSitemapOperation = {
  data: {
    blogs: Connection<{
      handle: string;
      articles: Connection<{
        handle: string;
        publishedAt: string;
      }>;
    }>;
  };
};

export type ShopifyProductOperation = {
  data: { product: ShopifyProduct };
  variables: {
    handle: string;
  };
};

export type ShopifyProductRecommendationsOperation = {
  data: {
    productRecommendations: ShopifyProduct[];
  };
  variables: {
    productId: string;
  };
};

export type ShopifyProductsOperation = {
  data: {
    products: Connection<ShopifyProduct>;
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  };
};
