import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, ArrowRight, BookOpen, Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { StarBackground } from "@/components/StarBackground";
import { Footer } from "@/components/Footer";
import { getSortedPosts } from "@/data/blogPosts";
import { useState } from "react";

export const Blog = () => {
  const allPosts = getSortedPosts();
  const [searchQuery, setSearchQuery] = useState("");
  
  const posts = allPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [featuredPost, ...otherPosts] = posts;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col">
      <StarBackground />
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl text-left">
          {/* Header */}
          <div className="mb-12">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="text-primary" size={20} />
                  <span className="text-primary text-sm font-medium uppercase tracking-wider">Blog</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Articles & <span className="text-primary">Insights</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Deep dives into programming, project breakdowns, and lessons from my developer journey.
                </p>
              </div>
              
              {/* Search */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card/80 border-2 border-border/50 focus:border-primary/50 outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <Link
              to={`/blog/${featuredPost.slug}`}
              className="group block mb-10"
            >
              <div className="relative bg-card/90 border-2 dark:border-border/50 border-primary/20 rounded-2xl overflow-hidden shadow-xl card-hover">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image */}
                  <div className="h-64 lg:h-80 overflow-hidden bg-gradient-to-br from-primary/30 via-primary/10 to-transparent relative">
                    {featuredPost.image ? (
                      <img 
                        src={featuredPost.image} 
                        alt={featuredPost.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-7xl">✍️</span>
                      </div>
                    )}
                    {/* Featured Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full shadow-lg">
                      ✨ Featured
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featuredPost.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                      {featuredPost.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                      {featuredPost.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} />
                          {new Date(featuredPost.date).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} />
                          {featuredPost.readTime}
                        </span>
                      </div>
                      <span className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read Article <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Other Posts Grid */}
          {otherPosts.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-6 text-muted-foreground">
                More Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group bg-card/90 border-2 dark:border-border/50 border-primary/20 rounded-xl overflow-hidden shadow-lg card-hover flex flex-col"
                  >
                    {/* Image */}
                    <div className="h-44 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 relative">
                      {post.image ? (
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-4xl">📝</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map((tag, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {new Date(post.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric'
                            })}
                          </span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                        
                        <span className="text-primary text-xs font-medium flex items-center gap-1 group-hover:gap-1.5 transition-all">
                          Read <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="text-center py-16 bg-card/50 rounded-2xl border-2 border-dashed border-border/50">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-muted-foreground text-lg mb-2">No articles found</p>
              <p className="text-muted-foreground text-sm">
                {searchQuery ? `No results for "${searchQuery}"` : "Check back soon for new content!"}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
