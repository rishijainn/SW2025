import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  ArrowUp
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-muted/30 pt-24 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 text-primary font-bold text-2xl">
              <Sparkles className="w-8 h-8" />
              STACKWISE
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              We help businesses stand out online with handcrafted websites that speak for their brand. 
              Fast delivery, modern design, and exceptional support.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:stackwise7@gmail.com" className="hover:text-primary transition-colors">
                  stackwise7@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+919876543210" className="hover:text-primary transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>India | Available Globally</span>
              </div>
            </div>
          </div>
          
          {/* Services */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg">Services</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-primary transition-colors">Website Design</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Full-Stack Development</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Landing Pages</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">QR-Menu Websites</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Portfolio & Blog</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">E-commerce Solutions</a></li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg">Quick Links</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#team" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#projects" className="hover:text-primary transition-colors">Our Work</a></li>
              <li><a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            © 2024 Stackwise. All rights reserved. | Built with ❤️ by the Stackwise team.
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Follow us:</span>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          {/* Back to Top */}
          <Button
            onClick={scrollToTop}
            variant="ghost"
            size="sm"
            className="hover:text-primary transition-colors"
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Back to Top
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;