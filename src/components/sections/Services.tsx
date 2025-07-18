import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, 
  Palette, 
  Smartphone, 
  ShoppingBag, 
  FileText,
  Zap
} from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Website Design",
    description: "Beautiful, modern designs that capture your brand's essence and engage your audience.",
    features: ["Custom UI/UX", "Brand Integration", "Mobile-First Design"],
    startingPrice: "₹15,000"
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "Complete web applications built with cutting-edge technologies for optimal performance.",
    features: ["React/Next.js", "Node.js Backend", "Database Design"],
    startingPrice: "₹25,000"
  },
  {
    icon: Zap,
    title: "Landing Pages",
    description: "High-converting landing pages that turn visitors into customers with compelling design.",
    features: ["SEO Optimized", "Fast Loading", "Conversion Focused"],
    startingPrice: "₹8,000"
  },
  {
    icon: Smartphone,
    title: "QR-Menu Websites",
    description: "Digital menu solutions for restaurants with QR code integration and easy management.",
    features: ["QR Code Generation", "Easy Updates", "Mobile Optimized"],
    startingPrice: "₹12,000"
  },
  {
    icon: FileText,
    title: "Portfolio & Blog",
    description: "Showcase your work or share your thoughts with elegantly designed portfolio and blog sites.",
    features: ["CMS Integration", "Blog Management", "Portfolio Showcase"],
    startingPrice: "₹10,000"
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Solutions",
    description: "Complete online stores with payment integration and inventory management systems.",
    features: ["Payment Gateway", "Inventory System", "Admin Dashboard"],
    startingPrice: "₹30,000"
  }
];

const Services = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What We <span className="gradient-text">Do</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From concept to launch, we deliver comprehensive web solutions tailored to your business needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={service.title}
                className="glass hover-lift group relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="relative z-10">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardHeader>
                
                <CardContent className="relative z-10 space-y-4">
                  <div className="space-y-2">
                    {service.features.map((feature) => (
                      <Badge 
                        key={feature} 
                        variant="secondary" 
                        className="mr-2 mb-2 text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Starting from</span>
                      <span className="text-lg font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {service.startingPrice}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Need something custom? Let's discuss your project.
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Get a Custom Quote →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;