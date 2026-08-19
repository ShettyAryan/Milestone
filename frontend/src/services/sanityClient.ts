import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImage } from '../types/blog.types';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

/**
 * The blog is optional: if Sanity is not configured the rest of the site
 * (booking in particular) must keep working, so the client is only created
 * when a project ID is present and the blog surfaces handle its absence.
 */
export const isSanityConfigured = Boolean(projectId);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true,
      perspective: 'published'
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

/**
 * Build a CDN URL for a Sanity image, resized and format-optimised.
 */
export const urlForImage = (
  source: SanityImage | null | undefined,
  width = 800,
  height?: number
): string => {
  if (!builder || !source?.asset) {
    return '';
  }

  let image = builder.image(source).width(width).auto('format').fit('crop');

  if (height) {
    image = image.height(height);
  }

  return image.url();
};
