import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                🕉️
              </div>
              <span className="font-semibold">DarshanEase</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Your smart temple visit assistant, making pilgrimage easier and more convenient with real-time updates and online services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Book Darshan</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Live Status</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Accommodation</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Donate</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Online Booking</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Special Pooja</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Digital Donations</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Temple Map</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Feedback</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 shrink-0" />
                <span>Sacred Temple Road, Pilgrimage City - 123456</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@darshanease.com</span>
              </li>
            </ul>

            <div className="flex gap-3 mt-4">
              <a 
                href="https://www.facebook.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 hover:scale-110 transition-all duration-200"
                title="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.twitter.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 hover:scale-110 transition-all duration-200"
                title="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 hover:scale-110 transition-all duration-200"
                title="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.youtube.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 hover:scale-110 transition-all duration-200"
                title="Subscribe to our YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; 2025 DarshanEase. All rights reserved. | Developed for devotees with 🙏</p>
        </div>
      </div>
    </footer>
  );
}
