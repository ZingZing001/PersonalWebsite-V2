import { ArrowRight, Calendar, Clock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { getLatestPosts } from "@/data/blogPosts";

export const BlogSection = () => {
  const latestPosts = getLatestPosts(5);
  const [featuredPost, ...otherPosts] = latestPosts;

  return (
    <section id="blog" className="min-h-screen py-24 px-4 relative flex items-center">
      <div className="container mx-auto max-w-6xl text-left">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="text-primary" size={20} />
              <span className="text-primary text-sm font-medium uppercase tracking-wider">From the Blog</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Latest <span className="text-primary">Articles</span>
            </h2>
          </div>
          <Link 
            to="/blog"
            className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all group"
          >
            View all posts <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Featured Post + Other Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Post - Large Card */}
          {featuredPost && (
            <Link
              to={`/blog/${featuredPost.slug}`}
              className="group relative bg-card/90 border-2 dark:border-border/50 border-primary/20 rounded-2xl overflow-hidden shadow-lg dark:shadow-primary/5 shadow-xl card-hover flex flex-col lg:row-span-2"
            >
              {/* Image */}
              <div className="h-56 lg:h-72 overflow-hidden bg-gradient-to-br from-primary/30 via-primary/10 to-transparent relative">
                {featuredPost.image ? (
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                    <span className="text-6xl">✍️</span>
                  </div>
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
                {/* Featured Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  Latest
                </div>
              </div>

              <div className="p-6 lg:p-8 flex flex-col flex-1">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredPost.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {featuredPost.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                  {featuredPost.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {new Date(featuredPost.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Other Posts - 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            {otherPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-card/90 border-2 dark:border-border/50 border-primary/20 rounded-xl overflow-hidden shadow-lg dark:shadow-primary/5 card-hover flex flex-col"
              >
                {/* Image */}
                <div className="h-28 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 flex-shrink-0">
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-3xl">📝</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link 
            to="/blog"
            className="cosmic-button inline-flex items-center gap-2"
          >
            Explore All Articles <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};
