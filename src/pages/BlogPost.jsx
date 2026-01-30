import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Tag, Share2, BookOpen, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { StarBackground } from "@/components/StarBackground";
import { getPostBySlug, getSortedPosts } from "@/data/blogPosts";
import ReactMarkdown from "react-markdown";

export const BlogPost = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  
  // Get related posts (excluding current)
  const relatedPosts = getSortedPosts()
    .filter(p => p.slug !== slug)
    .slice(0, 2);

  // If post not found, redirect to blog
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <StarBackground />
      <Navbar />

      <main className="pt-24 pb-16 px-4">
        <article className="container mx-auto max-w-3xl text-left">
          {/* Back Link */}
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center gap-1.5"
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-foreground">
              {post.title}
            </h1>

            {/* Meta Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/50">
              <div className="flex items-center gap-6 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  {post.readTime}
                </span>
              </div>
              
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/10"
              >
                <Share2 size={16} />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-10 rounded-2xl overflow-hidden border-2 dark:border-border/50 border-primary/20 shadow-xl">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none 
            prose-headings:text-foreground prose-headings:font-bold prose-headings:leading-tight
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
            prose-strong:text-foreground prose-strong:font-semibold
            prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
            prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-card/80 prose-pre:border-2 prose-pre:border-border/50 prose-pre:rounded-xl prose-pre:shadow-lg
            prose-ul:text-muted-foreground prose-ul:my-6
            prose-ol:text-muted-foreground prose-ol:my-6
            prose-li:marker:text-primary prose-li:my-2
            prose-blockquote:border-l-4 prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-muted-foreground
            prose-hr:border-border/50 prose-hr:my-12
            prose-img:rounded-xl prose-img:shadow-lg
          ">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Post Footer */}
          <div className="mt-16 p-8 bg-card/50 rounded-2xl border-2 border-border/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <BookOpen className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Thanks for reading!</p>
                  <p className="text-sm text-muted-foreground">Hope you found this article helpful</p>
                </div>
              </div>
              <Link 
                to="/blog"
                className="cosmic-button inline-flex items-center gap-2"
              >
                More Articles <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-8">
                Continue <span className="text-primary">Reading</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.slug}`}
                    className="group bg-card/90 border-2 dark:border-border/50 border-primary/20 rounded-xl overflow-hidden shadow-lg card-hover"
                  >
                    {/* Image */}
                    <div className="h-36 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                      {relatedPost.image ? (
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-3xl">📝</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-5">
                      <h3 className="font-semibold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(relatedPost.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                        <span className="text-primary font-medium flex items-center gap-1 group-hover:gap-1.5 transition-all">
                          Read <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
    </div>
  );
};
