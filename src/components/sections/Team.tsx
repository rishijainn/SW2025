import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Twitter } from "lucide-react";
import teamAvatar1 from "@/assets/rishi.jpeg";
import teamAvatar2 from "@/assets/prasham.jpeg";
import teamAvatar3 from "@/assets/jenish.jpeg";

const teamMembers = [
  {
    name: "Rishi Jain",
    role: "Full-Stack Developer",
    bio: "Passionate about creating scalable applications and innovative user experiences. Specializes in React, Node.js, and mobile development.",
    image: teamAvatar1,
    social: {
      github: "https://github.com/rishijainn",
      linkedin: "https://www.linkedin.com/in/rishi-jain-1a6b65248/",
      twitter: "#"
    }
  },
  {
    name: "Prasham Jain",
    role: "Full-Stack Developer",
    bio: "Expert in modern web and app technologies and database architecture. Loves building robust backend systems and intuitive frontends.",
    image: teamAvatar2,
    social: {
      github: "https://github.com/prasham14",
      linkedin: "https://www.linkedin.com/in/prashamjain14/",
      twitter: "#"
    }
  },
  {
    name: "Jenish Jain",
    role: "Web Developer",
    bio: "Creative problem solver with expertise in MERN stack and UI designing. Focuses on performance optimization and marketing strategies.",
    image: teamAvatar3,
    social: {
      github: "https://github.com/jenishji",
      linkedin: "https://www.linkedin.com/in/jenishjain14/",
      twitter: "#"
    }
  }
];

const Team = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Meet the <span className="gradient-text">Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three passionate developers united by a shared vision of creating exceptional web experiences.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card 
              key={member.name} 
              className="glass hover-lift group cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6 text-center space-y-4">
                {/* Avatar */}
                <div className="relative mx-auto w-32 h-32 mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Info */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
                
                {/* Social Links */}
                <div className="flex justify-center space-x-4 pt-4">
                  <a 
                    href={member.social.github} 
                    className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a 
                    href={member.social.linkedin} 
                    className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;