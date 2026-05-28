import { RocketIcon, SparklesIcon, ZapIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { HeroGradient } from "./background-gradient";
import Link from "next/link";
import { Button } from "../ui/button";
import { MotionDiv } from "../ui/motion-div";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <HeroGradient />
      <div className="relative section-container section-padding">
        <div className="text-center">
          <Badge className="mb-6 text-sm font-medium" 
           variant="secondary">
            Power By AI 
            <SparklesIcon className="size-4 inline-block ml-2" />
          </Badge>
          <h1>Find your perfect 
            <span className="block gradient-text">
            AI Learning Partner
            </span></h1>
          <p className="hero-subheading">
            Join communities, set your learing goals, and get matched with partners who shares your passions.
            Chat, collaborate and grow together with AI-powered Insights.
          </p>
          <div 
            className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <MotionDiv 
                initial={{ opacity:0, y:20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                animate={{ opacity:1, y:0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/sign-up">
                  <Button 
                    size="lg"
                    className="link-button hero-button-outline group"
                    >
                      <span className="hero-button-content">
                        <RocketIcon className="hero-button-icon-outline 
                      group-hover:rotae-12
                      group-hover:text-primary" />
                        Get Started for Free
                      </span>
                    
                  </Button>
                </Link>
              </MotionDiv>
              <MotionDiv 
                initial={{ opacity:0, y:20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                animate={{ opacity:1, y:0 }}
                whileHover={{ scale: 1.08, y:-2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/#pricing">
                  <Button 
                    size="lg"
                    className="link-button hero-button-primary group"
                    >
                    <span className="hero-button-content">
                      <ZapIcon className="hero-button-icon-primary 
                      group-hover: scale-125
                      group-hover:rotae-12" />
                      Buy a Plan
                    </span>
                  </Button>
                </Link>
              </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
}