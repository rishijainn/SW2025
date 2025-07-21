import Hero from "@/components/sections/Hero";
import Team from "@/components/sections/Team";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import WhyUs from "@/components/sections/WhyUs";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Team />
      <Services />
      <Projects />
      <WhyUs />
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
