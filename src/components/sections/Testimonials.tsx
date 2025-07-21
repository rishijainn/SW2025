import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Arvind Kumar",
    role: "CEO",
    company: "Secreteye",
    content: "Stackwise really helped us level up. Our website looks professional and modern, and the QR menu feature has made the customer experience much smoother. We've actually seen a noticeable rise in online orders!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Vipin Jain",
    role: "Businessman",
    company: "Vipin Footwear",
    content: "I wanted a simple but smart solution for managing bookings and showing my products online. Stackwise understood my needs very well and gave me exactly what I was looking for — fast and efficiently.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Vihan Upadhyay",
    role: "Spa Owner",
    company: "Monarch Beauty Spa",
    content: "From the first call, Stackwise made everything easy. They listened to what I wanted, gave good suggestions, and built a beautiful website that even my regular clients compliment.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Rashmi Patel",
    role: "Boutique Owner",
    company: "Rashmi Couture",
    content: "I never thought having a website could impact my boutique this much! Thanks to Stackwise, customers now browse collections online and place orders directly. Their team is very cooperative.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Rajeev Sharma",
    role: "Hotel Owner",
    company: "Shivam Residency",
    content: "The website and booking system built by Stackwise has made things much easier for both staff and guests. It looks professional and works smoothly on mobile as well, which is important for us.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=150&h=150&fit=crop&crop=face"
  }
];


const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what business owners are saying about their experience with Stackwise.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <Card className="glass hover-lift mb-8">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <Quote className="w-12 h-12 text-primary mx-auto opacity-50" />
              
              <blockquote className="text-xl md:text-2xl leading-relaxed text-balance">
                "{testimonials[activeIndex].content}"
              </blockquote>
              
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 text-yellow-400 fill-current" 
                  />
                ))}
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[activeIndex].avatar}
                  alt={testimonials[activeIndex].name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                />
                <div className="text-left">
                  <div className="font-bold text-lg">{testimonials[activeIndex].name}</div>
                  <div className="text-primary font-medium">{testimonials[activeIndex].role}</div>
                  <div className="text-muted-foreground text-sm">{testimonials[activeIndex].company}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Testimonial Navigation */}
          <div className="flex justify-center gap-4">
            {testimonials.map((testimonial, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  index === activeIndex 
                    ? 'glass border-primary/30 scale-105' 
                    : 'bg-muted/50 hover:bg-muted/80'
                }`}
              >
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 text-center space-y-8">
          <div className="flex justify-center items-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-medium">4.9/5 Average Rating</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="font-medium">50+ Happy Clients</div>
            <div className="h-4 w-px bg-border" />
            <div className="font-medium">100% Project Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;