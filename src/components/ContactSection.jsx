import { useState } from "react"
import { Instagram, Linkedin, Mail, Send, CheckCircle2, Hand } from "lucide-react"
import { Github } from "lucide-react"

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", message: "" })
    }, 3000)
  }

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: "https://www.linkedin.com/in/runjiazhangnz/",
      color: "hover:text-[#0077B5]",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      url: "https://www.instagram.com/zingzing.d",
      color: "hover:text-[#E4405F]",
    },
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      url: "https://github.com/ZingZing001",
      color: "hover:text-foreground",
    },
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(127,108,224,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(127,108,224,0.08),transparent_50%)]"></div>
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="inline-block animate-wave origin-[70%_70%]">
              <Hand className="w-8 h-8 text-primary" />
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Get In <span className="text-primary">Touch</span>
            </h2>
          </div>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          {/* Glass-morphism floating card */}
          <div className="bg-card/60 backdrop-blur-xl border border-border/50 rounded-lg shadow-2xl shadow-primary/5 p-8">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none resize-none transition-all duration-200"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 font-medium group"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  Send Message
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl text-foreground font-semibold">Message Sent!</h3>
                <p className="text-muted-foreground">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-6">Or connect with me on</p>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-14 h-14 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/20 ${social.color}`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 