import { useState } from "react"
import { Instagram, Linkedin, Mail, Send, CheckCircle2, Hand } from "lucide-react"
import { Github } from "lucide-react"
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // EmailJS credentials from environment variables
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      
      console.log('Email sent successfully:', result)
      setIsSubmitting(false)
      setIsSubmitted(true)
      toast.success('Message sent successfully!')
      
      // Reset after showing success message
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: "", email: "", message: "" })
      }, 3000)
    } catch (error) {
      console.error('Failed to send email:', error)
      setIsSubmitting(false)
      toast.error('Failed to send message. Please try again.')
    }
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
    <section id="contact" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative bg-transparent flex items-center">
      <div className="max-w-[1200px] mx-auto">
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
          <div className="dark:bg-card/60 dark:backdrop-blur-xl bg-white dark:border-border/50 border-2 border-primary/20 rounded-lg shadow-2xl dark:shadow-primary/5 shadow-xl p-8">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-foreground">
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
                    className="w-full px-4 py-3 rounded-lg dark:bg-background/50 dark:backdrop-blur-sm bg-gray-50 border dark:border-border/50 border-primary/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-foreground">
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
                    className="w-full px-4 py-3 rounded-lg dark:bg-background/50 dark:backdrop-blur-sm bg-gray-50 border dark:border-border/50 border-primary/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-foreground">
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
                    className="w-full px-4 py-3 rounded-lg dark:bg-background/50 dark:backdrop-blur-sm bg-gray-50 border dark:border-border/50 border-primary/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none resize-none transition-all duration-200 text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 font-medium group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-6">
                <div className="flex justify-center animate-fade-in" style={{ animationDelay: '0s' }}>
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                    <CheckCircle2 className="w-10 h-10 text-primary animate-fade-in" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
                <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <h3 className="text-2xl text-foreground font-bold">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </div>
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
                  className={`w-14 h-14 rounded-xl dark:bg-card/80 dark:backdrop-blur-sm bg-white dark:border-border/50 border-2 border-primary/20 flex items-center justify-center text-muted-foreground transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/20 ${social.color}`}
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