import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-glow rounded-full animate-float" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-glow rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-primary/20 rounded-full animate-float" style={{ animationDelay: "2s" }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Logo/Brand */}
          <div className="fade-up">
            <div className="inline-flex items-center gap-2 text-primary font-bold text-xl mb-4">
              <Sparkles className="w-6 h-6" />
              STACKWISE
            </div>
          </div>
          
          {/* Main Headline */}
          <h1 className="fade-up fade-up-delay-1 text-5xl md:text-7xl font-bold text-balance">
            We Build,{" "}
            <span className="gradient-text">You Grow</span>
          </h1>
          
          {/* Subheading */}
          <p className="fade-up fade-up-delay-2 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Stackwise helps you stand out online — with handcrafted websites that speak for your brand.
          </p>
          
          {/* CTA Buttons */}
          <div className="fade-up fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              variant="hero" 
              size="xl" 
              className="group"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Let's Build Together
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="glass" 
              size="xl"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Our Work
            </Button>
          </div>
          
          {/* Stats */}
          <div className="fade-up fade-up-delay-3 grid grid-cols-3 gap-8 pt-16 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">20+</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">5-10</div>
              <div className="text-sm text-muted-foreground">Days Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;