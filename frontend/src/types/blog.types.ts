export interface SanityImage {
  asset: {
    _ref: string;
    _type: string;
  };
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

/** A post as returned by the blog listing query - no body, to keep the payload small. */
export interface BlogPostSummary {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: number;
  category: string | null;
  mainImage: SanityImage | null;
}

/** A single post, including the Portable Text body rendered by <PostBody />. */
export interface BlogPost extends BlogPostSummary {
  body: any[];
}

export interface BlogCategory {
  _id: string;
  title: string;
}
