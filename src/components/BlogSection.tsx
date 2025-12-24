import { Calendar, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const blogPosts = [
  {
    title: 'Understanding Childhood Vaccinations',
    excerpt: 'A comprehensive guide to the vaccination schedule and why each vaccine is important for your child\'s health.',
    date: 'December 15, 2024',
    category: 'Health Tips',
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    readTime: '5 min read'
  },
  {
    title: 'Developmental Milestones: Birth to 5 Years',
    excerpt: 'Learn what to expect at each stage of your child\'s development and when to talk to your pediatrician.',
    date: 'December 10, 2024',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    readTime: '7 min read'
  },
  {
    title: 'Nutrition Tips for Growing Children',
    excerpt: 'Essential nutrition guidelines and practical tips for feeding your child at every age and stage.',
    date: 'December 5, 2024',
    category: 'Nutrition',
    image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    readTime: '6 min read'
  },
  {
    title: 'Managing Common Childhood Illnesses',
    excerpt: 'How to recognize, treat, and prevent common illnesses like colds, flu, and ear infections.',
    date: 'November 28, 2024',
    category: 'Health Tips',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    readTime: '8 min read'
  },
  {
    title: 'Sleep Training: A Gentle Approach',
    excerpt: 'Evidence-based strategies for helping your baby develop healthy sleep habits without stress.',
    date: 'November 20, 2024',
    category: 'Parenting',
    image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    readTime: '6 min read'
  },
  {
    title: 'Screen Time Guidelines for Kids',
    excerpt: 'Understanding healthy screen time limits and how to balance digital media with other activities.',
    date: 'November 15, 2024',
    category: 'Parenting',
    image: 'https://images.unsplash.com/photo-1596496050827-8299e0220de1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    readTime: '5 min read'
  }
];

export function BlogSection() {
  return (
    <section id="blog" className="py-16 px-4 bg-[#FFF8F9]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(107,77,124,0.1)] border border-[rgba(107,77,124,0.2)] mb-4">
            <div className="w-2 h-2 rounded-full bg-[#6B4D7C]" />
            <span className="text-sm text-[#6B4D7C]">Blog & Resources</span>
          </div>
          <h2 className="text-[#3a3a3a] mb-4">Health Tips & Parenting Advice</h2>
          <p className="text-[#7a7a7a] max-w-2xl mx-auto">
            Stay informed with the latest pediatric health information, parenting tips, and wellness advice from Dr. Joshi
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="group bg-white rounded-2xl overflow-hidden border border-[rgba(107,77,124,0.1)] hover:border-[rgba(107,77,124,0.3)] hover:shadow-[0px_8px_10px_0px_rgba(107,77,124,0.1),0px_20px_25px_0px_rgba(107,77,124,0.1)] transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[16/10]">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#6B4D7C] text-white text-xs rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-[#7a7a7a] mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-[#3a3a3a] mb-3 group-hover:text-[#6B4D7C] transition-colors">
                  {post.title}
                </h3>

                <p className="text-[#7a7a7a] text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <button className="flex items-center gap-2 text-sm text-[#6B4D7C] hover:gap-3 transition-all">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-[#6B4D7C] text-white rounded-full hover:bg-[#5a3d6a] transition-colors">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
}