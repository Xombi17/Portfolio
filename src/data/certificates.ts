import { Certificate } from '../sections/Certificates';

// Sample certificate data - replace with your actual certificates
const certificates: Certificate[] = [
  {
    id: 'cert-001',
    title: 'Advanced React & Redux',
    issuer: 'Udemy',
    date: 'June 2023',
    image: '/certificates/react-certificate.jpg', // Replace with your actual certificate image path
    category: 'development',
    credentialUrl: 'https://www.udemy.com/certificate/example/'
  },
  {
    id: 'cert-002',
    title: 'Machine Learning Specialization',
    issuer: 'Coursera',
    date: 'March 2023',
    image: '/certificates/ml-certificate.jpg', // Replace with your actual certificate image path
    category: 'ai',
    credentialUrl: 'https://www.coursera.org/verify/example'
  },
  {
    id: 'cert-003',
    title: 'Advanced Photography Techniques',
    issuer: 'Skillshare',
    date: 'January 2023',
    image: '/certificates/photography-certificate.jpg', // Replace with your actual certificate image path
    category: 'photography'
  },
  {
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
  }
];

export default certificates; 