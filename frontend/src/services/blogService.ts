import { sanityClient, isSanityConfigured } from './sanityClient';
import { BlogPost, BlogPostSummary, BlogCategory } from '../types/blog.types';

const POST_SUMMARY_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  author,
  publishedAt,
  readTime,
  "category": category->title,
  mainImage
`;

const assertConfigured = () => {
  if (!isSanityConfigured || !sanityClient) {
    throw new Error(
      'Sanity is not configured. Set VITE_SANITY_PROJECT_ID in your environment.'
    );
  }
};

/**
 * Fetch all published posts, newest first.
 * Posts dated in the future are excluded so they can be scheduled in advance.
 */
export const getBlogPosts = async (): Promise<BlogPostSummary[]> => {
  try {
    assertConfigured();

    const query = `*[_type == "post" && defined(slug.current) && publishedAt <= now()]
      | order(publishedAt desc) {${POST_SUMMARY_FIELDS}}`;

    return await sanityClient!.fetch<BlogPostSummary[]>(query);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

/**
 * Fetch the most recent posts - used by the homepage teaser section.
 */
export const getRecentBlogPosts = async (limit = 3): Promise<BlogPostSummary[]> => {
  try {
    assertConfigured();

    const query = `*[_type == "post" && defined(slug.current) && publishedAt <= now()]
      | order(publishedAt desc)[0...$limit] {${POST_SUMMARY_FIELDS}}`;

    return await sanityClient!.fetch<BlogPostSummary[]>(query, { limit });
  } catch (error) {
    console.error('Error fetching recent blog posts:', error);
    throw error;
  }
};

/**
 * Fetch a single post by its slug. Returns null when no post matches.
 */
export const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
  try {
    assertConfigured();

    const query = `*[_type == "post" && slug.current == $slug][0]{
      ${POST_SUMMARY_FIELDS},
      body
    }`;

    const post = await sanityClient!.fetch<BlogPost | null>(query, { slug });
    return post || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
};

/**
 * Fetch only the categories that actually have a published post attached,
 * so the filter never offers an option that returns nothing.
 */
export const getBlogCategories = async (): Promise<BlogCategory[]> => {
  try {
    assertConfigured();

    const query = `*[_type == "category" && count(*[_type == "post" && references(^._id) && publishedAt <= now()]) > 0]
      | order(title asc) { _id, title }`;

    return await sanityClient!.fetch<BlogCategory[]>(query);
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    throw error;
  }
};
