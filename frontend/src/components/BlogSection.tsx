import { useEffect, useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LoadingSpinner } from './common/LoadingSpinner';
import { getRecentBlogPosts } from '../services/blogService';
import { urlForImage } from '../services/sanityClient';
import { BlogPostSummary } from '../types/blog.types';
import { formatPostDate } from '../utils/dateHelpers';

const TEASER_COUNT = 3;

export function BlogSection() {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadPosts = async () => {
      try {
        const recentPosts = await getRecentBlogPosts(TEASER_COUNT);
        if (!cancelled) {
          setPosts(recentPosts);
        }
      } catch (error) {
        // The homepage teaser is non-critical - hide the section rather than
        // showing an error on an otherwise healthy landing page.
        console.error('Error loading recent blog posts:', error);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!isLoading && posts.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="py-16 px-4 bg-[#FFF8F9]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(107,77,124,0.1)] border border-[rgba(107,77,124,0.2)] mb-4">
            <div className="w-2 h-2 rounded-full bg-[#6B4D7C]" />
            <span className="text-sm text-[#6B4D7C]">Blog & Resources</span>
          </div>
          <h2 className="text-[#3a3a3a] mb-4">
            Health Tips & Parenting Advice
          </h2>
          <p className="text-[#7a7a7a] max-w-2xl mx-auto">
            Stay informed with the latest pediatric health information,
            parenting tips, and wellness advice from Dr. Joshi
          </p>
        </div>

        {isLoading ? (
          <div className="py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post._id} to={`/blog/${post.slug}`} className="block">
                  <article className="h-full group bg-white rounded-2xl overflow-hidden border border-[rgba(107,77,124,0.1)] hover:border-[rgba(107,77,124,0.3)] hover:shadow-[0px_8px_10px_0px_rgba(107,77,124,0.1),0px_20px_25px_0px_rgba(107,77,124,0.1)] transition-all duration-300">
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <ImageWithFallback
                        src={urlForImage(post.mainImage, 800, 500)}
                        alt={post.mainImage?.alt || post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {post.category && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-[#6B4D7C] text-white text-xs rounded-full">
                            {post.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-[#7a7a7a] mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatPostDate(post.publishedAt)}
                        </span>
                        <span>•</span>
                        <span>{post.readTime} min read</span>
                      </div>

                      <h3 className="text-[#3a3a3a] mb-3 group-hover:text-[#6B4D7C] transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-[#7a7a7a] text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <span className="flex items-center gap-2 text-sm text-[#6B4D7C] group-hover:gap-3 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <Link to="/blog">
                <button className="px-8 py-4 bg-[#6B4D7C] text-white rounded-full hover:bg-[#5a3d6a] transition-colors">
                  View All Articles
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
