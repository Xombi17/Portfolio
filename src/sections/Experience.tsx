import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: "Head Photographer",
    company: "College Fest",
    period: "2023",
    description: "Led a team to capture the best moments of the event. Managed and organized the entire media coverage. Created professional-quality images and videos.",
    skills: ["Photography", "Team Leadership", "Event Coverage", "Media Management"]
  },
  {
    title: "Content Creator",
    company: "YouTube Channel (12K+ Subscribers, 2.3M+ Views)",
    period: "2020 - Present",
    description: "Produced engaging tech and creative content. Built an online community with high engagement.",
    skills: ["Content Creation", "Video Production", "Community Building", "Social Media"]
  },
  {
    title: "Event Management & Video Editing",
    company: "Freelance",
    period: "2021 - Present",
    description: "Designed presentations and promotional videos. Assisted in managing large-scale college events.",
    skills: ["Video Editing", "Event Management", "Presentation Design", "Project Coordination"]
  }
];

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect for the timeline
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      }
    }
  };
  
  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  };

  return (
    <section 
      id="experience" 
      className="py-32 px-4 bg-zinc-900/50" 
      data-scroll-section
    >
      <div className="max-w-6xl mx-auto" data-scroll data-scroll-speed="0.3">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          Experience
        </motion.h2>
        
        <div 
          ref={containerRef} 
          className="relative ml-4 md:ml-8"
        >
          {/* Timeline line with animation */}
          <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-zinc-700">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-blue-500" 
              style={{ height: lineHeight }}
            />
          </div>
          
          <motion.div
            className="space-y-16"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {experiences.map((item, index) => (
              <TimelineItem 
                key={index} 
                data={item} 
                variants={itemVariants}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface TimelineItemProps {
  data: ExperienceItem;
  variants: any;
  index: number;
}

const TimelineItem = ({ data, variants, index }: TimelineItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: false, amount: 0.5 });
  
  return (
    <motion.div
      ref={itemRef}
      className="relative pl-8 md:pl-12"
      variants={variants}
      data-scroll
      data-scroll-offset="30%"
    >
      {/* Timeline dot */}
      <motion.div 
        className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[8px] top-1"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />
      
      {/* Content card with hover effect */}
      <motion.div 
        className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-lg p-6 md:p-8 hover:border-blue-500/50 transition-colors duration-300"
        whileHover={{ 
          y: -5,
          transition: { duration: 0.2 }
        }}
      >
        <span className="text-blue-400 text-sm font-medium">{data.period}</span>
        <h3 className="text-xl md:text-2xl font-bold mt-2">{data.title}</h3>
        <p className="text-gray-400 font-medium mt-1">{data.company}</p>
        
        <p className="text-gray-300 mt-4">
          {data.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {data.skills.map((skill) => (
            <span 
              key={skill} 
              className="text-xs px-2 py-1 bg-zinc-700/70 rounded-full text-gray-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Experience; 