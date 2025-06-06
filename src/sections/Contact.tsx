import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import emailjs from 'emailjs-com';

// Custom SVG icons
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    emailjs.send('service_portfolio-ecse', 'template_jlklz85', formData, '-q6xWTq458NsSUngs')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        // Reset form status after 3 seconds
        setTimeout(() => setFormStatus('idle'), 3000);
      }, (err) => {
        console.error('FAILED...', err);
        setFormStatus('error');
      });
  };
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  const titleVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: <LinkedinIcon />, url: 'https://www.linkedin.com/in/varad-amit-joshi/' },
    { name: 'GitHub', icon: <GithubIcon />, url: 'https://github.com/xombi17' },
    { name: 'Instagram', icon: <InstagramIcon />, url: 'https://www.instagram.com/varad_joshi17/' },
  ];

  return (
    <section id="contact" className="py-20 relative" data-scroll-section>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-blue-950/20 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div className="text-center mb-16" variants={titleVariants}>
            <motion.h2 
              className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            >
              Get In Touch
            </motion.h2>
            <motion.p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Have a question or want to work together? Feel free to reach out!
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/10"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl font-bold mb-8 relative">
                Contact Information
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 -mb-3"></span>
              </h3>
              
              <div className="space-y-6 mt-8">
                <motion.div 
                  className="flex items-center group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <MailIcon />
                  </div>
                  <a 
                    href="mailto:varadaj47@gmail.com" 
                    className="ml-4 text-gray-300 group-hover:text-blue-400 transition-colors"
                  >
                    varadaj47@gmail.com
                  </a>
                </motion.div>
                
                <motion.div 
                  className="flex items-center group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <PhoneIcon />
                  </div>
                  <span className="ml-4 text-gray-300 group-hover:text-purple-400 transition-colors">9082158583</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                    <GlobeIcon />
                  </div>
                  <span className="ml-4 text-gray-300 group-hover:text-indigo-400 transition-colors">Thane, India</span>
                </motion.div>
              </div>
              
              <h3 className="text-2xl font-bold mt-12 mb-8 relative">
                Social Media
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 -mb-3"></span>
              </h3>
              
              <div className="flex space-x-5 mt-8">
                {socialLinks.map((link, index) => (
                  <motion.a 
                    key={index}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 transition-all duration-300"
                    aria-label={link.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/10"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl font-bold mb-8 relative">
                Send Me a Message
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 -mb-3"></span>
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-5 mt-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all duration-300"
                    placeholder="Your name"
                    disabled={formStatus === 'submitting'}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all duration-300"
                    placeholder="your.email@example.com"
                    disabled={formStatus === 'submitting'}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all duration-300 resize-none"
                    placeholder="Your message here..."
                    disabled={formStatus === 'submitting'}
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                    formStatus === 'submitting' 
                      ? 'bg-purple-700 cursor-wait' 
                      : formStatus === 'success'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  }`}
                  disabled={formStatus === 'submitting'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {formStatus === 'submitting' ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : formStatus === 'success' ? (
                    <span className="flex items-center">
                      <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Message Sent!
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Send Message
                      <SendIcon />
                    </span>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
          
          {/* Map or additional content could go here */}
          <motion.div 
            className="mt-16 text-center text-gray-500 text-sm"
            variants={itemVariants}
          >
            © {new Date().getFullYear()} Varad Joshi. All rights reserved.
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 