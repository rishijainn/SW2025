import { Card, CardContent } from "@/components/ui/card";
import { 
  Rocket, 
  Target, 
  Smartphone, 
  HeartHandshake, 
  Lightbulb,
  Shield
} from "lucide-react";

const features = [
  {
    icon: Rocket,
    title: "Fast Turnaround",
    description: "We deliver high-quality websites in just 3-7 days without compromising on quality.",
    color: "text-blue-400"
  },
  {
    icon: Target,
    title: "SEO-Friendly",
    description: "Built with SEO best practices to help your business rank higher in search results.",
    color: "text-green-400"
  },
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Responsive designs that look perfect on every device, from phones to desktops.",
    color: "text-purple-400"
  },
  {
    icon: HeartHandshake,
    title: "Bugdet-Friendly",
    description: "Get your work done in the lowest market price with highest quality assurance.",
    color: "text-pink-400"
  },
  {
    icon: Lightbulb,
    title: "Custom Features",
    description: "Tailored solutions that meet your specific business needs and requirements.",
    color: "text-yellow-400"
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "We stand behind our work with ongoing support and maintenance options.",
    color: "text-cyan-400"
  }
];

const WhyUs = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="gradient-text">Stackwise?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We combine technical expertise with creative vision to deliver exceptional results that drive business growth.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={feature.title}
                className="glass hover-lift group border-primary/10 hover:border-primary/30 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-glow rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Stats Section */}
        <div className="mt-24 glass rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">20+</div>
              <div className="text-sm text-muted-foreground">Projects Delivered</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">5-10</div>
              <div className="text-sm text-muted-foreground">Days Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;