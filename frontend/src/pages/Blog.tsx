import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, AlertCircle, FileText } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { getBlogPosts, getBlogCategories } from '../services/blogService';
import { urlForImage } from '../services/sanityClient';
import { BlogPostSummary, BlogCategory } from '../types/blog.types';
import { formatPostDate } from '../utils/dateHelpers';

const ALL_POSTS = 'All Posts';
const POSTS_PER_PAGE = 6;

export default function Blog() {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(ALL_POSTS);
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadBlog = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const [fetchedPosts, fetchedCategories] = await Promise.all([
          getBlogPosts(),
          getBlogCategories()
        ]);

        if (!cancelled) {
          setPosts(fetchedPosts);
          setCategories(fetchedCategories);
        }
      } catch (error) {
        console.error('Error loading blog:', error);
        if (!cancelled) {
          setHasError(true);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadBlog();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    // Start each filtered view from the top of the list again
    setVisibleCount(POSTS_PER_PAGE);
  };

  const filteredPosts =
    activeCategory === ALL_POSTS
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = filteredPosts.length > visibleCount;

  return (
    <div className="pt-8">
      <section className="py-16 px-4 bg-[#FFF8F9]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(107,77,124,0.1)] border border-[rgba(107,77,124,0.2)] mb-4">
              <div className="w-2 h-2 rounded-full bg-[#6B4D7C]" />
              <span className="text-sm text-[#6B4D7C]">Health & Wellness</span>
            </div>
            <h2 className="text-[#3a3a3a] mb-4">Latest from Our Blog</h2>
            <p className="text-[#7a7a7a] max-w-3xl mx-auto">
              Expert advice, parenting tips, and the latest updates in pediatric care from Dr. Joshi and our team
            </p>
          </div>

          {isLoading ? (
            <div className="py-24">
              <LoadingSpinner size="lg" />
              <p className="text-center text-[#7a7a7a] mt-4">Loading articles...</p>
            </div>
          ) : hasError ? (
            <div className="text-center py-24">
              <AlertCircle className="w-12 h-12 text-[#9a9a9a] mx-auto mb-4" />
              <p className="text-[#3a3a3a] mb-2">We were unable to load the articles</p>
              <p className="text-sm text-[#7a7a7a]">
                Please refresh the page, or try again in a few moments.
              </p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-24">
              <FileText className="w-12 h-12 text-[#9a9a9a] mx-auto mb-4" />
              <p className="text-[#3a3a3a] mb-2">No articles published yet</p>
              <p className="text-sm text-[#7a7a7a]">
                Check back soon for health tips and parenting advice from Dr. Joshi.
              </p>
            </div>
          ) : (
            <>
              {/* Categories Filter */}
              {categories.length > 0 && (
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                  {[ALL_POSTS, ...categories.map((category) => category.title)].map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleCategorySelect(category)}
                      className={`px-6 py-2 rounded-full text-sm transition-colors ${
                        category === activeCategory
                          ? "bg-[#6B4D7C] text-white"
                          : "bg-white text-[#7a7a7a] hover:bg-[rgba(107,77,124,0.1)] border border-[rgba(107,77,124,0.2)]"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}

              {/* Blog Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visiblePosts.map((post) => (
                  <Link key={post._id} to={`/blog/${post.slug}`} className="block">
                    <article className="h-full bg-white rounded-2xl overflow-hidden border border-[rgba(107,77,124,0.1)] hover:shadow-lg transition-shadow group cursor-pointer">
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback
                          src={urlForImage(post.mainImage, 800, 500)}
                          alt={post.mainImage?.alt || post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {post.category && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs text-[#6B4D7C] rounded-full">
                              {post.category}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <h3 className="text-[#3a3a3a] mb-3 group-hover:text-[#6B4D7C] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-[#7a7a7a] text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-[#7a7a7a] pt-4 border-t border-[rgba(107,77,124,0.1)]">
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatPostDate(post.publishedAt)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{post.readTime} min read</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* No results for the selected category */}
              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <FileText className="w-12 h-12 text-[#9a9a9a] mx-auto mb-4" />
                  <p className="text-[#7a7a7a]">No articles in this category yet</p>
                </div>
              )}

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-12">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((count) => count + POSTS_PER_PAGE)}
                    className="px-8 py-3 border-2 border-[#6B4D7C] text-[#6B4D7C] rounded-full hover:bg-[#6B4D7C] hover:text-white transition-colors"
                  >
                    Load More Articles
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
