import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-[#1D1D1D] border-t border-[#FF9E2C] border-opacity-20 py-8 relative z-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 
              className="font-serif text-xl text-[#FF9E2C] mb-2"
              style={{ textShadow: '0 0 5px rgba(255, 158, 44, 0.7), 0 0 10px rgba(255, 158, 44, 0.5)' }}
            >
              The Casket Diaries
            </h2>
            <p className="text-[#E8E8E8] text-sm">Eternal Embers Through Cemetery Weather</p>
          </div>
          
          <div className="flex gap-6">
            <SocialLink 
              label="Instagram" 
              href="https://instagram.com" 
              icon={<InstagramIcon className="h-6 w-6" />} 
            />
            <SocialLink 
              label="Twitter" 
              href="https://twitter.com" 
              icon={<TwitterIcon className="h-6 w-6" />} 
            />
            <SocialLink 
              label="Spotify" 
              href="https://spotify.com" 
              icon={<SpotifyIcon className="h-6 w-6" />} 
            />
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-[#2D2D2D] text-center">
          <p className="text-[#E8E8E8] text-xs">
            &copy; {new Date().getFullYear()} The Casket Diaries. Created with love by Dustin Smith.
          </p>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const SocialLink = ({ label, href, icon }: SocialLinkProps) => (
  <motion.a 
    href={href}
    className="text-[#E8E8E8] hover:text-[#FF9E2C] transition-colors duration-300"
    whileHover={{ scale: 1.1 }}
    target="_blank"
    rel="noopener noreferrer"
  >
    <span className="sr-only">{label}</span>
    {icon}
  </motion.a>
);

// Custom icons
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 4H8C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4Z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.5 7.5V7.51" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.2093 5.00065C18.5882 5.41983 17.899 5.73661 17.1681 5.93365C16.7699 5.4778 16.2474 5.14222 15.6647 4.96864C15.082 4.79505 14.4652 4.789 13.8792 4.95106C13.2933 5.11313 12.764 5.43879 12.356 5.88583C11.9479 6.33287 11.6783 6.88502 11.5781 7.47765V8.24365C10.5246 8.27169 9.48043 8.03293 8.53151 7.55022C7.58259 7.06752 6.76128 6.35747 6.14111 5.48065C6.14111 5.48065 3.76511 10.5566 8.84111 12.8567C7.6127 13.6779 6.1642 14.0861 4.69011 14.0267C9.76611 17.0957 16.0751 14.0267 16.0751 7.46165C16.0744 7.27693 16.0575 7.09265 16.0251 6.91165C16.6919 6.25651 17.1667 5.43735 17.4001 4.54465L19.2093 5.00065Z" />
  </svg>
);

const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.7 10.7C15.3 9.90001 13.95 9.50001 12 9.50001C10.5 9.50001 8.95 9.80001 7.3 10.4" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.8 13.4C14.7 12.8 13.4 12.5 12 12.5C10.8 12.5 9.65 12.8 8.2 13.4" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.5 16C13.7 15.65 12.85 15.5 12 15.5C11.15 15.5 10.3 15.65 9.5 16" />
  </svg>
);

export default Footer;
