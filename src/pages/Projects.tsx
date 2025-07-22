import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import project1 from "@/assets/beauty.jpeg";
import project2 from "@/assets/hotel.jpeg";
import project3 from "@/assets/port.jpeg";
import project4 from '@/assets/fashion.png'
import project5 from '@/assets/se-logo.png'
import project6 from '@/assets/tattoo.jpeg'

const allProjects = [
  {
    title: "Spa Website",
    category: "Beauty & Wellness",
    description: "Elegant spa platform with booking, service listings, and payment integration.",
    image: project1,
    tech: ["React", "Node.js", "MongoDB"],
    liveUrl: "https://monarch-pi.vercel.app/",
    githubUrl: "#"
  },
  {
  title: "Fashion Website",
  category: "Fashion & Lifestyle",
  description: "A modern and stylish fashion store website with a sleek UI and dynamic product showcase.",
  image: project4,
  tech: ["React", "TypeScript", "Chart.js"],
  liveUrl: "https://fashion-nu-rouge.vercel.app",
  githubUrl: "#"
},
  {
    title: "Cafe Website",
    category: "Hotel",
    description: "Modernise your cafe/hotels with a newly created websites.",
    image: project2,
    tech: ["React", "TypeScript", "Chart.js"],
    liveUrl: "https://cafe-cool.vercel.app/",
    githubUrl: "#"
  },
  {
    title: "Tattoo Studio",
    category: "Art",
    description: "Tattoo shop website with artist portfolios, appointment scheduling, and service showcase.",
    image: project6,
    tech: ["MERN Stack"],
    liveUrl: "https://tattoo-seven-theta.vercel.app/",
    githubUrl: "#"
  },
   {
      title: "Portfolio",
    category: "Personal",
    description: "Showcase your skills, works to different people to grow your work.",
    image: project3,
    tech: ["Next.js"],
    liveUrl: "https://john-portfolio-umber.vercel.app",
    githubUrl: "#"
  }

];


const Projects = () => {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Sample <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio and see how we help businesses transform their online presence.
          </p>
        </div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {allProjects.map((project, index) => (
            <Card 
              key={project.title}
              className="glass hover-lift group overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover Actions */}
                {/* <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  {/* <Button size="sm" className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30">
                    <Github className="w-4 h-4" />
                  </Button> */}
                {/* </div> */} 
              </div>
              
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Badge variant="secondary" className="text-xs">
                    {project.category}
                  </Badge>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="outline" 
                      className="text-xs border-primary/20 text-primary"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <a 
                    href={project.liveUrl}
                    className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    View Live →
                  </a>
                  {/* <a 
                    href={project.githubUrl}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;