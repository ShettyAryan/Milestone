import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, AlertCircle, FileQuestion } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { PostBody } from '../components/blog/PostBody';
import { getBlogPost } from '../services/blogService';
import { urlForImage } from '../services/sanityClient';
import { BlogPost as BlogPostType } from '../types/blog.types';
import { formatPostDate } from '../utils/dateHelpers';

const SITE_URL = 'https://www.milestoneschildclinic.com';
const DEFAULT_TITLE = "Milestones Clinic - Dr. Vinay H. Joshi's Child Clinic";

/**
 * The site is client-rendered, so per-article metadata has to be applied after
 * mount. This keeps the title, description and Article structured data correct
 * for crawlers that execute JavaScript, and restores the defaults on unmount.
 */
const useArticleMetadata = (post: BlogPostType | null) => {
  useEffect(() => {
    if (!post) return;

    const previousTitle = document.title;
    document.title = `${post.title} | Milestones Child Clinic`;

    const descriptionTag = document.querySelector('meta[name="description"]');
    const previousDescription = descriptionTag?.getAttribute('content') || '';
    descriptionTag?.setAttribute('content', post.excerpt);

    const canonicalTag = document.querySelector('link[rel="canonical"]');
    const previousCanonical = canonicalTag?.getAttribute('href') || '';
    canonicalTag?.setAttribute('href', `${SITE_URL}/blog/${post.slug}`);

    const structuredData = document.createElement('script');
    structuredData.type = 'application/ld+json';
    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      image: urlForImage(post.mainImage, 1200, 630),
      datePublished: post.publishedAt,
      author: {
        '@type': 'Person',
        name: post.author
      },
      publisher: {
        '@type': 'MedicalBusiness',
        name: 'Milestones Child Clinic',
        url: SITE_URL
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/blog/${post.slug}`
      }
    });
    document.head.appendChild(structuredData);

    return () => {
      document.title = previousTitle || DEFAULT_TITLE;
      descriptionTag?.setAttribute('content', previousDescription);
      canonicalTag?.setAttribute('href', previousCanonical);
      structuredData.remove();
    };
  }, [post]);
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadPost = async () => {
      if (!slug) return;

      setIsLoading(true);
      setHasError(false);

      try {
        const fetchedPost = await getBlogPost(slug);
        if (!cancelled) {
          setPost(fetchedPost);
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
        if (!cancelled) {
          setHasError(true);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadPost();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useArticleMetadata(post);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFF8F9] py-24 px-4">
        <LoadingSpinner size="lg" />
        <p className="text-center text-[#7a7a7a] mt-4">Loading article...</p>
      </div>
    );
  }

  if (hasError || !post) {
    const isMissing = !hasError;

    return (
      <div className="min-h-screen bg-[#FFF8F9] py-24 px-4">
        <div className="max-w-xl mx-auto text-center">
          {isMissing ? (
            <FileQuestion className="w-16 h-16 text-[#9a9a9a] mx-auto mb-4" />
          ) : (
            <AlertCircle className="w-16 h-16 text-[#9a9a9a] mx-auto mb-4" />
          )}
          <h1 className="text-2xl text-[#3a3a3a] mb-3">
            {isMissing ? 'Article not found' : 'We were unable to load this article'}
          </h1>
          <p className="text-[#7a7a7a] mb-8">
            {isMissing
              ? 'This article may have been moved or removed.'
              : 'Please refresh the page, or try again in a few moments.'}
          </p>
          <Link to="/blog">
            <button className="px-8 py-3 bg-[#6B4D7C] text-white rounded-full hover:bg-[#5a3d6a] transition-colors">
              Back to all articles
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF8F9] pt-8">
      <article className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#6B4D7C] hover:gap-3 transition-all mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>

          {/* Header */}
          <header className="mb-10">
            {post.category && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(107,77,124,0.1)] border border-[rgba(107,77,124,0.2)] mb-4">
                <div className="w-2 h-2 rounded-full bg-[#6B4D7C]" />
                <span className="text-sm text-[#6B4D7C]">{post.category}</span>
              </div>
            )}

            <h1 className="text-4xl text-[#2a2a2a] mb-6 leading-tight">{post.title}</h1>

            <p className="text-lg text-[#5a5a5a] leading-relaxed mb-6">{post.excerpt}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-[#7a7a7a] pb-6 border-b border-[rgba(107,77,124,0.1)]">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatPostDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </span>
            </div>
          </header>

          {/* Cover image */}
          {post.mainImage && (
            <div className="rounded-3xl overflow-hidden border border-[rgba(107,77,124,0.1)] mb-12 aspect-[16/9]">
              <ImageWithFallback
                src={urlForImage(post.mainImage, 1200, 675)}
                alt={post.mainImage.alt || post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Body */}
          <div className="bg-white rounded-3xl border border-[rgba(107,77,124,0.1)] p-8 md:p-12 shadow-sm">
            <PostBody body={post.body} />
          </div>

          {/* Appointment CTA */}
          <div className="bg-gradient-to-br from-[#6B4D7C] to-[#5a3d6a] rounded-3xl p-10 mt-12 text-center shadow-lg">
            <h2 className="text-2xl text-white mb-3 font-semibold">
              Have questions about your child&apos;s health?
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Book a consultation with Dr. Vinay H. Joshi and get advice tailored to your child.
            </p>
            <Link to="/book-appointment">
              <button className="px-8 py-4 bg-white text-[#6B4D7C] rounded-full hover:bg-[#FFF8F9] transition-all font-medium shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                Book an Appointment
              </button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
