import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useSpring, useTransform } from 'framer-motion';

// Certificate data structure
export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  category: string;
  credentialUrl?: string;
}

// Sample certificate data - replace with your actual certificates
const certificates: Certificate[] = [
  {
    id: 'cert-001',
    title: 'Python Design Contest',
    issuer: 'College',
    date: 'Jan 2025',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470&auto=format&fit=crop', // Temporary online image
    category: 'hackathon',
    credentialUrl: 'https://www.udemy.com/certificate/example/'
  },
  {
    id: 'cert-002',
    title: 'SPIT HACKATHON',
    issuer: 'Unstop',
    date: 'Jan 2025',
    image: '/certificates/spit-hackathon.jpg', // Replace with your actual certificate image path
    category: 'hackathon',
    credentialUrl: 'https://unstop.com/certificate-preview/9a9b90c9-5b64-4795-a196-e90693d8d0e7?utm_campaign='
  },
  {
    id: 'cert-003',
    title: 'Sk Somaiya Hackathon',
    issuer: 'Reskilll',
    date: 'Jan 2025',
    image: '/certificates/somaiya-hackathon.jpg', // Replace with your actual certificate image path
    category: 'hackathon'
  },
  // Add more placeholder certificates
  {
    id: 'cert-004',
    title: 'To be added',
    issuer: 'To be added',
    date: 'To be added',
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80',
    category: 'tbd'
  },
  {
    id: 'cert-005',
    title: 'To be added',
    issuer: 'To be added',
    date: 'To be added',
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80',
    category: 'tbd'
  },
  {
    id: 'cert-006',
    title: 'To be added',
    issuer: 'To be added',
    date: 'To be added',
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80',
    category: 'tbd'
  },
  {
    id: 'cert-007',
    title: 'To be added',
    issuer: 'To be added',
    date: 'To be added',
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80',
    category: 'tbd'
  },
  {
    id: 'cert-008',
    title: 'To be added',
    issuer: 'To be added',
    date: 'To be added',
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80',
    category: 'tbd'
  },
  {
    id: 'cert-009',
    title: 'To be added',
    issuer: 'To be added',
    date: 'To be added',
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80',
    category: 'tbd'
  }
  /*{
    id: 'cert-004',
    title: 'Video Editing Masterclass',
    issuer: 'Udemy',
    date: 'November 2022',
    image: '/certificates/video-certificate.jpg', // Replace with your actual certificate image path
    category: 'video',
    credentialUrl: 'https://www.udemy.com/certificate/example2/'
  },
  {
    id: 'cert-005',
    title: 'Web Design Fundamentals',
    issuer: 'FreeCodeCamp',
    date: 'August 2022',
    image: '/certificates/webdesign-certificate.jpg', // Replace with your actual certificate image path
    category: 'development',
    credentialUrl: 'https://www.freecodecamp.org/certification/example/'
  },
  {
    id: 'cert-006',
    title: 'Digital Marketing Professional',
    issuer: 'Google',
    date: 'July 2022',
    image: '/certificates/marketing-certificate.jpg', // Replace with your actual certificate image path
    category: 'marketing',
    credentialUrl: 'https://learndigital.withgoogle.com/example/'
  }*/
];

const Certificates = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredCertificate, setHoveredCertificate] = useState<string | null>(null);
  const [enlargedCertificate, setEnlargedCertificate] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  
  // Get unique categories
  const categories = ['all', ...Array.from(new Set(certificates.map(cert => cert.category)))];
  
  // Filter certificates by active category
  const filteredCertificates = activeCategory === 'all' 
    ? certificates 
    : certificates.filter(cert => cert.category === activeCategory);
  
  // Handle clicking outside an enlarged certificate to close it
  useEffect(() => {
    if (!enlargedCertificate) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.certificate-enlarged')) return;
      setEnlargedCertificate(null);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [enlargedCertificate]);
  
  return (
    <section id="certificates" className="py-32 relative">
      {/* Glass Background Panels */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-purple-900/10 backdrop-blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        />
        
        {/* Decorative floating elements */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              background: `radial-gradient(circle at center, ${
                i % 3 === 0 ? 'rgba(59, 130, 246, 0.1)' : 
                i % 3 === 1 ? 'rgba(139, 92, 246, 0.1)' : 
                'rgba(16, 185, 129, 0.1)'
              }, transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(40px)',
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500 mb-6">
            My Certifications
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Credentials that validate my skills and knowledge in various domains.
          </p>
        </motion.div>
        
        {/* Category filters */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-zinc-800/50 text-gray-300 hover:bg-zinc-700/50'
              }`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Certificates container */}
        <div 
          ref={containerRef}
          className="relative min-h-[600px]"
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence>
              {filteredCertificates.map((certificate, index) => (
                <motion.div
                  key={certificate.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    rotate: hoveredCertificate === certificate.id ? 0 : Math.random() * 6 - 3
                  }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.1,
                    layout: { type: 'spring', damping: 20 }
                  }}
                  className={`certificate-card relative cursor-pointer transform transition-all border border-white/10
                    bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl overflow-hidden
                    ${hoveredCertificate === certificate.id ? 'shadow-2xl shadow-blue-500/20 scale-[1.02] z-10' : 'shadow-lg shadow-black/20'}`}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: 0,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                  }}
                  onHoverStart={() => setHoveredCertificate(certificate.id)}
                  onHoverEnd={() => setHoveredCertificate(null)}
                  onClick={() => setEnlargedCertificate(certificate.id)}
                >
                  <div className="certificate-preview aspect-[4/3] w-full relative overflow-hidden">
                    <img 
                      src={certificate.image} 
                      alt={certificate.title} 
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    
                    {/* Glassmorphism overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    
                    {/* Bottom content area */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{certificate.title}</h3>
                      <p className="text-sm text-gray-300 mb-2 line-clamp-1">{certificate.issuer}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">{certificate.date}</span>
                        <span className="inline-block px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                          {certificate.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {/* Enlarged certificate overlay */}
          <AnimatePresence>
            {enlargedCertificate && (
              <motion.div 
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="certificate-enlarged bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  transition={{ type: 'spring', damping: 25 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {(() => {
                    const cert = certificates.find(c => c.id === enlargedCertificate);
                    if (!cert) return null;
                    
                    return (
                      <>
                        <div className="relative overflow-hidden max-h-[70vh]">
                          <img 
                            src={cert.image} 
                            alt={cert.title} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        
                        <div className="p-6 bg-zinc-900">
                          <h3 className="text-2xl font-bold text-white mb-2">{cert.title}</h3>
                          <p className="text-lg text-gray-300 mb-4">Issued by {cert.issuer} • {cert.date}</p>
                          
                          <div className="flex flex-wrap gap-4">
                            <button 
                              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                              onClick={() => setEnlargedCertificate(null)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                              Close
                            </button>
                            
                            {cert.credentialUrl && (
                              <a
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-zinc-700 text-white px-4 py-2 rounded-lg hover:bg-zinc-600"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                  <polyline points="15 3 21 3 21 9"></polyline>
                                  <line x1="10" y1="14" x2="21" y2="3"></line>
                                </svg>
                                Verify Credential
                              </a>
                            )}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Empty state */}
          {filteredCertificates.length === 0 && (
            <motion.div 
              className="flex flex-col items-center justify-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-400 mb-2">No certificates found</h3>
              <p className="text-zinc-500 text-center">
                No certificates found in the <span className="text-blue-400">{activeCategory}</span> category.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Certificates; 