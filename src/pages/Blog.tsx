import { Calendar, User, Clock } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const blogPosts = [
  {
    id: 1,
    title: "Understanding Newborn Care: A Complete Guide for First-Time Parents",
    excerpt: "Bringing home a newborn can be overwhelming. Learn essential tips for feeding, sleeping, and caring for your baby in the first weeks.",
    author: "Dr. Vinay H. Joshi",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Newborn Care",
    image: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
  },
  {
    id: 2,
    title: "Vaccination Schedule: Why Timing Matters",
    excerpt: "Understanding the importance of vaccines and staying on schedule to protect your child from preventable diseases.",
    author: "Dr. Vinay H. Joshi",
    date: "March 10, 2024",
    readTime: "6 min read",
    category: "Immunization",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
  },
  {
    id: 3,
    title: "Developmental Milestones: What to Expect in Your Child's First Year",
    excerpt: "Track your baby's growth and development with this comprehensive guide to milestones from birth to 12 months.",
    author: "Dr. Vinay H. Joshi",
    date: "March 5, 2024",
    readTime: "10 min read",
    category: "Development",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
  },
  {
    id: 4,
    title: "Managing Common Childhood Illnesses at Home",
    excerpt: "Learn how to identify and manage common illnesses like fever, colds, and stomach bugs, and when to seek medical attention.",
    author: "Dr. Vinay H. Joshi",
    date: "February 28, 2024",
    readTime: "7 min read",
    category: "Health Tips",
    image: "https://images.unsplash.com/photo-1581594549595-35f6edc7b762?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
  },
  {
    id: 5,
    title: "Nutrition for Growing Children: Building Healthy Eating Habits",
    excerpt: "Discover age-appropriate nutrition guidelines and tips for establishing healthy eating patterns from infancy through childhood.",
    author: "Dr. Vinay H. Joshi",
    date: "February 20, 2024",
    readTime: "9 min read",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
  },
  {
    id: 6,
    title: "Sleep Training: Approaches for Different Age Groups",
    excerpt: "Explore various sleep training methods and find the approach that works best for your family and your child's temperament.",
    author: "Dr. Vinay H. Joshi",
    date: "February 15, 2024",
    readTime: "8 min read",
    category: "Sleep",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
  }
];

const categories = ["All Posts", "Newborn Care", "Immunization", "Development", "Health Tips", "Nutrition", "Sleep"];

export default function Blog() {
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

          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full text-sm transition-colors ${
                  category === "All Posts"
                    ? "bg-[#6B4D7C] text-white"
                    : "bg-white text-[#7a7a7a] hover:bg-[rgba(107,77,124,0.1)] border border-[rgba(107,77,124,0.2)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden border border-[rgba(107,77,124,0.1)] hover:shadow-lg transition-shadow group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs text-[#6B4D7C] rounded-full">
                      {post.category}
                    </span>
                  </div>
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
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 border-2 border-[#6B4D7C] text-[#6B4D7C] rounded-full hover:bg-[#6B4D7C] hover:text-white transition-colors">
              Load More Articles
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}