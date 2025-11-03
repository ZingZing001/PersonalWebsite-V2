import { Dog, Instagram, Linkedin, Mail, MapPin, PhoneCall } from "lucide-react"

export const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-4 relative bg-card/10">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text=4xl font-bold mb-4 text-center">
          Contact <span className="text-primary">me</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 mx-w-2xl mx-auto">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. 
          Feel free to reach out using the form below or connect with me on social media!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-primary/10"> 
                <Mail className="h-6 w-6 text-primary"/>
              </div>
              <div>
                <h4>Email</h4>
                <a 
                href="mailto:runjiazhang.nz@gmail.com" 
                className="text-muted-foreground hover:text-primary transiton-colors">
                  runjiazhang.nz@gmail.com
                </a>
              </div>
            </div>
             <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-primary/10"> 
                <PhoneCall className="h-6 w-6 text-primary"/>
              </div>
              <div>
                <h4>Phone</h4>
                <a 
                href="tel:+642102396903" 
                className="text-muted-foreground hover:text-primary transiton-colors">
                  +64 21 023 96903
                </a>
              </div>

            </div>
             <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-primary/10"> 
                <MapPin className="h-6 w-6 text-primary"/>
              </div>
              <div>
                <h4>Location</h4>
                <a 
                className="text-muted-foreground hover:text-primary transiton-colors">
                  Auckland, New Zealand
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8">
            <h4 className="font-medium mb-4">Connect With Me</h4>
            <div className="flex space-x-4 justify-center">
              <a>
                <Linkedin/>

              </a>
              <a>
                <Instagram/>
              </a>
              <a>
                <Dog />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 